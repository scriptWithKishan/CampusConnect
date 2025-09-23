import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Cookies from "js-cookie";

import UserContext from "@/context/user-context";
import { getUserData } from "@/actions/get-users";

import { Navbar } from "../navbar/navbar";

const AppLayout = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const jwtToken = Cookies.get("jwt_token");

  useEffect(() => {
    const fetchUser = async () => {
      if (jwtToken) {
        const data = await getUserData();
        setUser(data);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const removeUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loading, removeUser }}>
      <div className="bg-[#f5f5f5]">
        <Navbar />
        <Outlet />
      </div>
    </UserContext.Provider>
  );
};

export default AppLayout;
