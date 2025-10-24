import { useContext } from "react";

import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Like } from "./like";
import { Comment } from "./comment";

import UserContext from "@/context/user-context";
import { ProfilePostSkeleton } from "./Skeletons/profile-post-skeleton";

export const EachPost = ({ details }) => {
  const { user, loading } = useContext(UserContext);

  const successView = () => {
    return (
      <li className="w-full rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-black border-1 flex flex-col gap-2 bg-gray-100">
        {details.image && (
          <img
            className="w-full self-center h-[300px] rounded-sm lg:h-[350px] "
            src={details.image}
            alt={details.header}
          />
        )}
        <div className="p-2 lg:p-4">
          <div className="flex items-center justify-between mb-2">
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
            <div className="flex flex-row items-center gap-x-3">
              {user && details.author._id !== user._id && (
                <Button size="icon" variant={"elevated"} className="bg-transparent">
                  <UserPlus />
                </Button>
              )}
              <Like postId={details._id} />
              <div className="flex items-center gap-x-2">
                <Comment postId={details._id} commentsData={details.comments} />
                <p className="text-xs text-gray-500">{details.comments.length}</p>
              </div>
            </div>
          </div>
          <div className="">
            <p className="text-sm text-justify">{details.content}</p>
          </div>
        </div>
      </li>
    );
  };

  if (loading) {
    return <ProfilePostSkeleton />;
  } else {
    return successView();
  }
};
