import { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useGetPost, useUpdatePost } from '@/hooks/useQueries';
import { Loader2, X, Image as ImageIcon } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { ExternalBlob } from '../backend';

export default function EditBlogPostPage() {
  const navigate = useNavigate();
  const { id } = useParams({ from: '/admin/edit-post/$id' });
  const { data: post, isLoading } = useGetPost(id);
  const updatePostMutation = useUpdatePost();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [readTime, setReadTime] = useState('5');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [featuredImage, setFeaturedImage] = useState<ExternalBlob | null>(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState<string>('');
  const [beginningImage, setBeginningImage] = useState<ExternalBlob | null>(null);
  const [beginningImagePreview, setBeginningImagePreview] = useState<string>('');
  const [contentImages, setContentImages] = useState<ExternalBlob[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);

  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setSlug(post.slug);
      setCategory(post.category);
      setContent(post.content);
      setExcerpt(post.excerpt);
      setReadTime(post.readTime.toString());
      setAuthor(post.author);
      setTags(post.tags.join(', '));
      setIsPublished(post.isPublished);
      
      if (post.image) {
        setFeaturedImage(post.image);
        setFeaturedImagePreview(post.image.getDirectURL());
      }

      if (post.contentImages && post.contentImages.length > 0) {
        const [firstImage, ...restImages] = post.contentImages;
        setBeginningImage(firstImage);
        setBeginningImagePreview(firstImage.getDirectURL());
        setContentImages(restImages);
      }
    }
  }, [post]);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    const generatedSlug = value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setSlug(generatedSlug);
  };

  const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      
      const blob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
        setUploadProgress(percentage);
      });

      setFeaturedImage(blob);
      const previewUrl = URL.createObjectURL(file);
      setFeaturedImagePreview(previewUrl);
    } catch (error) {
      console.error('Error uploading featured image:', error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleBeginningImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      
      const blob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
        setUploadProgress(percentage);
      });

      setBeginningImage(blob);
      const previewUrl = URL.createObjectURL(file);
      setBeginningImagePreview(previewUrl);
    } catch (error) {
      console.error('Error uploading beginning image:', error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleContentImageUpload = useCallback(async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      const file = input.files?.[0];
      if (!file) return;

      setIsUploading(true);
      setUploadProgress(0);

      try {
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        
        const blob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
          setUploadProgress(percentage);
        });

        const imageUrl = blob.getDirectURL();
        
        setContentImages(prev => [...prev, blob]);

        const quill = quillRef.current?.getEditor();
        if (quill) {
          const range = quill.getSelection();
          const index = range ? range.index : quill.getLength();
          quill.insertEmbed(index, 'image', imageUrl);
          quill.setSelection(index + 1, 0);
        }
      } catch (error) {
        console.error('Error uploading content image:', error);
      } finally {
        setIsUploading(false);
        setUploadProgress(0);
      }
    });
  }, []);

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ color: [] }, { background: [] }],
        ['link', 'image'],
        ['clean'],
      ],
      handlers: {
        image: handleContentImageUpload,
      },
    },
  }), [handleContentImageUpload]);

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'color', 'background',
    'link', 'image',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allContentImages = beginningImage 
      ? [beginningImage, ...contentImages] 
      : contentImages;

    try {
      await updatePostMutation.mutateAsync({
        id,
        title,
        slug,
        category,
        content,
        excerpt,
        readTime: BigInt(readTime),
        author,
        publishedDate: BigInt(Date.now()),
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
        isPublished,
        image: featuredImage,
        contentImages: allContentImages,
      });

      navigate({ to: '/admin/posts' });
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-earth-green" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Post not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-serif text-earth-green">Edit Blog Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter post title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="post-slug"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Health Remedies">Health Remedies</SelectItem>
                  <SelectItem value="Skin Care">Skin Care</SelectItem>
                  <SelectItem value="Hair Care">Hair Care</SelectItem>
                  <SelectItem value="Wellness">Wellness</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Input
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief description"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="readTime">Read Time (minutes)</Label>
              <Input
                id="readTime"
                type="number"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                min="1"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="ayurveda, health, natural"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="featuredImage">Featured Image</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="featuredImage"
                  type="file"
                  accept="image/*"
                  onChange={handleFeaturedImageUpload}
                  className="flex-1"
                />
                {isUploading && uploadProgress > 0 && (
                  <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                )}
              </div>
              {featuredImagePreview && (
                <div className="relative mt-2">
                  <img src={featuredImagePreview} alt="Featured preview" className="w-full h-48 object-cover rounded-lg" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setFeaturedImage(null);
                      setFeaturedImagePreview('');
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="beginningImage">Beginning Image (appears before content)</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="beginningImage"
                  type="file"
                  accept="image/*"
                  onChange={handleBeginningImageUpload}
                  className="flex-1"
                />
                {isUploading && uploadProgress > 0 && (
                  <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                )}
              </div>
              {beginningImagePreview && (
                <div className="relative mt-2">
                  <img src={beginningImagePreview} alt="Beginning preview" className="w-full h-48 object-cover rounded-lg" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setBeginningImage(null);
                      setBeginningImagePreview('');
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
              <p className="text-sm text-muted-foreground">
                This image will appear at the very beginning of your blog post content.
              </p>
            </div>

            <div className="space-y-2">
              <Label>Content</Label>
              <div className="border rounded-lg overflow-hidden">
                <ReactQuill
                  ref={quillRef}
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={modules}
                  formats={formats}
                  className="min-h-[400px]"
                  placeholder="Write your blog post content here... Click the image icon in the toolbar to insert images within your content."
                />
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Use the image button in the toolbar above to insert images anywhere in your content.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="isPublished"
                checked={isPublished}
                onCheckedChange={setIsPublished}
              />
              <Label htmlFor="isPublished">Publish immediately</Label>
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={updatePostMutation.isPending || isUploading}
                className="bg-earth-green hover:bg-earth-green/90"
              >
                {updatePostMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Post'
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate({ to: '/admin/posts' })}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
