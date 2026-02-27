import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { toast } from 'sonner';
import { Loader2, ArrowLeft, Upload, X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useGetPost, useUpdatePost, usePublishPost } from '../hooks/useQueries';
import { ExternalBlob } from '../backend';
import { injectBlobIndexAttributes, replaceContentImageUrls } from '../utils/imageUtils';

const CATEGORIES = [
  'Health Remedies',
  'Skin Care',
  'Hair Care',
  'Ayurveda',
  'Wellness',
  'Nutrition',
  'Lifestyle',
];

export default function EditBlogPostPage() {
  const navigate = useNavigate();
  const { id } = useParams({ from: '/admin/edit-post/$id' });

  const { data: post, isLoading, error } = useGetPost(id);
  const updatePostMutation = useUpdatePost();
  const publishPostMutation = usePublishPost();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [readTime, setReadTime] = useState('5');
  const [tags, setTags] = useState('');
  const [publishImmediately, setPublishImmediately] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Featured image state
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState<string | null>(null);
  const [featuredImageSize, setFeaturedImageSize] = useState<string>('');
  const [existingFeaturedImage, setExistingFeaturedImage] = useState<ExternalBlob | null>(null);
  const featuredImageRef = useRef<HTMLInputElement>(null);

  const quillRef = useRef<ReactQuill>(null);

  // Populate form when post data loads
  useEffect(() => {
    if (post && !initialized) {
      setTitle(post.title);
      setSlug(post.slug);
      setCategory(post.category);
      setExcerpt(post.excerpt);
      setAuthor(post.author);
      setReadTime(String(Number(post.readTime)));
      setTags(post.tags.join(', '));
      setPublishImmediately(false);

      // Restore content with resolved blob image URLs
      try {
        const hasBeginningImage = !!(post.image);
        const resolvedContent = replaceContentImageUrls(
          post.content,
          post.contentImages || [],
          hasBeginningImage
        );
        setContent(resolvedContent);
      } catch (err) {
        console.error('Error resolving content images:', err);
        setContent(post.content);
      }

      // Set existing featured image
      if (post.image) {
        setExistingFeaturedImage(post.image);
        setFeaturedImagePreview(post.image.getDirectURL());
        setFeaturedImageSize(post.imageSize || '');
      }

      setInitialized(true);
    }
  }, [post, initialized]);

  const handleFeaturedImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFeaturedImageFile(file);
    setFeaturedImageSize(`${Math.round(file.size / 1024)}KB`);
    setExistingFeaturedImage(null);
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
    setExistingFeaturedImage(null);
    if (featuredImageRef.current) featuredImageRef.current.value = '';
  };

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
        const response = await fetch(src);
        const arrayBuffer = await response.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
        const blob = ExternalBlob.fromBytes(bytes);
        contentImages.push(blob);
        img.setAttribute('src', `blob-placeholder-${i}`);
        img.setAttribute('data-blob-index', String(i));
      } else if (src.startsWith('http') || src.startsWith('blob:') || src.includes('icp')) {
        // External URL (already stored blob) - preserve it
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
    if (!post) return;

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
      } else if (existingFeaturedImage) {
        featuredImageBlob = existingFeaturedImage;
        featuredImageSizeStr = featuredImageSize || null;
      }

      // Prepare content images
      const { processedContent, contentImages } = await prepareContentForSave(content);
      const finalContent = injectBlobIndexAttributes(processedContent, 0);

      const tagList = tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      await updatePostMutation.mutateAsync({
        id: post.id,
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

      if (publishImmediately && !post.isPublished) {
        await publishPostMutation.mutateAsync({ id: post.id, publishedDate: null });
        toast.success('Post updated and published!');
      } else {
        toast.success('Post updated successfully!');
      }

      navigate({ to: '/admin' });
    } catch (err: any) {
      console.error('Error updating post:', err);
      toast.error(err?.message || 'Failed to update post. Please try again.');
    }
  };

  const isSubmitting = updatePostMutation.isPending || publishPostMutation.isPending;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading post...</span>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Post Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The post you're trying to edit could not be found.
          </p>
          <Button variant="outline" onClick={() => navigate({ to: '/admin' })}>
            Back to Admin
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate({ to: '/admin' })}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground font-serif">Edit Post</h1>
            <p className="text-muted-foreground text-sm">Update the details of your blog post</p>
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
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
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

          {/* Publish Immediately (only show if not already published) */}
          {!post.isPublished && (
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
                  If checked, the post will be published after saving.
                </p>
              </div>
            </div>
          )}

          {post.isPublished && (
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm text-primary font-medium">✓ This post is currently published</p>
            </div>
          )}

          {/* Submit */}
          <div className="flex items-center gap-4 pt-4">
            <Button type="submit" disabled={isSubmitting} className="min-w-[160px]">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  {publishImmediately ? 'Publishing...' : 'Saving...'}
                </>
              ) : (
                publishImmediately && !post.isPublished ? 'Save & Publish' : 'Save Changes'
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
