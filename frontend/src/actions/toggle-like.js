import Cookies from "js-cookie";

const jwtToken = Cookies.get("jwt_token");

export const toggleLike = async (postId) => {
  try {
    await fetch(`http://localhost:4000/post/like/${postId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
