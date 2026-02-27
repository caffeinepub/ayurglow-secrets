import React, { useState, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useCreatePost } from '../hooks/useQueries';
import { ExternalBlob, ImageMeta, ImageFit, ImageSize } from '../backend';
import { injectBlobIndexAttributes } from '../utils/imageUtils';
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
  imageFit: ImageFit;
  imageSize: ImageSize;
  publishImmediately: boolean;
  publicationDate: string;
}

const CATEGORIES = [
  'Health Remedies',
  'Skin Care',
  'Hair Care',
  'Weight Management',
  'Lifestyle',
  'Wellness',
  'Ayurveda',
  'Nutrition',
];

export default function CreateBlogPostPage() {
  const navigate = useNavigate();
  const createPost = useCreatePost();
  const { identity } = useInternetIdentity();

  const [formData, setFormData] = useState<FormData>({
    title: '',
    slug: '',
    category: CATEGORIES[0],
    content: '',
    excerpt: '',
    readTime: '5',
    author: '',
    tags: '',
    imageFit: ImageFit.original,
    imageSize: ImageSize.medium,
    publishImmediately: false,
    publicationDate: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!identity) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Login Required</h2>
          <p className="text-muted-foreground">Please log in to create blog posts.</p>
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
      if (name === 'title' && !formData.slug) {
        const slug = value
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim();
        setFormData((prev) => ({ ...prev, title: value, slug }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
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
      return 'You are not authorized to create posts. Please make sure you are logged in.';
    }
    if (msg.includes('Only users can')) {
      return 'You need to be a registered user to create posts.';
    }
    return `Failed to create post: ${msg}`;
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
      const id = `post-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const tagsArray = formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const readTimeNum = parseInt(formData.readTime, 10);
      const readTimeBigInt = BigInt(isNaN(readTimeNum) || readTimeNum < 1 ? 1 : readTimeNum);

      // Build featuredImage as ImageMeta | null
      let featuredImage: ImageMeta | null = null;
      if (imageFile) {
        const arrayBuffer = await imageFile.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const blob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((pct) => {
          setUploadProgress(pct);
        });
        featuredImage = {
          blob,
          fit: formData.imageFit,
          size: formData.imageSize,
        };
      }

      // Inject blob index attributes into content for inline images
      const processedContent = injectBlobIndexAttributes(formData.content, 0);

      // Publication date as bigint | null
      let publicationDate: bigint | null = null;
      if (formData.publicationDate) {
        publicationDate = BigInt(new Date(formData.publicationDate).getTime()) * BigInt(1_000_000);
      } else if (formData.publishImmediately) {
        publicationDate = BigInt(Date.now()) * BigInt(1_000_000);
      }

      await createPost.mutateAsync({
        id,
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        category: formData.category,
        content: processedContent,
        excerpt: formData.excerpt.trim(),
        readTime: readTimeBigInt,
        author: formData.author.trim(),
        tags: tagsArray,
        featuredImage,
        inlineImages: [],
        isPublished: formData.publishImmediately,
        publishImmediately: formData.publishImmediately,
        publicationDate,
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
          <h1 className="text-3xl font-bold text-foreground font-serif">Create New Blog Post</h1>
          <p className="text-muted-foreground mt-2">Fill in the details below to publish a new article.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Featured Image — at the top */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h2 className="text-base font-semibold text-foreground mb-4">Featured Image</h2>
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
                  alt="Preview"
                  className="w-full max-h-56 object-cover rounded-lg border border-border"
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
            {imageFile && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Image Size</label>
                  <select
                    name="imageSize"
                    value={formData.imageSize}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value={ImageSize.small}>Small</option>
                    <option value={ImageSize.medium}>Medium</option>
                    <option value={ImageSize.large}>Large</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Image Fit</label>
                  <select
                    name="imageFit"
                    value={formData.imageFit}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value={ImageFit.original}>Original</option>
                    <option value={ImageFit.cover}>Cover</option>
                    <option value={ImageFit.contain}>Contain</option>
                  </select>
                </div>
              </div>
            )}
          </div>

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
              rows={14}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y font-mono text-sm"
              placeholder="Write your post content here (HTML supported)"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              HTML is supported. To embed an inline image, add an &lt;img&gt; tag with <code>data-blob-index="0"</code> (increment index for each image).
            </p>
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

          {/* Publication Date & Publish Toggle */}
          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            <h2 className="text-base font-semibold text-foreground">Publishing Options</h2>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Publication Date <span className="text-muted-foreground text-xs">(optional)</span>
              </label>
              <input
                type="date"
                name="publicationDate"
                value={formData.publicationDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="publishImmediately"
                name="publishImmediately"
                checked={formData.publishImmediately}
                onChange={handleChange}
                className="w-4 h-4 accent-primary"
              />
              <label htmlFor="publishImmediately" className="text-sm font-medium text-foreground">
                Publish Immediately
              </label>
            </div>
            <p className="text-xs text-muted-foreground">
              When enabled, the post will be published and visible to readers right away. Otherwise it will be saved as a draft.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={createPost.isPending}
              className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {createPost.isPending && (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              )}
              {createPost.isPending ? 'Creating...' : 'Create Post'}
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
