import Cookies from "js-cookie";

const apiURL = import.meta.env.VITE_API_URL;

export const postContent = async (formData) => {
  try {
    const jwtToken = Cookies.get("jwt_token");

    const response = await fetch(`${apiURL}/post`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: formData,
    });

    const result = await response.json();
    return result;
  } catch (err) {
    throw err;
  }
};

export const postComment = async (formData, postId) => {
  try {
    const jwtToken = Cookies.get("jwt_token");

    const response = await fetch(`${apiURL}/post/comment/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
