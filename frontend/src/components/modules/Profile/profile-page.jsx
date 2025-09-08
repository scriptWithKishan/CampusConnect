import React, { useContext } from "react";

import { Separator } from "@/components/ui/separator";
import UserContext from "@/context/user-context";

import { UserPosts } from "./user-posts";
import { ProfileSkeleton } from "../Skeletons/profile-skeleton";
import { PostForm } from "./post-form";

const ProfilePage = () => {
  const { user, loading } = useContext(UserContext);

  const loadingView = () => (
    <div className="min-h-screen w-full flex flex-col lg:flex-row h-full">
      <div className="flex lg:flex-col justify-center lg:justify-start items-center p-10 gap-10 w-full lg:w-1/4">
        <div className="h-full">
          <ProfileSkeleton />
        </div>
      </div>
      <Separator className={"hidden lg:block"} orientation="vertical" />
      <Separator className={"block lg:hidden"} orientation="horizontal" />
      <div className="w-full lg:w-2/4"></div>
      <Separator className={"hidden lg:block"} orientation="vertical" />
      <Separator className={"block lg:hidden"} orientation="horizontal" />
      <div className="w-full lg:w-1/4"></div>
    </div>
  );

  const successView = () => {
    return (
      <div className="min-h-screen w-full flex flex-col lg:flex-row h-full ">
        <div className="order-1 lg:order-1 flex lg:flex-col justify-center lg:justify-start items-center p-10 gap-10 w-full lg:w-1/4">
          <div className="">
            <img
              className="h-30 w-30 lg:h-40 lg:w-40 rounded-full"
              src={user.profilePic ? user.profilePic : "./profile-pic.jpg"}
              alt={user.username}
            />
          </div>
          <div>
            <h1 className="text-2xl lg:text-4xl font-semibold">
              {user.username}
            </h1>
            <p className="text-sm lg:text-base">{user.email}</p>
            <p className="text-sm lg:text-base">
              {user.bio ? user.bio : "No Bio."}
            </p>
          </div>
        </div>
        <Separator
          className={"hidden lg:order-2 lg:block"}
          orientation="vertical"
        />
        <Separator
          className={"order-2 block lg:hidden"}
          orientation="horizontal"
        />
        <div className="order-5 lg:order-3 w-full lg:w-2/4">
          <UserPosts />
        </div>
        <Separator
          className={"hidden lg:order-4 lg:block"}
          orientation="vertical"
        />
        <Separator
          className={"order-4 block lg:hidden"}
          orientation="horizontal"
        />
        <div className="order-3 p-5 lg:p-10 lg:order-5 w-full space-y-6 lg:w-1/4">
          <h1 className="text-2xl font-semibold">Make a post</h1>
          <PostForm />
        </div>
      </div>
    );
  };

  if (loading) {
    return loadingView();
  } else {
    return successView();
  }
};

export default ProfilePage;
