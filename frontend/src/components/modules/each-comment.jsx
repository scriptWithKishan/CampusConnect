import { useEffect, useState } from "react";

import { getUserName } from "@/actions/get-users";
import { LoaderIcon } from "lucide-react";

export const EachComment = ({ details }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDetails = async () => {
    const data = await getUserName(details.user);
    setUser(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center">
        <LoaderIcon className="animate-spin" />
      </div>
    );
  } else {
    return (
      <div className="space-y-1">
        <div className="w-full flex items-center gap-x-4">
          <img
            src={user.profilePic || "/profile-pic.jpg"}
            alt={user.username}
            className="rounded-full w-6 h-6"
          />
          <p className="text-base font-medium">{user.username}</p>
          <p className="text-xs">
            {new Date(details.date).toDateString()}{" "}
            {new Date(details.date).toLocaleTimeString()}
          </p>
        </div>
        <p className="px-2">{details.text}</p>
        <hr />
      </div>
    );
  }
};
