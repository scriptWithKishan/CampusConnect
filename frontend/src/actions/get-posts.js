import Cookies from "js-cookie";

const apiURL = import.meta.env.VITE_API_URL;

export const getAllPosts = async () => {
  try {
    const jwtToken = Cookies.get("jwt_token");
    const response = await fetch(`${apiURL}/post`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    const data = await response.json();
    const posts = data.data;

    return posts;
  } catch (err) {
    console.error(err);
  }
};

export const getUserPosts = async () => {
  try {
    const jwtToken = Cookies.get("jwt_token");
    const response = await fetch(`${apiURL}/post/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    const data = await response.json();
    const posts = data.data;

    return posts;
  } catch (err) {}
};

export const getPostData = async (postId) => {
  try {
    const response = await fetch(`${apiURL}/post/${postId}`, {
      method: "GET",
    });

    const data = await response.json();
    const post = data.data;

    return post;
  } catch (err) {
    console.log(err);
  }
};
