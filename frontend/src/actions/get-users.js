import Cookies from "js-cookie";

const apiURL = import.meta.env.VITE_API_URL;

export const getUserData = async () => {
  try {
    const jwtToken = Cookies.get("jwt_token");
    const response = await fetch(`${apiURL}/user/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    const user = data.data;

    return user;
  } catch (err) {
    console.error("Error fetching user data:", err);
    throw err;
  }
};
