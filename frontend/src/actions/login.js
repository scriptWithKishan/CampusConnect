import Cookies from "js-cookie";

export const login = async (credentials) => {
  try {
    const response = await fetch(`http://localhost:4000/auth/login`, {
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
