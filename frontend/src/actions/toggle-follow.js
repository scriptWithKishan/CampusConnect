import Cookies from "js-cookie";

const apiURL = import.meta.env.VITE_API_URL;

export const toggleFollow = async (id) => {
  try {
    const jwtToken = Cookies.get("jwt_token");
    const response = await fetch(`${apiURL}/user/follow/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    const data = await response.json();

    return data.isFollowing;
  } catch (err) {
    console.log(err);
  }
};

