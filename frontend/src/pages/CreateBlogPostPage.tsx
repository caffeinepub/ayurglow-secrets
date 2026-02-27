import { useState, useRef, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { toast } from 'sonner';
import { Loader2, ArrowLeft, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useCreatePost, usePublishPost } from '../hooks/useQueries';
import { ExternalBlob } from '../backend';
import { injectBlobIndexAttributes } from '../utils/imageUtils';

const CATEGORIES = [
  'Health Remedies',
  'Skin Care',
  'Hair Care',
  'Ayurveda',
  'Wellness',
  'Nutrition',
  'Lifestyle',
];

function generateId(): string {
  return `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export default function CreateBlogPostPage() {
  const navigate = useNavigate();
  const createPostMutation = useCreatePost();
  const publishPostMutation = usePublishPost();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('AyurGlow Team');
  const [readTime, setReadTime] = useState('5');
  const [tags, setTags] = useState('');
  const [publishImmediately, setPublishImmediately] = useState(false);

  // Featured image state
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState<string | null>(null);
  const [featuredImageSize, setFeaturedImageSize] = useState<string>('');
  const featuredImageRef = useRef<HTMLInputElement>(null);

  // Inline images collected from editor
  const inlineImageBlobsRef = useRef<ExternalBlob[]>([]);

  // Auto-generate slug from title
  useEffect(() => {
    if (title && !slug) {
      setSlug(generateSlug(title));
    }
  }, [title]);

  const handleFeaturedImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFeaturedImageFile(file);
    setFeaturedImageSize(`${Math.round(file.size / 1024)}KB`);
    const reader = new FileReader();
    reader.onload = (ev) => {
      setFeaturedImagePreview(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFeaturedImage = () => {
    setFeaturedImageFile(null);
    setFeaturedImagePreview(null);
    setFeaturedImageSize('');
    if (featuredImageRef.current) featuredImageRef.current.value = '';
  };

  // Quill image handler: inserts image as base64 data URL into editor
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        const quill = quillRef.current?.getEditor();
        if (quill) {
          const range = quill.getSelection(true);
          quill.insertEmbed(range.index, 'image', dataUrl);
          quill.setSelection(range.index + 1, 0);
        }
      };
      reader.readAsDataURL(file);
    };
  };

  const quillRef = useRef<ReactQuill>(null);

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['blockquote', 'code-block'],
        ['link', 'image'],
        ['clean'],
      ],
      handlers: { image: imageHandler },
    },
  };

  const prepareContentForSave = async (htmlContent: string): Promise<{ processedContent: string; contentImages: ExternalBlob[] }> => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const images = doc.querySelectorAll('img');
    const contentImages: ExternalBlob[] = [];

    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const src = img.getAttribute('src') || '';
      if (src.startsWith('data:')) {
        // Convert base64 to bytes and create ExternalBlob
        const response = await fetch(src);
        const arrayBuffer = await response.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
        const blob = ExternalBlob.fromBytes(bytes);
        contentImages.push(blob);
        img.setAttribute('src', `blob-placeholder-${i}`);
        img.setAttribute('data-blob-index', String(i));
      } else if (src.startsWith('http') || src.startsWith('blob:')) {
        // Already an external URL - keep as is but track it
        const blob = ExternalBlob.fromURL(src);
        contentImages.push(blob);
        img.setAttribute('data-blob-index', String(i));
      }
    }

    const processedContent = doc.body.innerHTML;
    return { processedContent, contentImages };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) { toast.error('Title is required'); return; }
    if (!slug.trim()) { toast.error('Slug is required'); return; }
    if (!excerpt.trim()) { toast.error('Excerpt is required'); return; }
    if (!content.trim()) { toast.error('Content is required'); return; }

    const parsedReadTime = parseInt(readTime, 10);
    if (isNaN(parsedReadTime) || parsedReadTime < 1) { toast.error('Read time must be a positive number'); return; }

    try {
      // Prepare featured image
      let featuredImageBlob: ExternalBlob | null = null;
      let featuredImageSizeStr: string | null = null;
      if (featuredImageFile) {
        const arrayBuffer = await featuredImageFile.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
        featuredImageBlob = ExternalBlob.fromBytes(bytes);
        featuredImageSizeStr = featuredImageSize || null;
      }

      // Prepare content images
      const { processedContent, contentImages } = await prepareContentForSave(content);
      const finalContent = injectBlobIndexAttributes(processedContent, 0);

      const tagList = tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const postId = generateId();

      await createPostMutation.mutateAsync({
        id: postId,
        title: title.trim(),
        slug: slug.trim(),
        category,
        content: finalContent,
        excerpt: excerpt.trim(),
        readTime: BigInt(parsedReadTime),
        author: author.trim() || 'AyurGlow Team',
        tags: tagList,
        image: featuredImageBlob,
        imageSize: featuredImageSizeStr,
        contentImages,
      });

      if (publishImmediately) {
        await publishPostMutation.mutateAsync({ id: postId, publishedDate: null });
        toast.success('Post created and published successfully!');
      } else {
        toast.success('Post saved as draft!');
      }

      navigate({ to: '/admin' });
    } catch (err: any) {
      console.error('Error creating post:', err);
      toast.error(err?.message || 'Failed to create post. Please try again.');
    }
  };

  const isSubmitting = createPostMutation.isPending || publishPostMutation.isPending;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate({ to: '/admin' })}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground font-serif">Create New Post</h1>
            <p className="text-muted-foreground text-sm">Fill in the details to create a new blog post</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              required
            />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="post-url-slug"
              required
            />
            <p className="text-xs text-muted-foreground">URL: /blog/{slug || 'post-slug'}</p>
          </div>

          {/* Author & Read Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="readTime">Read Time (minutes) *</Label>
              <Input
                id="readTime"
                type="number"
                min="1"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="5"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-input bg-background text-foreground rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="ayurveda, health, wellness (comma-separated)"
            />
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt *</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief description of the post..."
              rows={3}
              required
            />
          </div>

          {/* Featured Image */}
          <div className="space-y-2">
            <Label>Featured Image</Label>
            {featuredImagePreview ? (
              <div className="relative inline-block">
                <img
                  src={featuredImagePreview}
                  alt="Featured"
                  className="w-full max-w-sm h-48 object-cover rounded-lg border border-border"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 w-6 h-6"
                  onClick={handleRemoveFeaturedImage}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ) : (
              <div
                className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                onClick={() => featuredImageRef.current?.click()}
              >
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Click to upload featured image</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WebP supported</p>
              </div>
            )}
            <input
              ref={featuredImageRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFeaturedImageChange}
            />
          </div>

          {/* Content Editor */}
          <div className="space-y-2">
            <Label>Content *</Label>
            <div className="border border-input rounded-md overflow-hidden">
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                placeholder="Write your post content here..."
                style={{ minHeight: '300px' }}
              />
            </div>
          </div>

          {/* Publish Immediately */}
          <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg border border-border">
            <Checkbox
              id="publishImmediately"
              checked={publishImmediately}
              onCheckedChange={(checked) => setPublishImmediately(checked === true)}
            />
            <div>
              <Label htmlFor="publishImmediately" className="cursor-pointer font-medium">
                Publish Immediately
              </Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                If checked, the post will be published right after creation. Otherwise it will be saved as a draft.
              </p>
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center gap-4 pt-4">
            <Button type="submit" disabled={isSubmitting} className="min-w-[160px]">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  {publishImmediately ? 'Publishing...' : 'Saving...'}
                </>
              ) : (
                publishImmediately ? 'Create & Publish' : 'Save as Draft'
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate({ to: '/admin' })}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
