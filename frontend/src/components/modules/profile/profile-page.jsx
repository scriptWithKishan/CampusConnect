import { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Edit, MapPin, Calendar, Mail } from "lucide-react";
import { getUserProfile } from "@/actions/profile-management";
import { getUserPosts } from "@/actions/get-posts";
import UserContext from "@/context/user-context";
import EditProfileDialog from "../profile-management/edit-profile-dialog";
import { EachPost } from "../home/each-post";
import { toast } from "sonner";

const ProfilePage = ({ userId }) => {
  const { user: currentUser } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const isOwnProfile = !userId || userId === currentUser._id;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        let userData;
        if (isOwnProfile) {
          userData = currentUser;
        } else {
          userData = await getUserProfile(userId);
        }
        setUser(userData);

        // Fetch user posts
        const userPosts = isOwnProfile ? await getUserPosts() : [];
        setPosts(userPosts);
      } catch (error) {
        toast.error("Failed to load profile");
        console.error("Profile fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId, currentUser, isOwnProfile]);

  const handleProfileUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  const handlePostUpdate = async () => {
    try {
      const updatedPosts = await getUserPosts();
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Failed to refresh posts:", error);
    }
  };

  const handlePostDelete = (deletedPostId) => {
    setPosts(posts.filter(post => post._id !== deletedPostId));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">User not found</h2>
          <p className="text-muted-foreground">The profile you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Profile Header */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="h-24 w-24 md:h-32 md:w-32">
              <AvatarImage src={user.profilePic} />
              <AvatarFallback className="text-2xl">
                {user.username?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{user.username}</h1>
                  {user.bio && (
                    <p className="text-muted-foreground mt-2">{user.bio}</p>
                  )}
                </div>
                
                {isOwnProfile && (
                  <Button onClick={() => setShowEditDialog(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Joined {new Date(user.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Posts Section */}
      {isOwnProfile && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Posts</h2>
            <span className="text-sm text-muted-foreground">
              {posts.length} post{posts.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          {posts.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-medium">No posts yet</h3>
                  <p className="text-muted-foreground">
                    Start sharing your thoughts with the community!
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <EachPost
                  key={post._id}
                  details={post}
                  onPostUpdate={handlePostUpdate}
                  onPostDelete={handlePostDelete}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Edit Profile Dialog */}
      <EditProfileDialog
        user={user}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onProfileUpdate={handleProfileUpdate}
      />
    </div>
  );
};

export default ProfilePage;
