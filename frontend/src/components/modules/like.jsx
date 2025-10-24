import { useContext, useEffect, useState } from "react";

import { getPostData } from "@/actions/get-posts";
import UserContext from "@/context/user-context";
import { toggleLike } from "@/actions/toggle-like";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export const Like = ({ postId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0)
  const { user } = useContext(UserContext);

  const onClick = async () => {
    await toggleLike(postId);
    await fetchLikeData();
  };

  const fetchLikeData = async () => {
    const data = await getPostData(postId);

    setLikeCount(data.likes.length)

    if (data.likes.includes(user._id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchLikeData();
    }
  }, []);

  return (
    <div className="flex items-center gap-x-2">
      <Button onClick={onClick} disabled={!user} size="icon" variant={"elevated"} className="bg-transparent">
        <Heart
          className={
            isLiked
            ? "fill-cyan-400 text-cyan-400"
            : "fill-transparent text-black"
          }
          />
      </Button>
      <p className="text-xs text-gray-500" >{likeCount}</p>
    </div>
  );
};
