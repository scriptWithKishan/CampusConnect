import Cookies from "js-cookie";

const jwtToken = Cookies.get("jwt_token");

export const deletePost = async (postId) => {
  try {
    const response = await fetch(`http://localhost:4000/post/${postId}`, {
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
    console.error("Delete post failed:", err);
    throw err;
  }
};

export const updatePost = async (postId, formData) => {
  try {
    const response = await fetch(`http://localhost:4000/post/${postId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    console.error("Update post failed:", err);
    throw err;
  }
};
