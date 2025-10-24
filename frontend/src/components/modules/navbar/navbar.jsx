import React, { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import Cookies from "js-cookie";

import { cn } from "@/lib/utils";
import UserContext from "@/context/user-context";

import { Button } from "@/components/ui/button";
import { NavbarSidebar } from "./navbar-sidebar";
import { Menu } from "lucide-react";

const NavbarItem = ({ children, path, isActive }) => {
  return (
    <Button
      asChild
      variant="nav"
      className={cn(
        "bg-white text-black hover:bg-neutral-300 ",
        isActive && "bg-black text-white hover:bg-black hover:text-white"
      )}
    >
      <NavLink to={path}>{children}</NavLink>
    </Button>
  );
};

const navbarItems = [
  { name: "Home", path: "/" },
  { name: "Profile", path: "/profile" },
  { name: "Explore", path: "/explore" },
  { name: "Settings", path: "/settings" },
];

export const Navbar = () => {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { removeUser } = useContext(UserContext);

  const token = Cookies.get("jwt_token");

  const logout = () => {
    Cookies.remove("jwt_token");
    removeUser();
    navigate("/sign-in");
    window.location.reload();
  };

  return (
    <nav className="bg-white">
      <div className="h-[60px] lg:h-[80px] flex items-center justify-between border-b-2 border-black">
        <div className="ml-4 lg:pl-8">
          <NavLink to="/">
            <h1 className="text-xl lg:text-3xl font-semibold">CampusConnect</h1>
          </NavLink>
        </div>

        <NavbarSidebar
          open={isSidebarOpen}
          onOpenChange={setIsSidebarOpen}
          items={navbarItems}
        />

        <Button
          variant="ghost"
          className="lg:hidden mr-4"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu />
        </Button>

        <div className="hidden lg:flex items-center gap-4">
          {navbarItems.map((item) => (
            <NavbarItem
              key={item.path}
              path={item.path}
              isActive={pathname === item.path}
            >
              {item.name}
            </NavbarItem>
          ))}
        </div>

        {token ? (
          <div className="hidden lg:block h-full">
            <Button
              onClick={logout}
              className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black text-white hover:bg-cyan-400 hover:text-black transition-colors text-lg"
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className="hidden lg:flex h-full">
            <Button
              asChild
              variant="secondary"
              className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-white hover:bg-cyan-400 transition-colors text-lg"
            >
              <NavLink to="/sign-in">Login</NavLink>
            </Button>
            <Button
              asChild
              className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black text-white hover:bg-cyan-400 hover:text-black transition-colors text-lg"
            >
              <NavLink to="/sign-up">Start Posting</NavLink>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
