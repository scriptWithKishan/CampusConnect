import { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import Cookies from "js-cookie";

import UserContext from "@/context/user-context";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

export const NavbarSidebar = ({ open, onOpenChange, items }) => {
  const navigate = useNavigate();
  const { removeUser } = useContext(UserContext);

  const token = Cookies.get("jwt_token");

  const logout = () => {
    Cookies.remove("jwt_token");
    removeUser();
    navigate("/sign-in");
    window.location.reload();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 transition-none">
        <SheetHeader className="border-b p-4">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {items.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              asChild
              size="lg"
              className="w-full rounded-none p-4 hover:bg-black hover:text-white flex justify-start text-base font-medium"
            >
              <NavLink
                onClick={() => onOpenChange(false)}
                key={item.path}
                to={item.path}
              >
                {item.name}
              </NavLink>
            </Button>
          ))}
          <div className="border-t">
            {token ? (
              <Button
                variant="ghost"
                size="lg"
                onClick={logout}
                className="w-full rounded-none p-4 hover:bg-black hover:text-white flex justify-start text-base font-medium"
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  asChild
                  size="lg"
                  className="w-full rounded-none p-4 hover:bg-black hover:text-white flex justify-start text-base font-medium"
                >
                  <NavLink
                    onClick={() => onOpenChange(false)}
                    to="/sign-in"
                    className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
                  >
                    Sign in
                  </NavLink>
                </Button>
                <Button
                  variant="ghost"
                  asChild
                  size="lg"
                  className="w-full rounded-none p-4 hover:bg-black hover:text-white flex justify-start text-base font-medium"
                >
                  <NavLink
                    onClick={() => onOpenChange(false)}
                    to="/sign-up"
                    className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
                  >
                    Start Posting
                  </NavLink>
                </Button>
              </>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
