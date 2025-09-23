import Cookies from "js-cookie";

const apiURL = import.meta.env.VITE_API_URL;

export const toggleLike = async (postId) => {
  try {
    const jwtToken = Cookies.get("jwt_token");
    await fetch(`${apiURL}/post/like/${postId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

