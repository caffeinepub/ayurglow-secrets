import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Plus, Edit, Trash2, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import {
  useGetAllVisiblePosts,
  useDeletePost,
  useSetPublishedState,
} from '../hooks/useQueries';
import { BlogPostView } from '../backend';

export default function AdminPostsPage() {
  const navigate = useNavigate();
  const { data: posts, isLoading } = useGetAllVisiblePosts();
  const deletePostMutation = useDeletePost();
  const setPublishedStateMutation = useSetPublishedState();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<BlogPostView | null>(null);

  const handleCreatePost = () => {
    navigate({ to: '/admin/create-post' });
  };

  const handleEditPost = (post: BlogPostView) => {
    navigate({ to: '/admin/edit-post/$id', params: { id: post.id } });
  };

  const handleDeleteClick = (post: BlogPostView) => {
    setPostToDelete(post);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;
    try {
      await deletePostMutation.mutateAsync(postToDelete.id);
      toast.success('Post deleted successfully');
    } catch (err) {
      toast.error('Failed to delete post');
    } finally {
      setDeleteDialogOpen(false);
      setPostToDelete(null);
    }
  };

  const handleTogglePublish = async (post: BlogPostView) => {
    try {
      if (post.isPublished) {
        await setPublishedStateMutation.mutateAsync({
          id: post.id,
          isPublished: false,
          publishedDate: null,
        });
        toast.success('Post unpublished');
      } else {
        const now = BigInt(Date.now()) * BigInt(1_000_000); // nanoseconds
        await setPublishedStateMutation.mutateAsync({
          id: post.id,
          isPublished: true,
          publishedDate: now,
        });
        toast.success('Post published');
      }
    } catch (err: any) {
      toast.error(err?.message || 'Failed to update post status');
    }
  };

  const formatDate = (timestamp: bigint | undefined) => {
    if (!timestamp) return 'N/A';
    try {
      const ms = Number(timestamp) / 1_000_000;
      return new Date(ms).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return 'N/A';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading posts...</span>
        </div>
      </div>
    );
  }

  const sortedPosts = [...(posts || [])].sort((a, b) => {
    const aTime = Number(a.createdDate);
    const bTime = Number(b.createdDate);
    return bTime - aTime;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground font-serif">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your blog posts</p>
          </div>
          <Button onClick={handleCreatePost} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create New Post
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Total Posts</p>
            <p className="text-2xl font-bold text-foreground">{sortedPosts.length}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Published</p>
            <p className="text-2xl font-bold text-primary">
              {sortedPosts.filter((p) => p.isPublished).length}
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Drafts</p>
            <p className="text-2xl font-bold text-muted-foreground">
              {sortedPosts.filter((p) => !p.isPublished).length}
            </p>
          </div>
        </div>

        {/* Posts Table */}
        {sortedPosts.length === 0 ? (
          <div className="text-center py-16 bg-card border border-border rounded-lg">
            <p className="text-muted-foreground text-lg mb-4">No posts yet</p>
            <Button onClick={handleCreatePost}>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Post
            </Button>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Title</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden md:table-cell">Category</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden sm:table-cell">Status</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden lg:table-cell">Created</th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedPosts.map((post, index) => (
                    <tr
                      key={post.id}
                      className={`border-b border-border last:border-0 hover:bg-muted/30 transition-colors ${
                        index % 2 === 0 ? '' : 'bg-muted/10'
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-foreground text-sm line-clamp-1">{post.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{post.excerpt}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="text-sm text-muted-foreground">{post.category}</span>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <Badge variant={post.isPublished ? 'default' : 'secondary'}>
                          {post.isPublished ? 'Published' : 'Draft'}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <span className="text-sm text-muted-foreground">{formatDate(post.createdDate)}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleTogglePublish(post)}
                            title={post.isPublished ? 'Unpublish' : 'Publish'}
                            disabled={setPublishedStateMutation.isPending}
                          >
                            {setPublishedStateMutation.isPending ? (
                              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                            ) : post.isPublished ? (
                              <EyeOff className="w-4 h-4 text-muted-foreground" />
                            ) : (
                              <Eye className="w-4 h-4 text-muted-foreground" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditPost(post)}
                            title="Edit post"
                          >
                            <Edit className="w-4 h-4 text-muted-foreground" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteClick(post)}
                            title="Delete post"
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{postToDelete?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPostToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deletePostMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
