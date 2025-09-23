import { useContext, useState } from "react";
import { MessageCircle, UserPlus } from "lucide-react";

import UserContext from "@/context/user-context";

import { Button } from "@/components/ui/button";
import { Like } from "../like";
import { ProfilePostSkeleton } from "../Skeletons/profile-post-skeleton";
import CommentsSection from "../comments/comments-section";
import PostActions from "../post-management/post-actions";

export const EachPost = ({ details, onPostUpdate, onPostDelete }) => {
  const { user, loading } = useContext(UserContext);
  const [showComments, setShowComments] = useState(false);

  const successView = () => {
    return (
      <li className="w-full rounded-sm bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-black border-1 p-2 lg:p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between mb-2 order-1">
          <div className="flex items-center gap-3 mb-2">
            <img
              className="h-6 w-6 lg:h-10 lg:w-10 rounded-full"
              src={
                details.author.profilePic
                  ? details.author.profilePic
                  : "./profile-pic.jpg"
              }
              alt={details.author.username}
            />
            <div>
              <p className="text-base font-semibold">
                {details.author.username}
              </p>
              <p className="text-xs">
                {new Date(details.createdAt).toDateString()}{" "}
                {new Date(details.createdAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {details.author._id !== user._id && (
              <Button size="icon" variant={"elevated"}>
                <UserPlus />
              </Button>
            )}
            <Like postId={details._id} />
            <Button 
              size="icon" 
              variant={"elevated"}
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle />
            </Button>
            <PostActions 
              post={details} 
              currentUserId={user._id}
              onPostUpdate={onPostUpdate}
              onPostDelete={onPostDelete}
            />
          </div>
        </div>
        <div className="order-3 lg:order-2 ">
          <p className="text-sm text-justify">{details.content}</p>
        </div>
        {details.image && (
          <img
            className="w-full self-center h-[300px] rounded-sm lg:h-[350px] order-2 lg:order-3"
            src={details.image}
            alt={details.header}
          />
        )}
        
        {/* Comments Section */}
        {showComments && (
          <div className="order-4 border-t pt-4">
            <CommentsSection 
              post={details} 
              currentUserId={user._id}
              onCommentUpdate={onPostUpdate}
            />
          </div>
        )}
        
        {/* Comments Count */}
        {details.comments && details.comments.length > 0 && (
          <div className="order-5 text-xs text-muted-foreground">
            {details.comments.length} comment{details.comments.length !== 1 ? 's' : ''}
          </div>
        )}
      </li>
    );
  };

  if (loading) {
    return <ProfilePostSkeleton />;
  } else {
    return successView();
  }
};
