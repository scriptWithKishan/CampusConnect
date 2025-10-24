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

export const getUserName = async (user) => {
  try {
    const jwtToken = Cookies.get("jwt_token");

    const response = await fetch(`${apiURL}/user/${user}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    const data = await response.json();

    return data.data;
  } catch (err) {
    console.log(err);
  }
};

export const getFollowDetails = async () => {
  try {
    const jwtToken = Cookies.get("jwt_token")
    const response = await fetch(`${apiURL}/user/follow-details`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })

    const data = await response.json()

    return data.data
  } catch (err) {
    console.log(err)
  }
}

export const getSearchedUsers = async (query) => {
  try {
    const jwtToken = Cookies.get("jwt_token")

    const response = await fetch(`${apiURL}/user/search?search=${query}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })

    const data = await response.json()
    return data.data
  } catch (err) {
    console.log(err.message)
  }
}