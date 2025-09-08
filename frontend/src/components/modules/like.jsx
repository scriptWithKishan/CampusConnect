import { useContext, useEffect, useState } from "react";

import { getPostData } from "@/actions/get-posts";
import UserContext from "@/context/user-context";
import { toggleLike } from "@/actions/toggle-like";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export const Like = ({ postId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const { user } = useContext(UserContext);

  const onClick = async () => {
    await toggleLike(postId);
    await fetchLikeData();
  };

  const fetchLikeData = async () => {
    const data = await getPostData(postId);

    if (data.likes.includes(user._id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  };

  useEffect(() => {
    fetchLikeData();
  }, []);

  return (
    <Button onClick={onClick} size="icon" variant={"elevated"}>
      <Heart
        className={
          isLiked
            ? "fill-cyan-400 text-cyan-400"
            : "fill-transparent text-black"
        }
      />
    </Button>
  );
};
