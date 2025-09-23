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
