import Cookies from "js-cookie";

const jwtToken = Cookies.get("jwt_token");

export const addComment = async (postId, text) => {
  try {
    const response = await fetch(`http://localhost:4000/post/comment/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    console.error("Add comment failed:", err);
    throw err;
  }
};

export const getComments = async (postId) => {
  try {
    const response = await fetch(`http://localhost:4000/post/comments/${postId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    const data = await response.json();
    return data.data;
  } catch (err) {
    console.error("Get comments failed:", err);
    throw err;
  }
};

export const deleteComment = async (postId, commentId) => {
  try {
    const response = await fetch(`http://localhost:4000/post/comment/${postId}/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    console.error("Delete comment failed:", err);
    throw err;
  }
};
