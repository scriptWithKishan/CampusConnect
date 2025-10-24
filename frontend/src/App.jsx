import { Routes, Route } from "react-router";

import AppLayout from "@/components/modules/layout/app-layout";
import HomePage from "@/components/modules/home/home-page";
import ProfilePage from "@/components/modules/Profile/profile-page";
import SettingsPage from "@/components/modules/Settings/settings-page";
import ProtectedLayout from "./components/modules/layout/protected-layout";
import AuthLayout from "./components/modules/layout/auth-layout";
import SigninPage from "./components/modules/auth/signin-page";
import SignupPage from "./components/modules/auth/signup-page";
import ExplorePage from "@/components/modules/Explore/explore-page";

const App = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route element={<ProtectedLayout />}>
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/sign-in" element={<SigninPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
      </Route>
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

export default App;
