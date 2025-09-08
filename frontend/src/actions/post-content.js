import Cookies from "js-cookie";

export const postContent = async (formData) => {
  try {
    const jwtToken = Cookies.get("jwt_token");

    const response = await fetch("http://localhost:4000/post", {
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
