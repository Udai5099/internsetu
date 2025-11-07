import { Link } from "react-router-dom";
import { Briefcase, UserPlus } from "lucide-react";

export default function CompanyPortal() {
  return (
    <div className="min-h-screen bg-gray-100/50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-2xl p-8 sm:p-12 lg:p-16 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          Company Portal
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Find the best student talent for your organization.
        </p>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* New Company Box */}
          <div className="group rounded-xl border-2 border-dashed border-primary p-8 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
            <UserPlus size={48} className="mx-auto text-primary transition-colors duration-300 group-hover:text-accent" />
            <h2 className="mt-6 text-xl font-semibold text-gray-900">
              New Company?
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Register now to post internship roles and find talent.
            </p>
            <Link to="/company/register" className="mt-6 inline-block btn btn-accent w-fit transform transition-transform duration-300 group-hover:scale-105">
              Register Now
            </Link>
          </div>

          {/* Existing Company Box */}
          <div className="group rounded-xl border-2 border-dashed border-primary p-8 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
            <Briefcase size={48} className="mx-auto text-primary transition-colors duration-300 group-hover:text-accent" />
            <h2 className="mt-6 text-xl font-semibold text-gray-900">
              Already Registered?
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Log in to manage your postings and applicants.
            </p>
            <Link to="/company/login" className="mt-6 inline-block btn bg-accent text-white hover:bg-primary/90 w-fit transform transition-transform duration-300 group-hover:scale-105">
              Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
