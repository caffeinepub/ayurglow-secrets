import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useGetComments, useAddComment } from '@/hooks/useQueries';
import { Loader2, MessageSquare } from 'lucide-react';

interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  
  const { data: comments = [], isLoading } = useGetComments(postId);
  const addCommentMutation = useAddComment();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!author.trim() || !content.trim()) return;

    try {
      await addCommentMutation.mutateAsync({
        postId,
        author: author.trim(),
        content: content.trim(),
      });
      
      setAuthor('');
      setContent('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-sage-green/20">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl font-serif text-earth-green flex items-center gap-2">
            <MessageSquare className="w-6 h-6" />
            Share Your Comment
          </CardTitle>
          <p className="text-sm text-foreground/70">
            We'd love to hear your thoughts! Share your experience or ask questions below.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="author">Your Name</Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Your Comment</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your thoughts..."
                rows={4}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={addCommentMutation.isPending}
              className="bg-earth-green hover:bg-earth-green/90"
            >
              {addCommentMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Posting...
                </>
              ) : (
                'Post Comment'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-earth-green" />
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-earth-green font-serif">
            Comments ({comments.length})
          </h3>
          {comments.map((comment, index) => (
            <Card key={index} className="border-sage-green/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-sage-green/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-earth-green font-semibold">
                      {comment.author.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-earth-green">{comment.author}</span>
                      <span className="text-xs text-foreground/60">
                        {new Date(Number(comment.timestamp)).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <p className="text-foreground/80 leading-relaxed">{comment.content}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-sage-green/20">
          <CardContent className="py-8 text-center">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 text-sage-green/50" />
            <p className="text-foreground/70">No comments yet. Be the first to share your thoughts!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
