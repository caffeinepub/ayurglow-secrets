import { useGetAllPosts, useDeletePost } from '@/hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, Plus, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function AdminPostsPage() {
  const navigate = useNavigate();
  const { data: posts, isLoading, error, refetch } = useGetAllPosts();
  const deletePost = useDeletePost();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!postToDelete) return;

    try {
      await deletePost.mutateAsync(postToDelete);
      setDeleteDialogOpen(false);
      setPostToDelete(null);
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const openDeleteDialog = (postId: string) => {
    setPostToDelete(postId);
    setDeleteDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-earth-green" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="border-destructive">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 text-destructive mb-4">
                <AlertCircle className="w-6 h-6" />
                <h3 className="text-lg font-semibold">Error Loading Posts</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Failed to load blog posts. Please try again.
              </p>
              <Button onClick={() => refetch()} variant="outline">
                Retry
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-earth-green mb-2 font-serif">
              Manage Blog Posts
            </h1>
            <p className="text-warm-brown/70">
              Create, edit, and manage all your blog posts
            </p>
          </div>
          <Button
            onClick={() => navigate({ to: '/admin/create-post' })}
            className="bg-earth-green hover:bg-earth-green/90 text-cream"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Post
          </Button>
        </div>

        {!posts || posts.length === 0 ? (
          <Card className="border-2 border-dashed border-sage-green/30">
            <CardContent className="pt-12 pb-12 text-center">
              <div className="w-16 h-16 rounded-full bg-sage-green/10 flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-earth-green" />
              </div>
              <h3 className="text-xl font-semibold text-earth-green mb-2">
                No blog posts yet
              </h3>
              <p className="text-warm-brown/70 mb-6">
                Get started by creating your first blog post
              </p>
              <Button
                onClick={() => navigate({ to: '/admin/create-post' })}
                className="bg-earth-green hover:bg-earth-green/90 text-cream"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Post
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <Card key={post.id} className="border-2 border-sage-green/30 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-2xl text-earth-green font-serif">
                          {post.title}
                        </CardTitle>
                        <Badge
                          variant={post.isPublished ? 'default' : 'secondary'}
                          className={
                            post.isPublished
                              ? 'bg-earth-green text-cream'
                              : 'bg-warm-brown/20 text-warm-brown'
                          }
                        >
                          {post.isPublished ? 'Published' : 'Draft'}
                        </Badge>
                      </div>
                      <p className="text-sm text-warm-brown/70">
                        {post.category} • {post.readTime.toString()} min read • By {post.author}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate({ to: `/admin/edit-post/${post.id}` })}
                        className="border-earth-green text-earth-green hover:bg-earth-green hover:text-cream"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openDeleteDialog(post.id)}
                        className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        disabled={deletePost.isPending}
                      >
                        {deletePost.isPending && postToDelete === post.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-warm-brown/80 mb-4">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-sage-green text-earth-green"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the blog post.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
