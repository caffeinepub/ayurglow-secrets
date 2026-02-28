import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Plus, Edit, Trash2, Eye, EyeOff, Calendar, User, Tag, AlertCircle, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
import { useGetAllPostsForAdmin, useDeletePost, useSetPublishedState } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { toast } from 'sonner';

export default function AdminPostsPage() {
  const navigate = useNavigate();
  const { data: posts, isLoading, error, refetch } = useGetAllPostsForAdmin();
  const deleteMutation = useDeletePost();
  const publishMutation = useSetPublishedState();
  const { identity, login, loginStatus } = useInternetIdentity();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const handleDelete = async (postId: string) => {
    setDeletingId(postId);
    try {
      await deleteMutation.mutateAsync(postId);
      toast.success('Post deleted successfully');
    } catch (err) {
      toast.error('Failed to delete post. Please make sure you are logged in as admin.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleTogglePublish = async (postId: string, currentState: boolean) => {
    setTogglingId(postId);
    try {
      await publishMutation.mutateAsync({
        id: postId,
        isPublished: !currentState,
        publishedDate: !currentState ? BigInt(Date.now()) * BigInt(1_000_000) : null,
        publicationDate: null,
      });
      toast.success(currentState ? 'Post unpublished' : 'Post published');
    } catch (err) {
      toast.error('Failed to update publish state. Please make sure you are logged in as admin.');
    } finally {
      setTogglingId(null);
    }
  };

  const formatDate = (timestamp: bigint | undefined) => {
    if (!timestamp) return 'N/A';
    const ms = Number(timestamp) / 1_000_000;
    return new Date(ms).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isAuthError = error && (
    String(error).includes('Unauthorized') ||
    String(error).includes('Only admins') ||
    String(error).includes('trap')
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold font-playfair text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your blog posts</p>
          </div>
          <div className="flex gap-3">
            {!isAuthenticated && (
              <Button
                variant="outline"
                onClick={login}
                disabled={isLoggingIn}
                className="flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                {isLoggingIn ? 'Logging in...' : 'Login for Full Access'}
              </Button>
            )}
            <Button
              onClick={() => navigate({ to: '/admin/create' })}
              className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Post
            </Button>
          </div>
        </div>

        {/* Auth notice */}
        {!isAuthenticated && (
          <Alert className="mb-6 border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-700 dark:text-amber-400">
              <strong>Note:</strong> Login is required to create, edit, delete, or publish posts. 
              You can view all posts after logging in.
            </AlertDescription>
          </Alert>
        )}

        {/* Auth error */}
        {isAuthError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Admin access required to view all posts. Please{' '}
              <button
                onClick={login}
                className="underline font-medium"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? 'logging in...' : 'login'}
              </button>{' '}
              to access the admin dashboard.
            </AlertDescription>
          </Alert>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            <span className="ml-3 text-muted-foreground">Loading posts...</span>
          </div>
        )}

        {/* Posts list */}
        {!isLoading && !isAuthError && posts && posts.length === 0 && (
          <Card className="text-center py-16">
            <CardContent>
              <p className="text-muted-foreground text-lg mb-4">No blog posts yet.</p>
              <Button onClick={() => navigate({ to: '/admin/create' })}>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Post
              </Button>
            </CardContent>
          </Card>
        )}

        {!isLoading && !isAuthError && posts && posts.length > 0 && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">{posts.length} post{posts.length !== 1 ? 's' : ''} total</p>
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <CardTitle className="text-lg font-semibold text-foreground truncate">
                          {post.title}
                        </CardTitle>
                        <Badge variant={post.isPublished ? 'default' : 'secondary'}>
                          {post.isPublished ? 'Published' : 'Draft'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTogglePublish(post.id, post.isPublished)}
                        disabled={togglingId === post.id}
                        className="flex items-center gap-1"
                      >
                        {togglingId === post.id ? (
                          <div className="animate-spin rounded-full h-3 w-3 border-b border-current" />
                        ) : post.isPublished ? (
                          <EyeOff className="w-3 h-3" />
                        ) : (
                          <Eye className="w-3 h-3" />
                        )}
                        {post.isPublished ? 'Unpublish' : 'Publish'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate({ to: '/admin/edit/$postId', params: { postId: post.id } })}
                        className="flex items-center gap-1"
                      >
                        <Edit className="w-3 h-3" />
                        Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1 text-destructive hover:text-destructive border-destructive/30 hover:border-destructive"
                          >
                            <Trash2 className="w-3 h-3" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Post</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{post.title}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(post.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              {deletingId === post.id ? 'Deleting...' : 'Delete'}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Created: {formatDate(post.createdDate)}
                    </span>
                    {post.publishedDate && (
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        Published: {formatDate(post.publishedDate)}
                      </span>
                    )}
                    <span className="capitalize bg-muted px-2 py-0.5 rounded text-xs">
                      {post.category}
                    </span>
                    {post.tags.length > 0 && (
                      <span className="flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {post.tags.slice(0, 3).join(', ')}
                        {post.tags.length > 3 && ` +${post.tags.length - 3}`}
                      </span>
                    )}
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
