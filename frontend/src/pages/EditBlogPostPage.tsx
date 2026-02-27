import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useGetPost, useUpdatePost } from '../hooks/useQueries';
import { ExternalBlob, ImageMeta, ImageFit, ImageSize } from '../backend';
import { injectBlobIndexAttributes } from '../utils/imageUtils';

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
  'Lifestyle & Wellness',
  'Ayurveda',
  'Nutrition',
];

export default function EditBlogPostPage() {
  const navigate = useNavigate();
  const { postId } = useParams({ from: '/admin/edit/$postId' });
  const updatePost = useUpdatePost();

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
    imageFit: ImageFit.original,
    imageSize: ImageSize.medium,
    publishImmediately: false,
    publicationDate: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (post) {
      let pubDateStr = '';
      if (post.publicationDate) {
        const ms = Number(post.publicationDate) / 1_000_000;
        pubDateStr = new Date(ms).toISOString().split('T')[0];
      }

      setFormData({
        title: post.title,
        slug: post.slug,
        category: post.category,
        content: post.content,
        excerpt: post.excerpt,
        readTime: post.readTime ? post.readTime.toString() : '5',
        author: post.author,
        tags: post.tags.join(', '),
        imageFit: post.featuredImage?.fit ?? ImageFit.original,
        imageSize: post.featuredImage?.size ?? ImageSize.medium,
        publishImmediately: post.isPublished,
        publicationDate: pubDateStr,
      });

      if (post.featuredImage?.blob) {
        try {
          setExistingImageUrl(post.featuredImage.blob.getDirectURL());
        } catch {
          setExistingImageUrl(null);
        }
      }
    }
  }, [post]);

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
      return 'You are not authorized to update posts. Please make sure you are logged in as admin.';
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

      const readTimeNum = parseInt(formData.readTime, 10);
      const readTimeBigInt = BigInt(isNaN(readTimeNum) || readTimeNum < 1 ? 1 : readTimeNum);

      let featuredImage: ImageMeta | null = null;

      if (imageFile) {
        // New image uploaded
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
      } else if (post.featuredImage) {
        // Keep existing image with potentially updated size/fit
        featuredImage = {
          blob: post.featuredImage.blob,
          fit: formData.imageFit,
          size: formData.imageSize,
        };
      }

      const processedContent = injectBlobIndexAttributes(formData.content, 0);

      let publicationDate: bigint | null = null;
      if (formData.publicationDate) {
        publicationDate = BigInt(new Date(formData.publicationDate).getTime()) * BigInt(1_000_000);
      } else if (formData.publishImmediately) {
        publicationDate = BigInt(Date.now()) * BigInt(1_000_000);
      }

      await updatePost.mutateAsync({
        id: post.id,
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        category: formData.category,
        content: processedContent,
        excerpt: formData.excerpt.trim(),
        readTime: readTimeBigInt,
        author: formData.author.trim(),
        tags: tagsArray,
        featuredImage,
        inlineImages: post.inlineImages ?? [],
        isPublished: formData.publishImmediately,
        publishImmediately: formData.publishImmediately,
        publicationDate,
      });

      navigate({ to: '/admin' });
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
          {/* Featured Image */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h2 className="text-base font-semibold text-foreground mb-4">Featured Image</h2>
            {(existingImageUrl || imagePreview) && (
              <div className="mb-3">
                <img
                  src={imagePreview || existingImageUrl || ''}
                  alt="Current featured image"
                  className="w-full max-h-56 object-cover rounded-lg border border-border"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {imagePreview ? 'New image selected' : 'Current featured image'}
                </p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
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
            <div className="grid grid-cols-2 gap-4 mt-4">
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
          </div>

          {/* Post Details */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h2 className="text-base font-semibold text-foreground mb-4">Post Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Title <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter post title"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Slug <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="post-url-slug"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Author <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="Author name"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Read Time (minutes)
                  </label>
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
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="ayurveda, health, herbs"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Excerpt */}
          <div className="bg-card border border-border rounded-xl p-5">
            <label className="block text-sm font-semibold text-foreground mb-2">
              Excerpt <span className="text-destructive">*</span>
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Brief summary of the post"
              rows={3}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              required
            />
          </div>

          {/* Content */}
          <div className="bg-card border border-border rounded-xl p-5">
            <label className="block text-sm font-semibold text-foreground mb-2">
              Content <span className="text-destructive">*</span>
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your full blog post content here."
              rows={16}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y font-mono text-sm"
              required
            />
          </div>

          {/* Publication Settings */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h2 className="text-base font-semibold text-foreground mb-4">Publication Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Publication Date
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
                <label
                  htmlFor="publishImmediately"
                  className="text-sm font-medium text-foreground cursor-pointer"
                >
                  Publish Immediately
                </label>
              </div>
              {formData.publishImmediately && (
                <p className="text-xs text-primary bg-primary/10 px-3 py-2 rounded-lg">
                  ✓ This post will be published and visible to all visitors.
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pb-8">
            <button
              type="submit"
              disabled={updatePost.isPending}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {updatePost.isPending ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {uploadProgress > 0 && uploadProgress < 100
                    ? `Uploading ${uploadProgress}%...`
                    : 'Saving...'}
                </>
              ) : formData.publishImmediately ? (
                'Save & Publish'
              ) : (
                'Save as Draft'
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate({ to: '/admin' })}
              className="px-8 py-3 rounded-full font-semibold border border-border text-foreground hover:bg-muted transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
