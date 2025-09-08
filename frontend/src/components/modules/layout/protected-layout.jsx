import Cookies from "js-cookie";
import { Outlet } from "react-router";
import { useNavigate } from "react-router";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const ProtectedLayout = () => {
  const navigate = useNavigate();

  const token = Cookies.get("jwt_token");

  if (token) {
    return <Outlet />;
  } else {
    return (
      <div>
        <Outlet />
        <AlertDialog defaultOpen={true}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                You should login to access this content
              </AlertDialogTitle>
              <AlertDialogDescription>
                Login or Sign up to access all features of Campus Connect which
                includes posting, connecting with your friends and more. You can
                always explore the content without logging in.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button onClick={() => navigate("/sign-in")} variant="elevated">
                Login
              </Button>
              <Button onClick={() => navigate("/sign-up")} variant="elevated">
                Signup
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }
};

export default ProtectedLayout;
