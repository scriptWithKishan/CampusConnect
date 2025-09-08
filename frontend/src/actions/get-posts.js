import Cookies from "js-cookie";

const jwtToken = Cookies.get("jwt_token");

export const getAllPosts = async () => {
  try {
    const response = await fetch("http://localhost:4000/post", {
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
    const response = await fetch(`http://localhost:4000/post/user`, {
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
    const response = await fetch(`http://localhost:4000/post/${postId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    const data = await response.json();
    const post = data.data;

    return post;
  } catch (err) {
    console.log(err);
  }
};
