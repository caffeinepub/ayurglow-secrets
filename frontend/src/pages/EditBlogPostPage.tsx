import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { ImagePlus, X, Upload, Loader2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useGetPost, useUpdatePost } from '../hooks/useQueries';
import { ExternalBlob, ImageFit, ImageSize, ImageMeta, InlineImage } from '../backend';
import { toast } from 'sonner';

const CATEGORIES = [
  'skin-care', 'hair-care', 'health-remedies',
  'lifestyle-wellness', 'weight-management', 'general',
];

interface InlineImageEntry {
  blob: ExternalBlob;
  fit: ImageFit;
  size: ImageSize;
  previewUrl: string;
  position: number;
}

export default function EditBlogPostPage() {
  const { postId } = useParams({ from: '/admin/edit/$postId' });
  const navigate = useNavigate();
  const { data: post, isLoading } = useGetPost(postId);
  const updatePost = useUpdatePost();

  // Form fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('general');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [publishImmediately, setPublishImmediately] = useState(false);

  // Featured image
  const [featuredImageBlob, setFeaturedImageBlob] = useState<ExternalBlob | null>(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState<string | null>(null);
  const [featuredImageFit, setFeaturedImageFit] = useState<ImageFit>(ImageFit.cover);
  const [featuredImageSize, setFeaturedImageSize] = useState<ImageSize>(ImageSize.large);
  const [featuredUploading, setFeaturedUploading] = useState(false);
  const [featuredUploadProgress, setFeaturedUploadProgress] = useState(0);

  // Inline images
  const [inlineImages, setInlineImages] = useState<InlineImageEntry[]>([]);
  const [inlineUploading, setInlineUploading] = useState(false);
  const [inlineUploadProgress, setInlineUploadProgress] = useState(0);

  const featuredFileRef = useRef<HTMLInputElement>(null);
  const inlineFileRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Populate form from existing post
  useEffect(() => {
    if (post && !initialized) {
      setTitle(post.title);
      setSlug(post.slug);
      setCategory(post.category);
      setContent(post.content);
      setExcerpt(post.excerpt);
      setAuthor(post.author);
      setTags(post.tags);
      setPublishImmediately(post.isPublished);

      if (post.featuredImage) {
        setFeaturedImageBlob(post.featuredImage.blob);
        setFeaturedImagePreview(post.featuredImage.blob.getDirectURL());
        setFeaturedImageFit(post.featuredImage.fit as ImageFit);
        setFeaturedImageSize(post.featuredImage.size as ImageSize);
      }

      // Load existing inline images
      if (post.inlineImages && post.inlineImages.length > 0) {
        const entries: InlineImageEntry[] = post.inlineImages.map((img, idx) => ({
          blob: img.image.blob,
          fit: img.image.fit as ImageFit,
          size: img.image.size as ImageSize,
          previewUrl: img.image.blob.getDirectURL(),
          position: idx,
        }));
        setInlineImages(entries);
      }

      setInitialized(true);
    }
  }, [post, initialized]);

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) setTags([...tags, t]);
    setTagInput('');
  };
  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  // Featured image upload
  const handleFeaturedImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFeaturedUploading(true);
    setFeaturedUploadProgress(0);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        setFeaturedUploadProgress(pct);
      });
      setFeaturedImageBlob(blob);
      setFeaturedImagePreview(URL.createObjectURL(file));
    } catch {
      toast.error('Failed to load featured image');
    } finally {
      setFeaturedUploading(false);
    }
  };

  // Inline image upload and insert at cursor
  const handleInlineImageInsert = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';

    setInlineUploading(true);
    setInlineUploadProgress(0);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        setInlineUploadProgress(pct);
      });
      const previewUrl = URL.createObjectURL(file);
      const index = inlineImages.length;

      const entry: InlineImageEntry = {
        blob,
        fit: ImageFit.original,
        size: ImageSize.medium,
        previewUrl,
        position: index,
      };
      setInlineImages((prev) => [...prev, entry]);

      // Insert marker at cursor position
      const marker = `{{inline-image:${index}}}`;
      const textarea = contentRef.current;
      if (textarea) {
        const start = textarea.selectionStart ?? content.length;
        const end = textarea.selectionEnd ?? content.length;
        const newContent = content.slice(0, start) + '\n' + marker + '\n' + content.slice(end);
        setContent(newContent);
        setTimeout(() => {
          textarea.selectionStart = start + marker.length + 2;
          textarea.selectionEnd = start + marker.length + 2;
          textarea.focus();
        }, 0);
      } else {
        setContent((prev) => prev + '\n' + marker + '\n');
      }

      toast.success('Image inserted into content');
    } catch {
      toast.error('Failed to insert image');
    } finally {
      setInlineUploading(false);
    }
  };

  const updateInlineImageFit = (index: number, fit: ImageFit) => {
    setInlineImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, fit } : img))
    );
  };

  const updateInlineImageSize = (index: number, size: ImageSize) => {
    setInlineImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, size } : img))
    );
  };

  const removeInlineImage = (index: number) => {
    setInlineImages((prev) => prev.filter((_, i) => i !== index));
    const marker = `{{inline-image:${index}}}`;
    setContent((prev) => prev.replace(new RegExp(`\\n?${marker.replace(/[{}:]/g, '\\$&')}\\n?`, 'g'), '\n'));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !excerpt) {
      toast.error('Please fill in title, content, and excerpt');
      return;
    }
    setIsSubmitting(true);
    try {
      const readTime = BigInt(Math.max(1, Math.ceil(content.split(' ').length / 200)));

      let finalFeaturedImage: ImageMeta | null = null;
      if (featuredImageBlob) {
        finalFeaturedImage = {
          blob: featuredImageBlob,
          fit: featuredImageFit,
          size: featuredImageSize,
        };
      }

      const finalInlineImages: InlineImage[] = inlineImages.map((img, idx) => ({
        image: { blob: img.blob, fit: img.fit, size: img.size },
        position: BigInt(idx),
      }));

      await updatePost.mutateAsync({
        id: postId,
        title,
        slug,
        category,
        content,
        excerpt,
        readTime,
        author,
        tags,
        featuredImage: finalFeaturedImage,
        inlineImages: finalInlineImages,
        isPublished: publishImmediately,
        publishImmediately,
        publicationDate: null,
      });

      toast.success('Post updated successfully!');
      navigate({ to: '/admin' });
    } catch (err) {
      toast.error('Failed to update post. Make sure you are logged in as admin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        <span className="ml-3 text-muted-foreground">Loading post...</span>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground text-lg">Post not found.</p>
          <Button className="mt-4" onClick={() => navigate({ to: '/admin' })}>
            Back to Admin
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-playfair text-foreground">Edit Post</h1>
          <p className="text-muted-foreground mt-1">Update your blog post</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader><CardTitle>Post Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter post title"
                  required
                />
              </div>
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="post-url-slug"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="excerpt">Excerpt *</Label>
                <Textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief description of the post"
                  rows={2}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Content Editor */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Content *</CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => inlineFileRef.current?.click()}
                    disabled={inlineUploading}
                    className="flex items-center gap-2"
                  >
                    {inlineUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Uploading {inlineUploadProgress}%
                      </>
                    ) : (
                      <>
                        <ImageIcon className="w-4 h-4" />
                        Insert Image
                      </>
                    )}
                  </Button>
                  <input
                    ref={inlineFileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleInlineImageInsert}
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Click "Insert Image" to upload an image and insert it at the cursor position.
              </p>
            </CardHeader>
            <CardContent>
              <Textarea
                ref={contentRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your blog post content here..."
                rows={16}
                required
                className="font-mono text-sm"
              />
              {/* Inline images manager */}
              {inlineImages.length > 0 && (
                <div className="mt-4 space-y-3">
                  <p className="text-sm font-medium text-foreground">Inline Images ({inlineImages.length})</p>
                  {inlineImages.map((img, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 border rounded-lg bg-muted/30">
                      <img
                        src={img.previewUrl}
                        alt={`Inline ${idx}`}
                        className="w-16 h-16 object-cover rounded border flex-shrink-0"
                      />
                      <div className="flex-1 space-y-2">
                        <p className="text-xs font-mono text-muted-foreground">
                          Marker: <code className="bg-muted px-1 rounded">{`{{inline-image:${idx}}}`}</code>
                        </p>
                        <div className="flex gap-2">
                          <Select
                            value={img.size}
                            onValueChange={(v) => updateInlineImageSize(idx, v as ImageSize)}
                          >
                            <SelectTrigger className="h-7 text-xs w-28">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value={ImageSize.small}>Small</SelectItem>
                              <SelectItem value={ImageSize.medium}>Medium</SelectItem>
                              <SelectItem value={ImageSize.large}>Large</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select
                            value={img.fit}
                            onValueChange={(v) => updateInlineImageFit(idx, v as ImageFit)}
                          >
                            <SelectTrigger className="h-7 text-xs w-28">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value={ImageFit.original}>Original</SelectItem>
                              <SelectItem value={ImageFit.cover}>Cover</SelectItem>
                              <SelectItem value={ImageFit.contain}>Contain</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive hover:text-destructive"
                        onClick={() => removeInlineImage(idx)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card>
            <CardHeader><CardTitle>Featured Image</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div
                className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => featuredFileRef.current?.click()}
              >
                {featuredImagePreview ? (
                  <div className="relative">
                    <img
                      src={featuredImagePreview}
                      alt="Featured"
                      className="max-h-48 mx-auto rounded object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFeaturedImagePreview(null);
                        setFeaturedImageBlob(null);
                      }}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    {featuredUploading ? (
                      <>
                        <Loader2 className="w-8 h-8 animate-spin" />
                        <p>Uploading... {featuredUploadProgress}%</p>
                      </>
                    ) : (
                      <>
                        <ImagePlus className="w-8 h-8" />
                        <p>Click to replace featured image</p>
                      </>
                    )}
                  </div>
                )}
              </div>
              <input
                ref={featuredFileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFeaturedImageChange}
              />
              {featuredImageBlob && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Image Fit</Label>
                    <Select
                      value={featuredImageFit}
                      onValueChange={(v) => setFeaturedImageFit(v as ImageFit)}
                    >
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value={ImageFit.cover}>Cover</SelectItem>
                        <SelectItem value={ImageFit.contain}>Contain</SelectItem>
                        <SelectItem value={ImageFit.original}>Original</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Image Size</Label>
                    <Select
                      value={featuredImageSize}
                      onValueChange={(v) => setFeaturedImageSize(v as ImageSize)}
                    >
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value={ImageSize.small}>Small</SelectItem>
                        <SelectItem value={ImageSize.medium}>Medium</SelectItem>
                        <SelectItem value={ImageSize.large}>Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader><CardTitle>Tags</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add a tag"
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                />
                <Button type="button" variant="outline" onClick={addTag}>Add</Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)}>
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Publish Settings */}
          <Card>
            <CardHeader><CardTitle>Publish Settings</CardTitle></CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Switch
                  id="publish"
                  checked={publishImmediately}
                  onCheckedChange={setPublishImmediately}
                />
                <Label htmlFor="publish">Published</Label>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate({ to: '/admin' })}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
