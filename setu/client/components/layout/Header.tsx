import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, User as UserIcon, Briefcase, Info, HelpCircle } from "lucide-react";

// Helper function to get a cookie
const getCookie = (name) => {
  const cname = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(cname) === 0) return c.substring(cname.length);
  }
  return "";
};

export default function Header() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userName = getCookie("user_name");
    if (userName) setUser(userName);
  }, []);

  const handleLogout = () => {
    // Delete cookies
    document.cookie = "user_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "new_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser(null);
    navigate("/login");
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-50 shadow bg-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-3">
        {/* Left Logos */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src="/mca.png" alt="MCA Logo" className="h-10 w-auto" />
            <img
              src="/setulogodark.png"
              alt="Setu Logo"
              className="h-10 w-auto transform scale-[200%] ml-4 md:ml-8"
            />
          </Link>
        </div>

        {/* Right Buttons & Viksit Logo */}
        <div className="flex items-center gap-3 mt-3 md:mt-0">
          <div className="flex items-center gap-3">
            <Link to="/apply" className="btn btn-accent text-sm">Apply Now</Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <UserIcon size={18} className="text-gray-500" />
                  </div>
                  <span className="font-semibold text-sm hidden md:block">{user}</span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/student/dashboard"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <UserIcon size={16} /> Student
                    </Link>
                    <Link
                      to="/internships/available"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <Briefcase size={16} /> Internships
                    </Link>
                    <Link
                      to="/eligibility"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <Info size={16} /> Eligibility
                    </Link>
                    <Link
                      to="/student/support"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <HelpCircle size={16} /> Help
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-red-500 transition-colors"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="btn bg-primary text-white hover:bg-primary/90 text-sm"
              >
                Login
              </Link>
            )}
          </div>
          <img src="/viksit.png" alt="Viksit Bharat Logo" className="h-10 w-auto" />
        </div>
      </div>
    </header>
  );
}
