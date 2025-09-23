import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trash2, Send } from "lucide-react";
import { addComment, deleteComment } from "@/actions/comments";
import { toast } from "sonner";

const CommentsSection = ({ post, currentUserId, onCommentUpdate }) => {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comments, setComments] = useState(post.comments || []);

  useEffect(() => {
    setComments(post.comments || []);
  }, [post.comments]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      await addComment(post._id, newComment);
      setNewComment("");
      toast.success("Comment added successfully!");
      if (onCommentUpdate) onCommentUpdate();
    } catch (error) {
      toast.error(error.message || "Failed to add comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(post._id, commentId);
      setComments(comments.filter(comment => comment._id !== commentId));
      toast.success("Comment deleted successfully!");
      if (onCommentUpdate) onCommentUpdate();
    } catch (error) {
      toast.error(error.message || "Failed to delete comment");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-4">
      {/* Add Comment Form */}
      <form onSubmit={handleAddComment} className="flex gap-2">
        <Input
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1"
        />
        <Button 
          type="submit" 
          disabled={isSubmitting || !newComment.trim()}
          size="sm"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>

      {/* Comments List */}
      <div className="space-y-3">
        {comments.length === 0 ? (
          <p className="text-muted-foreground text-sm">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="flex gap-3 p-3 bg-muted/50 rounded-lg">
              <Avatar className="h-8 w-8">
                <AvatarImage src={comment.user?.profilePic} />
                <AvatarFallback>
                  {comment.user?.username?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">
                      {comment.user?.username || "Unknown User"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(comment.date)}
                    </span>
                  </div>
                  
                  {(comment.user?._id === currentUserId || post.author._id === currentUserId) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteComment(comment._id)}
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                
                <p className="text-sm">{comment.text}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
