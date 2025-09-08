import { useContext } from "react";
import { MessageCircle, UserPlus } from "lucide-react";

import UserContext from "@/context/user-context";

import { Button } from "@/components/ui/button";
import { Like } from "../like";
import { ProfilePostSkeleton } from "../Skeletons/profile-post-skeleton";

export const EachPost = ({ details }) => {
  const { user, loading } = useContext(UserContext);

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
          <div>
            {details.author._id !== user._id && (
              <Button size="icon" variant={"elevated"}>
                <UserPlus />
              </Button>
            )}
            <Like postId={details._id} />
            <Button size="icon" variant={"elevated"}>
              <MessageCircle />
            </Button>
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
      </li>
    );
  };

  if (loading) {
    return <ProfilePostSkeleton />;
  } else {
    return successView();
  }
};
