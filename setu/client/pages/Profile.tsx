import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit } from "lucide-react";

export default function StudentProfile() {
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // ✅ Helper function to read cookies
  const getCookie = (name: string) => {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(cname) === 0) {
        return c.substring(cname.length, c.length);
      }
    }
    return "";
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = getCookie("user_id"); 
        if (!userId) {
          console.error("No user_id cookie found");
          setLoading(false);
          return;
        }

        const res = await fetch(`http://localhost:5000/api/profile/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch profile");

        const profile = await res.json();
        console.log("Fetched profile:", profile);

        setProfileData({
          name: profile.fullName,
          age: profile.age,
          gender: profile.gender,
          skills: profile.skills?.join(", ") || "",
          bio: profile.bio || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEdit = () => {
    navigate("/profile-form"); 
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading profile...
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-red-500">
        Profile not found. Please create your profile.
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          <button
            onClick={handleEdit}
            className="btn bg-primary text-white hover:bg-primary/90 flex items-center gap-2"
          >
            <Edit size={16} /> Edit Profile
          </button>
        </div>

        <div className="mt-8 space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p>
                <strong>Name:</strong> {profileData.name}
              </p>
              <p>
                <strong>Age:</strong> {profileData.age}
              </p>
              <p>
                <strong>Gender:</strong> {profileData.gender}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Skills & Interests</h2>
            <p className="mt-2">{profileData.skills}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Bio</h2>
            <p className="mt-2">{profileData.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
