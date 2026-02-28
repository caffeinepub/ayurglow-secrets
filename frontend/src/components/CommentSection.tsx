import { useState } from 'react';
import { MessageCircle, Send, User, Clock } from 'lucide-react';
import { useGetComments, useAddComment } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import type { Comment } from '../backend';

interface CommentSectionProps {
  postId: string;
  /** Optional pre-loaded comments from the post data. Falls back to fetching via useGetComments. */
  comments?: Comment[];
}

export default function CommentSection({ postId, comments: propComments }: CommentSectionProps) {
  const [authorName, setAuthorName] = useState('');
  const [commentText, setCommentText] = useState('');

  // Only fetch comments from backend if they weren't passed as a prop
  const { data: fetchedComments = [], isLoading } = useGetComments(
    propComments === undefined ? postId : ''
  );

  const comments = propComments !== undefined ? propComments : fetchedComments;
  const loading = propComments === undefined ? isLoading : false;

  const addComment = useAddComment();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await addComment.mutateAsync({
        postId,
        author: authorName.trim(),
        content: commentText.trim(),
      });
      setAuthorName('');
      setCommentText('');
      toast.success('Comment added successfully!');
    } catch {
      toast.error('Failed to add comment. Please try again.');
    }
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1_000_000);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-playfair font-bold text-foreground">
          Share Your Comment
        </h2>
      </div>
      <p className="text-muted-foreground mb-8">
        We'd love to hear your thoughts! Share your experience with these Ayurvedic remedies or ask a question.
      </p>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="bg-muted/30 rounded-xl p-6 mb-8 border border-border">
        <h3 className="font-semibold text-foreground mb-4">Leave a Comment</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-foreground mb-1">
              Your Name
            </label>
            <Input
              id="author"
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Enter your name"
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-foreground mb-1">
              Comment
            </label>
            <Textarea
              id="comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Share your thoughts, experiences, or questions..."
              rows={4}
              className="w-full"
            />
          </div>
          <Button
            type="submit"
            disabled={addComment.isPending}
            className="flex items-center gap-2"
          >
            {addComment.isPending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Submit Comment
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Comments List */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">
          {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
        </h3>

        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="animate-pulse bg-muted rounded-lg p-4">
                <div className="h-4 bg-muted-foreground/20 rounded w-1/4 mb-2" />
                <div className="h-3 bg-muted-foreground/20 rounded w-full mb-1" />
                <div className="h-3 bg-muted-foreground/20 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-primary/10 rounded-full p-1.5">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">{comment.author}</span>
                  <span className="text-muted-foreground text-sm flex items-center gap-1 ml-auto">
                    <Clock className="h-3 w-3" />
                    {formatDate(comment.timestamp)}
                  </span>
                </div>
                <p className="text-foreground/80 text-sm leading-relaxed">{comment.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
