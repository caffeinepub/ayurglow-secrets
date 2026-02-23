import { useState } from 'react';
import { useGetComments, useAddComment } from '@/hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, MessageCircle, User } from 'lucide-react';

interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const { data: comments = [], isLoading } = useGetComments(postId);
  const addComment = useAddComment();

  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !comment.trim()) {
      alert('Please fill in both name and comment fields');
      return;
    }

    try {
      await addComment.mutateAsync({
        postId,
        author: name.trim(),
        content: comment.trim(),
      });

      // Clear form after successful submission
      setName('');
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment. Please try again.');
    }
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000); // Convert nanoseconds to milliseconds
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="mt-12 space-y-8">
      {/* Comments Display */}
      <Card className="border-2 border-sage-green/30 shadow-lg">
        <CardHeader className="bg-sage-green/10">
          <CardTitle className="text-2xl font-serif text-earth-green flex items-center gap-2">
            <MessageCircle className="w-6 h-6" />
            Comments ({comments.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-earth-green" />
            </div>
          ) : comments.length === 0 ? (
            <p className="text-warm-brown/60 text-center py-8">
              No comments yet. Be the first to share your thoughts!
            </p>
          ) : (
            <div className="space-y-6">
              {comments.map((comment, index) => (
                <div
                  key={index}
                  className="pb-6 border-b border-sage-green/20 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sage-green/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-earth-green" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-earth-green">
                          {comment.author}
                        </span>
                        <span className="text-xs text-warm-brown/50">
                          {formatDate(comment.timestamp)}
                        </span>
                      </div>
                      <p className="text-warm-brown/80 leading-relaxed">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Comment Form */}
      <Card className="border-2 border-sage-green/30 shadow-lg">
        <CardHeader className="bg-sage-green/10">
          <CardTitle className="text-2xl font-serif text-earth-green">
            Share Your Thoughts
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-warm-brown font-semibold">
                Your Name *
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="border-sage-green/30 focus:border-earth-green"
                required
                disabled={addComment.isPending}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment" className="text-warm-brown font-semibold">
                Your Comment *
              </Label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts..."
                className="border-sage-green/30 focus:border-earth-green min-h-[120px]"
                required
                disabled={addComment.isPending}
              />
            </div>

            <Button
              type="submit"
              disabled={addComment.isPending}
              className="w-full bg-earth-green hover:bg-earth-green/90 text-cream"
            >
              {addComment.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Posting...
                </>
              ) : (
                'Post Comment'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
