const apiURL = import.meta.env.VITE_API_URL;

export const register = async (credentials) => {
  try {
    const response = await fetch(`${apiURL}/auth/register`, {
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

    return data;
  } catch (err) {
    console.error("Login failed:", err);
    throw err;
  }
};
