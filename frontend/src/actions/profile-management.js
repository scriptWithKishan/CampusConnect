import Cookies from "js-cookie";

const jwtToken = Cookies.get("jwt_token");

export const updateProfile = async (formData) => {
  try {
    const response = await fetch("http://localhost:4000/user/profile", {
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
    console.error("Update profile failed:", err);
    throw err;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const response = await fetch(`http://localhost:4000/user/profile/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    const data = await response.json();
    return data.data;
  } catch (err) {
    console.error("Get user profile failed:", err);
    throw err;
  }
};

export const searchUsers = async (query) => {
  try {
    const response = await fetch(`http://localhost:4000/user/search?query=${encodeURIComponent(query)}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    const data = await response.json();
    return data.data;
  } catch (err) {
    console.error("Search users failed:", err);
    throw err;
  }
};

export const getAllUsers = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(`http://localhost:4000/user/all?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    const data = await response.json();
    return data.data;
  } catch (err) {
    console.error("Get all users failed:", err);
    throw err;
  }
};
