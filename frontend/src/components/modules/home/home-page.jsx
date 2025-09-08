import React, { useState } from "react";

import { getAllPosts } from "@/actions/get-posts";

import { Separator } from "@/components/ui/separator";

import { HomeSkeleton } from "../Skeletons/home-skeleton";
import { ImageOff } from "lucide-react";
import { EachPost } from "./each-post";

const HomePage = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useState(async () => {
    const posts = await getAllPosts();
    setPosts(posts);
    setLoading(false);
  }, []);

  const loadingView = () => <HomeSkeleton />;

  const noPostsView = () => {
    return (
      <div className="flex gap-2 min-h-screen h-full">
        <div className="w-1/4 p-10 hidden lg:block">
          <h1 className="text-2xl font-semibold">Messages</h1>
        </div>
        <Separator className="hidden lg:block" orientation="vertical" />
        <div className="p-5 lg:p-10 space-y-10 lg:w-2/4">
          <h1 className="text-2xl lg:text-4xl font-semibold">Posts</h1>
          <div className="flex flex-col text-center">
            <ImageOff className="self-center size-70 lg:size-100" />
            <h1 className="text-2xl lg:text-4xl font-semibold">
              No Posts yet.
            </h1>
            <p className="text-sm lg:text-base">
              There are no posts yet. Try to post image or text post to view it
              here.
            </p>
          </div>
        </div>
        <Separator className="hidden lg:block" orientation="vertical" />
        <div className="w-1/4 p-10 hidden lg:block">
          <h1 className="text-2xl font-semibold">Suggestion</h1>
        </div>
      </div>
    );
  };

  const successView = () => {
    return (
      <div className="flex gap-2 min-h-screen h-full">
        <div className="w-1/4 p-10 hidden lg:block">
          <h1 className="text-2xl font-semibold">Messages</h1>
        </div>
        <Separator className="hidden lg:block" orientation="vertical" />
        <div className="p-5 lg:p-10 space-y-8 lg:w-2/4">
          <h1 className="text-2xl lg:text-4xl font-semibold">Posts</h1>
          <ul className="flex flex-col flex-wrap gap-10">
            {posts.map((eachEle) => (
              <EachPost key={eachEle._id} details={eachEle} />
            ))}
          </ul>
        </div>
        <Separator className="hidden lg:block" orientation="vertical" />
        <div className="w-1/4 p-10 hidden lg:block">
          <h1 className="text-2xl font-semibold">Suggestion</h1>
        </div>
      </div>
    );
  };

  if (loading) {
    return loadingView();
  } else {
    if (posts.length === 0) {
      return noPostsView();
    } else {
      return successView();
    }
  }
};

export default HomePage;
