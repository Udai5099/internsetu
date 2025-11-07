import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, FileText, Settings, User as UserIcon } from "lucide-react";

export default function StudentDashboard() {
  const [userName, setUserName] = useState("Student");

  // Helper function to get a cookie
  const getCookie = (name) => {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(cname) === 0) {
        return c.substring(cname.length, c.length);
      }
    }
    return "";
  };

  useEffect(() => {
    const name = getCookie("user_name");
    if (name) {
      setUserName(name);
    }
  }, []);

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {userName}!
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Here's a quick overview of your progress and tools.
        </p>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/student/profile" className="flex flex-col items-center p-6 bg-gray-50 rounded-xl shadow-sm hover:bg-gray-100 transition-colors">
            <UserIcon size={48} className="text-primary" />
            <h2 className="mt-4 text-xl font-semibold">Profile</h2>
            <p className="text-sm text-gray-500 text-center">Manage your personal information and resume.</p>
          </Link>
          <Link to="/internships/available" className="flex flex-col items-center p-6 bg-gray-50 rounded-xl shadow-sm hover:bg-gray-100 transition-colors">
            <Briefcase size={48} className="text-accent" />
            <h2 className="mt-4 text-xl font-semibold">Internships</h2>
            <p className="text-sm text-gray-500 text-center">Browse available opportunities and track applications.</p>
          </Link>
          <Link to="/student/documents" className="flex flex-col items-center p-6 bg-gray-50 rounded-xl shadow-sm hover:bg-gray-100 transition-colors">
            <FileText size={48} className="text-primary" />
            <h2 className="mt-4 text-xl font-semibold">Documents</h2>
            <p className="text-sm text-gray-500 text-center">View and upload your documents and certificates.</p>
          </Link>
          <Link to="/student/settings" className="flex flex-col items-center p-6 bg-gray-50 rounded-xl shadow-sm hover:bg-gray-100 transition-colors">
            <Settings size={48} className="text-accent" />
            <h2 className="mt-4 text-xl font-semibold">Settings</h2>
            <p className="text-sm text-gray-500 text-center">Update your account settings and preferences.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
