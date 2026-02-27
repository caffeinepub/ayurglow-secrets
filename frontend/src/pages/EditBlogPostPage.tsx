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
import { useGetPost, useUpdatePost } from '../hooks/useQueries';
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

function getFriendlyErrorMessage(err: any): string {
  const raw: string = err?.message || String(err) || '';
  if (raw.toLowerCase().includes('unauthorized') || raw.toLowerCase().includes('only users can')) {
    return 'Unable to save post. Please make sure you are logged in and try again.';
  }
  if (raw) return raw;
  return 'Failed to update post. Please try again.';
}

export default function EditBlogPostPage() {
  const navigate = useNavigate();
  const { id } = useParams({ from: '/admin/edit-post/$id' });

  const { data: post, isLoading, error } = useGetPost(id);
  const updatePostMutation = useUpdatePost();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [readTime, setReadTime] = useState('5');
  const [tags, setTags] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Featured image state
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState<string | null>(null);
  const [featuredImageSize, setFeaturedImageSize] = useState<string>('');
  const [existingImageBlob, setExistingImageBlob] = useState<ExternalBlob | null>(null);
  const featuredImageRef = useRef<HTMLInputElement>(null);

  const quillRef = useRef<ReactQuill>(null);

  // Populate form when post data loads
  useEffect(() => {
    if (!post) return;
    setTitle(post.title);
    setSlug(post.slug);
    setCategory(post.category);
    setExcerpt(post.excerpt);
    setAuthor(post.author);
    setReadTime(String(post.readTime));
    setTags(post.tags.join(', '));
    setIsPublished(post.isPublished);

    // Restore inline content images
    if (post.contentImages && post.contentImages.length > 0) {
      const restoredContent = replaceContentImageUrls(post.content, post.contentImages, false);
      setContent(restoredContent);
    } else {
      setContent(post.content);
    }

    // Restore featured image
    if (post.image) {
      setExistingImageBlob(post.image);
      setFeaturedImagePreview(post.image.getDirectURL());
      setFeaturedImageSize(post.imageSize || '');
    }
  }, [post]);

  const handleFeaturedImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFeaturedImageFile(file);
    setExistingImageBlob(null);
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
    setExistingImageBlob(null);
    if (featuredImageRef.current) featuredImageRef.current.value = '';
  };

  // Quill image handler
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
      } else if (src.startsWith('http') || src.startsWith('blob:')) {
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
    setErrorMessage(null);

    if (!title.trim()) { toast.error('Title is required'); return; }
    if (!slug.trim()) { toast.error('Slug is required'); return; }
    if (!excerpt.trim()) { toast.error('Excerpt is required'); return; }
    if (!content.trim()) { toast.error('Content is required'); return; }

    const parsedReadTime = parseInt(readTime, 10);
    if (isNaN(parsedReadTime) || parsedReadTime < 1) { toast.error('Read time must be a positive number'); return; }

    try {
      // Prepare featured image
      let featuredImageBlob: ExternalBlob | null = existingImageBlob;
      let featuredImageSizeStr: string | null = featuredImageSize || null;

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

      const publishedAt = isPublished
        ? (post?.publishedDate ? BigInt(post.publishedDate) : BigInt(Date.now()) * BigInt(1_000_000))
        : null;

      const success = await updatePostMutation.mutateAsync({
        id,
        title: title.trim(),
        slug: slug.trim(),
        category,
        content: finalContent,
        excerpt: excerpt.trim(),
        readTime: BigInt(parsedReadTime),
        author: author.trim(),
        tags: tagList,
        image: featuredImageBlob,
        imageSize: featuredImageSizeStr,
        contentImages,
        isPublished,
        publishedAt,
      });

      if (!success) {
        throw new Error('Post update failed');
      }

      toast.success('Post updated successfully!');
      navigate({ to: '/admin' });
    } catch (err: any) {
      const msg = getFriendlyErrorMessage(err);
      setErrorMessage(msg);
      toast.error(msg);
    }
  };

  const isSubmitting = updatePostMutation.isPending;

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
        <div className="text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
          <h2 className="text-xl font-semibold text-foreground">Post Not Found</h2>
          <p className="text-muted-foreground">The post you're trying to edit could not be found.</p>
          <Button onClick={() => navigate({ to: '/admin' })}>Back to Admin</Button>
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

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-sm text-destructive">{errorMessage}</p>
          </div>
        )}

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
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
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
                  alt="Featured preview"
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
                {featuredImageSize && (
                  <p className="text-xs text-muted-foreground mt-1">{featuredImageSize}</p>
                )}
              </div>
            ) : (
              <div
                className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => featuredImageRef.current?.click()}
              >
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Click to upload featured image</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF up to 10MB</p>
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
                placeholder="Write your blog post content here..."
                style={{ minHeight: '300px' }}
              />
            </div>
          </div>

          {/* Published State */}
          <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg border border-border">
            <Checkbox
              id="isPublished"
              checked={isPublished}
              onCheckedChange={(checked) => setIsPublished(checked === true)}
            />
            <div>
              <Label htmlFor="isPublished" className="cursor-pointer font-medium">
                Published
              </Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isPublished
                  ? 'This post is visible to the public.'
                  : 'This post is saved as a draft and not visible to the public.'}
              </p>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center gap-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
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
