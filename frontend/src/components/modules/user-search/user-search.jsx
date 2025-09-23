import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Users } from "lucide-react";
import { searchUsers, getAllUsers } from "@/actions/profile-management";
import { toast } from "sonner";

const UserSearch = ({ onUserSelect }) => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // Load initial users when component mounts
    loadInitialUsers();
  }, []);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (query.trim()) {
        handleSearch();
      } else {
        loadInitialUsers();
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [query]);

  const loadInitialUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers(1, 10);
      setUsers(data);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const data = await searchUsers(query);
      setUsers(data);
      setShowResults(true);
    } catch (error) {
      toast.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = (user) => {
    if (onUserSelect) {
      onUserSelect(user);
    }
    setQuery("");
    setShowResults(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowResults(true)}
          className="pl-10"
        />
      </div>

      {showResults && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-80 overflow-y-auto">
          <CardContent className="p-2">
            {loading ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              </div>
            ) : users.length === 0 ? (
              <div className="flex items-center justify-center py-4 text-muted-foreground">
                <Users className="h-4 w-4 mr-2" />
                {query ? "No users found" : "No users available"}
              </div>
            ) : (
              <div className="space-y-1">
                {users.map((user) => (
                  <div
                    key={user._id}
                    onClick={() => handleUserClick(user)}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.profilePic} />
                      <AvatarFallback>
                        {user.username?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {user.username}
                      </p>
                      {user.bio && (
                        <p className="text-xs text-muted-foreground truncate">
                          {user.bio}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Overlay to close search results */}
      {showResults && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowResults(false)}
        />
      )}
    </div>
  );
};

export default UserSearch;
