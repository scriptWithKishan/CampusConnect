export const register = async (credentials) => {
  try {
    const response = await fetch(`http://localhost:4000/auth/register`, {
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
