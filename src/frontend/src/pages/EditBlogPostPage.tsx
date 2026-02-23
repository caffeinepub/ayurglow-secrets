import { useState, useEffect } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useGetPost, useUpdatePost } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Loader2, Upload, X } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { ExternalBlob } from '../backend';

export default function EditBlogPostPage() {
  const navigate = useNavigate();
  const { id } = useParams({ strict: false }) as { id: string };
  const { data: post, isLoading, error } = useGetPost(id);
  const updatePost = useUpdatePost();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [readTime, setReadTime] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingImage, setExistingImage] = useState<ExternalBlob | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const categories = ['Hair Care', 'Skin Care', 'Health', 'Beauty', 'Lifestyle'];

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setCategory(post.category);
      setContent(post.content);
      setExcerpt(post.excerpt);
      setReadTime(post.readTime.toString());
      setAuthor(post.author);
      setTags(post.tags.join(', '));
      setIsPublished(post.isPublished);
      
      if (post.image) {
        setExistingImage(post.image);
        setImagePreview(post.image.getDirectURL());
      }
    }
  }, [post]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      setImageFile(file);
      setExistingImage(null);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setExistingImage(null);
    setUploadProgress(0);
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !category || !content || !excerpt || !readTime || !author) {
      alert('Please fill in all required fields');
      return;
    }

    const slug = generateSlug(title);
    const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);

    let imageBlob: ExternalBlob | null = existingImage;

    if (imageFile) {
      try {
        const arrayBuffer = await imageFile.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        imageBlob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
          setUploadProgress(percentage);
        });
      } catch (error) {
        console.error('Error processing image:', error);
        alert('Failed to process image. Please try again.');
        return;
      }
    }

    try {
      await updatePost.mutateAsync({
        id,
        title,
        slug,
        category,
        content,
        excerpt,
        readTime: BigInt(readTime),
        author,
        publishedDate: post?.publishedDate || BigInt(Date.now()),
        tags: tagsArray,
        isPublished,
        image: imageBlob,
      });

      navigate({ to: '/admin/posts' });
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-earth-green mx-auto mb-4" />
          <p className="text-warm-brown">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="w-full min-h-screen bg-cream flex items-center justify-center">
        <Card className="max-w-md border-2 border-sage-green/30">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-serif text-earth-green mb-4">Post Not Found</h2>
            <p className="text-warm-brown mb-6">The post you're looking for doesn't exist.</p>
            <Button
              onClick={() => navigate({ to: '/admin/posts' })}
              className="bg-earth-green hover:bg-earth-green/90 text-cream"
            >
              Back to Admin
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate({ to: '/admin/posts' })}
          className="mb-6 text-earth-green hover:text-warm-brown"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Admin
        </Button>

        <Card className="border-2 border-sage-green/30 shadow-lg">
          <CardHeader className="bg-sage-green/10">
            <CardTitle className="text-3xl font-serif text-earth-green">
              Edit Blog Post
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-warm-brown font-semibold">
                  Title *
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter post title"
                  className="border-sage-green/30 focus:border-earth-green"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-warm-brown font-semibold">
                  Category *
                </Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger className="border-sage-green/30 focus:border-earth-green">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt" className="text-warm-brown font-semibold">
                  Excerpt *
                </Label>
                <Textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief description of the post"
                  className="border-sage-green/30 focus:border-earth-green min-h-[100px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-warm-brown font-semibold">Content *</Label>
                <div className="border border-sage-green/30 rounded-lg overflow-hidden">
                  <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    placeholder="Write your post content here..."
                    className="bg-white"
                    modules={{
                      toolbar: [
                        [{ header: [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['link', 'blockquote'],
                        ['clean'],
                      ],
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image" className="text-warm-brown font-semibold">
                  Featured Image
                </Label>
                <div className="space-y-3">
                  {!imagePreview ? (
                    <div className="border-2 border-dashed border-sage-green/30 rounded-lg p-8 text-center hover:border-earth-green transition-colors">
                      <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="image"
                        className="cursor-pointer flex flex-col items-center gap-2"
                      >
                        <Upload className="w-10 h-10 text-sage-green" />
                        <span className="text-warm-brown/70">
                          Click to upload an image
                        </span>
                        <span className="text-xs text-warm-brown/50">
                          PNG, JPG, WEBP up to 5MB
                        </span>
                      </label>
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-64 object-cover rounded-lg border-2 border-sage-green/30"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                      {uploadProgress > 0 && uploadProgress < 100 && (
                        <div className="absolute bottom-2 left-2 right-2 bg-black/50 rounded p-2">
                          <div className="text-xs text-white mb-1">
                            Uploading: {uploadProgress}%
                          </div>
                          <div className="w-full bg-white/30 rounded-full h-2">
                            <div
                              className="bg-earth-green h-2 rounded-full transition-all"
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="author" className="text-warm-brown font-semibold">
                    Author *
                  </Label>
                  <Input
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Author name"
                    className="border-sage-green/30 focus:border-earth-green"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="readTime" className="text-warm-brown font-semibold">
                    Read Time (minutes) *
                  </Label>
                  <Input
                    id="readTime"
                    type="number"
                    min="1"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="5"
                    className="border-sage-green/30 focus:border-earth-green"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags" className="text-warm-brown font-semibold">
                  Tags (comma-separated)
                </Label>
                <Input
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="ayurveda, hair care, natural remedies"
                  className="border-sage-green/30 focus:border-earth-green"
                />
              </div>

              <div className="flex items-center space-x-3 p-4 bg-sage-green/10 rounded-lg">
                <Switch
                  id="publish"
                  checked={isPublished}
                  onCheckedChange={setIsPublished}
                />
                <Label htmlFor="publish" className="text-warm-brown font-semibold cursor-pointer">
                  Publish immediately
                </Label>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={updatePost.isPending}
                  className="flex-1 bg-earth-green hover:bg-earth-green/90 text-cream"
                >
                  {updatePost.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
                  className="border-sage-green/30 text-warm-brown hover:bg-sage-green/10"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
