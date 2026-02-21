import { useNavigate } from '@tanstack/react-router';
import { useGetAllPosts, useDeletePost } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function AdminPostsPage() {
  const navigate = useNavigate();
  const { data: posts, isLoading } = useGetAllPosts();
  const deletePost = useDeletePost();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deletePost.mutateAsync(id);
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp));
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-earth-green mx-auto mb-4" />
          <p className="text-warm-brown">Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-earth-green font-serif mb-2">
              Blog Posts Admin
            </h1>
            <p className="text-warm-brown/70">
              Manage your blog posts and content
            </p>
          </div>
          <Button
            onClick={() => navigate({ to: '/blog/create' })}
            className="bg-earth-green hover:bg-earth-green/90 text-cream"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create New Post
          </Button>
        </div>

        {!posts || posts.length === 0 ? (
          <Card className="border-2 border-sage-green/30">
            <CardContent className="p-12 text-center">
              <img
                src="/assets/generated/icon-wellness.dim_128x128.png"
                alt="No posts"
                className="w-24 h-24 mx-auto mb-6 opacity-50"
              />
              <h2 className="text-2xl font-serif text-earth-green mb-4">
                No Posts Yet
              </h2>
              <p className="text-warm-brown/70 mb-6">
                Start creating your first blog post to share Ayurvedic wisdom
              </p>
              <Button
                onClick={() => navigate({ to: '/blog/create' })}
                className="bg-earth-green hover:bg-earth-green/90 text-cream"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Post
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="border-2 border-sage-green/30 hover:border-earth-green transition-all"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-earth-green font-serif">
                          {post.title}
                        </h3>
                        <Badge
                          variant={post.isPublished ? 'default' : 'secondary'}
                          className={
                            post.isPublished
                              ? 'bg-green-500/10 text-green-700 hover:bg-green-500/20'
                              : 'bg-amber-500/10 text-amber-700 hover:bg-amber-500/20'
                          }
                        >
                          {post.isPublished ? 'Published' : 'Draft'}
                        </Badge>
                      </div>
                      <p className="text-warm-brown/70 text-sm mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-warm-brown/60">
                        <span className="font-medium">{post.category}</span>
                        <span>•</span>
                        <span>{formatDate(post.publishedDate)}</span>
                        <span>•</span>
                        <span>{Number(post.readTime)} min read</span>
                        <span>•</span>
                        <span>By {post.author}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate({ to: `/blog/edit/${post.id}` })}
                        className="border-sage-green/30 text-earth-green hover:bg-sage-green/10"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={deletingId === post.id}
                            className="border-red-300 text-red-600 hover:bg-red-50"
                          >
                            {deletingId === post.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <>
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete
                              </>
                            )}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Post?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{post.title}"? This action
                              cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(post.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
