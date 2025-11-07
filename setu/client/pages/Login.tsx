import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Helper function to set a cookie
const setCookie = (name: string, value: string, days: number) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  // ✅ Auto-login redirect (NEW)
  useEffect(() => {
    // Helper to read cookies
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
    };

    const token = getCookie("auth_token");
    const role = getCookie("user_role");

    // If user already logged in → auto-redirect
    if (token && role) {
      if (role === "student") {
        navigate("/student/profile", { replace: true });
      } else if (role === "company") {
        navigate("/company/dashboard", { replace: true });
      }
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const API_BASE_URL = "http://localhost:5000/api";
    const endpoint = isLogin
      ? `${API_BASE_URL}/auth/login`
      : `${API_BASE_URL}/auth/register`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        const { token, email, role, _id } = result;

        // Save cookies
        if (token) setCookie("auth_token", token, 7);
        if (_id) setCookie("user_id", _id, 7);
        if (email) setCookie("user_email", email, 7);
        if (role) setCookie("user_role", role, 7);

        alert(isLogin ? "Logged in successfully!" : "Signed up successfully!");

        // ✅ Navigation logic (fixed)
        if (!isLogin) {
          if (role === "student") navigate("/profile-form", { replace: true });
          else if (role === "company") navigate("/company/dashboard", { replace: true });
        } else {
          if (role === "student") navigate("/student/profile", { replace: true });
          else if (role === "company") navigate("/company/dashboard", { replace: true });
          else navigate("/", { replace: true });
        }
      } else {
        const error = await response.json();
        alert(error.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("API call failed:", error);
      alert(
        "Failed to connect to the server. Please ensure the backend is running."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100/50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-2xl overflow-hidden md:grid md:grid-cols-2">
        {/* Image Section */}
        <div
          className="hidden md:block bg-cover bg-center"
          style={{ backgroundImage: "url('/setulogodark.png')" }}
        ></div>

        {/* Form Section */}
        <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              {isLogin ? "Login to your account" : "Create a new account"}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Or{" "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="font-medium text-primary hover:text-accent transition-colors"
              >
                {isLogin
                  ? "create a new account"
                  : "login to an existing account"}
              </button>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isLogin ? "current-password" : "new-password"}
                required
                className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
                placeholder="Password"
              />
            </div>

            {/* Role Dropdown - only show on Signup */}
            {!isLogin && (
              <div>
                <select
                  name="role"
                  required
                  className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
                >
                  <option value="">Select Role</option>
                  <option value="student">Student</option>
                  <option value="company">Company</option>
                </select>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-accent border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              {isLogin && (
                <div className="text-sm">
                  <Link
                    to="#"
                    className="font-medium text-primary hover:text-accent"
                  >
                    Forgot your password?
                  </Link>
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/90"
              >
                {isLogin ? "Sign in" : "Sign up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
