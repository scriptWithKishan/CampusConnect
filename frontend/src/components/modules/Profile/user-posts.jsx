import { useEffect, useState } from "react";

import { getUserPosts } from "@/actions/get-posts";

import { EachPost } from "../home/each-post";
import { ProfilePostSkeleton } from "../Skeletons/profile-post-skeleton";
import { ImageOff } from "lucide-react";

export const UserPosts = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getUserPosts();
      setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const loadingView = () => <ProfilePostSkeleton />;

  const noPostView = () => (
    <div className="p-5 lg:p-10 space-y-10 w-full">
      <h1 className="text-2xl lg:text-4xl font-semibold">Posts</h1>
      <div className="flex flex-col text-center">
        <ImageOff className="self-center size-70 lg:size-100" />
        <h1 className="text-2xl lg:text-4xl font-semibold">No Posts yet.</h1>
        <p className="text-sm lg:text-base">
          There are no posts yet. Try to post image or text post to view it
          here.
        </p>
      </div>
    </div>
  );

  const successView = () => (
    <div className="p-5 lg:p-10 space-y-8 w-full">
      <h1 className="text-2xl lg:text-4xl font-semibold">Posts</h1>
      <ul className="flex flex-col flex-wrap gap-10 ">
        {posts.map((eachEle) => (
          <EachPost key={eachEle._id} details={eachEle} />
        ))}
      </ul>
    </div>
  );

  if (loading) {
    return loadingView();
  } else {
    if (posts.length === 0) {
      return noPostView();
    } else {
      return successView();
    }
  }
};
