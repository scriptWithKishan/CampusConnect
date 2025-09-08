import React from "react";
import { Navigate, Outlet } from "react-router";
import Cookies from "js-cookie";

const AuthLayout = () => {
  const token = Cookies.get("jwt_token");

  const authView = () => {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-5">
        <div className="h-screen w-full flex flex-col items-center py-20 gap-20 overflow-y-auto lg:col-span-3 bg-[#F4F4F0]">
          <h1 className="text-2xl lg:text-4xl font-semibold text-center">
            Welcome to Campus Connect.
          </h1>
          <Outlet />
        </div>
        <div
          className="h-screen lg:col-span-2 w-full hidden lg:block"
          style={{
            backgroundImage: "url('/auth-background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>
    );
  };

  if (token) {
    return <Navigate to="/" />;
  } else {
    return authView();
  }
};

export default AuthLayout;
