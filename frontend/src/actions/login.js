import Cookies from "js-cookie";

const apiURL = import.meta.env.VITE_API_URL;

export const login = async (credentials) => {
  try {
    const response = await fetch(`${apiURL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    Cookies.set("jwt_token", data.token, { expires: 7 });

    return data;
  } catch (err) {
    console.error("Login failed:", err);
    throw err;
  }
};
