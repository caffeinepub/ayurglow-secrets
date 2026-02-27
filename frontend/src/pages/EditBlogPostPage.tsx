import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useGetPost, useUpdatePost } from '../hooks/useQueries';
import { ExternalBlob } from '../backend';
import { injectBlobIndexAttributes, getBlobImageUrl } from '../utils/imageUtils';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

interface FormData {
  title: string;
  slug: string;
  category: string;
  content: string;
  excerpt: string;
  readTime: string;
  author: string;
  tags: string;
  imageSize: string;
  isPublished: boolean;
}

const CATEGORIES = [
  'Health Remedies',
  'Skin Care',
  'Hair Care',
  'Wellness',
  'Ayurveda',
  'Nutrition',
  'Lifestyle',
];

export default function EditBlogPostPage() {
  const navigate = useNavigate();
  const { postId } = useParams({ strict: false }) as { postId: string };
  const updatePost = useUpdatePost();
  const { identity } = useInternetIdentity();

  const { data: post, isLoading: postLoading } = useGetPost(postId);

  const [formData, setFormData] = useState<FormData>({
    title: '',
    slug: '',
    category: CATEGORIES[0],
    content: '',
    excerpt: '',
    readTime: '5',
    author: '',
    tags: '',
    imageSize: '',
    isPublished: false,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        slug: post.slug,
        category: post.category,
        content: post.content,
        excerpt: post.excerpt,
        readTime: post.readTime ? post.readTime.toString() : '5',
        author: post.author,
        tags: post.tags.join(', '),
        imageSize: post.imageSize ?? '',
        isPublished: post.isPublished,
      });
      if (post.image) {
        setExistingImageUrl(getBlobImageUrl(post.image));
      }
    }
  }, [post]);

  if (!identity) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Login Required</h2>
          <p className="text-muted-foreground">Please log in to edit blog posts.</p>
        </div>
      </div>
    );
  }

  if (postLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-8">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Post Not Found</h2>
          <p className="text-muted-foreground">The post you are trying to edit does not exist.</p>
        </div>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getFriendlyErrorMessage = (err: unknown): string => {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes('Expected v3 response body') || msg.includes('v3 response')) {
      return 'There was a communication error with the server. Please check your inputs and try again.';
    }
    if (msg.includes('Unauthorized') || msg.includes('unauthorized')) {
      return 'You are not authorized to update this post. Please make sure you are logged in.';
    }
    if (msg.includes('Only users can')) {
      return 'You need to be a registered user to update posts.';
    }
    return `Failed to update post: ${msg}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.title.trim()) { setError('Title is required.'); return; }
    if (!formData.slug.trim()) { setError('Slug is required.'); return; }
    if (!formData.content.trim()) { setError('Content is required.'); return; }
    if (!formData.excerpt.trim()) { setError('Excerpt is required.'); return; }
    if (!formData.author.trim()) { setError('Author is required.'); return; }

    try {
      const tagsArray = formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      // Parse readTime as a number then convert to bigint
      const readTimeNum = parseInt(formData.readTime, 10);
      const readTimeBigInt = BigInt(isNaN(readTimeNum) || readTimeNum < 1 ? 1 : readTimeNum);

      // Handle image
      let imageBlob: ExternalBlob | null = null;
      let imageSizeValue: string | null = formData.imageSize.trim() || null;

      if (imageFile) {
        const arrayBuffer = await imageFile.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        imageBlob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((pct) => {
          setUploadProgress(pct);
        });
        if (!imageSizeValue) {
          imageSizeValue = `${imageFile.size}`;
        }
      } else if (post.image) {
        // Keep existing image
        imageBlob = post.image;
        imageSizeValue = post.imageSize ?? null;
      }

      // Inject blob index attributes into content for inline images
      const processedContent = injectBlobIndexAttributes(formData.content, 0);

      // publishedAt must be bigint | null, never undefined
      let publishedAt: bigint | null = null;
      if (formData.isPublished) {
        if (post.publishedDate) {
          publishedAt = BigInt(post.publishedDate);
        } else {
          publishedAt = BigInt(Date.now()) * BigInt(1_000_000);
        }
      }

      // Keep existing contentImages
      const contentImages = post.contentImages ?? [];

      await updatePost.mutateAsync({
        id: postId,
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        category: formData.category,
        content: processedContent,
        excerpt: formData.excerpt.trim(),
        readTime: readTimeBigInt,
        author: formData.author.trim(),
        tags: tagsArray,
        image: imageBlob,
        imageSize: imageSizeValue,
        contentImages,
        isPublished: formData.isPublished,
        publishedAt,
      });

      navigate({ to: '/admin/posts' });
    } catch (err) {
      setError(getFriendlyErrorMessage(err));
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground font-serif">Edit Blog Post</h1>
          <p className="text-muted-foreground mt-2">Update the details of your blog post.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Title <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Enter post title"
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Slug <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="post-url-slug"
              required
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Author <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Author name"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Excerpt <span className="text-destructive">*</span>
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              placeholder="Brief description of the post"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Content <span className="text-destructive">*</span>
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={12}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y font-mono text-sm"
              placeholder="Write your post content here (HTML supported)"
              required
            />
          </div>

          {/* Read Time */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Read Time (minutes)</label>
            <input
              type="number"
              name="readTime"
              value={formData.readTime}
              onChange={handleChange}
              min="1"
              max="60"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Tags <span className="text-muted-foreground text-xs">(comma-separated)</span>
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="ayurveda, health, wellness"
            />
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Featured Image</label>
            {existingImageUrl && !imagePreview && (
              <div className="mb-3">
                <p className="text-xs text-muted-foreground mb-1">Current image:</p>
                <img
                  src={existingImageUrl}
                  alt="Current featured"
                  className="w-full max-h-48 object-cover rounded-lg border border-border"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            {imagePreview && (
              <div className="mt-3">
                <img
                  src={imagePreview}
                  alt="New image preview"
                  className="w-full max-h-48 object-cover rounded-lg border border-border"
                />
              </div>
            )}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="mt-2">
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Uploading: {uploadProgress}%</p>
              </div>
            )}
          </div>

          {/* Publish */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isPublished"
              name="isPublished"
              checked={formData.isPublished}
              onChange={handleChange}
              className="w-4 h-4 accent-primary"
            />
            <label htmlFor="isPublished" className="text-sm font-medium text-foreground">
              Published
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={updatePost.isPending}
              className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {updatePost.isPending && (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              )}
              {updatePost.isPending ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => navigate({ to: '/admin/posts' })}
              className="px-6 py-2.5 border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
