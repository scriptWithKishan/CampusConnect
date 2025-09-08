import Cookies from "js-cookie";

export const getUserData = async () => {
  const jwtToken = Cookies.get("jwt_token");

  try {
    const response = await fetch(`http://localhost:4000/user/profile`, {
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

