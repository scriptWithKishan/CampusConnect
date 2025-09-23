import React, { useState, useEffect } from "react";

import { getAllPosts } from "@/actions/get-posts";

import { Separator } from "@/components/ui/separator";

import { HomeSkeleton } from "../Skeletons/home-skeleton";
import { ImageOff } from "lucide-react";
import { EachPost } from "./each-post";
import UserSearch from "../user-search/user-search";

const HomePage = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getAllPosts();
        setPosts(posts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handlePostUpdate = async () => {
    // Refresh posts after update
    try {
      const updatedPosts = await getAllPosts();
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Failed to refresh posts:", error);
    }
  };

  const handlePostDelete = (deletedPostId) => {
    // Remove deleted post from state
    setPosts(posts.filter(post => post._id !== deletedPostId));
  };

  const handleUserSelect = (user) => {
    console.log("Selected user:", user);
    // You can implement navigation to user profile here
  };

  const loadingView = () => <HomeSkeleton />;

  const noPostsView = () => {
    return (
      <div className="flex gap-2 min-h-screen h-full">
        <div className="w-1/4 p-10 hidden lg:block">
          <h1 className="text-2xl font-semibold mb-4">Messages</h1>
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
          <h1 className="text-2xl font-semibold mb-4">Find Users</h1>
          <UserSearch onUserSelect={handleUserSelect} />
        </div>
      </div>
    );
  };

  const successView = () => {
    return (
      <div className="flex gap-2 min-h-screen h-full">
        <div className="w-1/4 p-10 hidden lg:block">
          <h1 className="text-2xl font-semibold mb-4">Messages</h1>
        </div>
        <Separator className="hidden lg:block" orientation="vertical" />
        <div className="p-5 lg:p-10 space-y-8 lg:w-2/4">
          <h1 className="text-2xl lg:text-4xl font-semibold">Posts</h1>
          <ul className="flex flex-col flex-wrap gap-10">
            {posts.map((eachEle) => (
              <EachPost 
                key={eachEle._id} 
                details={eachEle} 
                onPostUpdate={handlePostUpdate}
                onPostDelete={handlePostDelete}
              />
            ))}
          </ul>
        </div>
        <Separator className="hidden lg:block" orientation="vertical" />
        <div className="w-1/4 p-10 hidden lg:block">
          <h1 className="text-2xl font-semibold mb-4">Find Users</h1>
          <UserSearch onUserSelect={handleUserSelect} />
        </div>
      </div>
    );
  };

  if (loading) {
    return loadingView();
  } else {
    if (posts && posts.length === 0) {
      return noPostsView();
    } else {
      return successView();
    }
  }
};

export default HomePage;
