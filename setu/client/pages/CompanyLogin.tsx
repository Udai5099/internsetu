import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CompanyLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Prototype authentication logic
    if (isLogin) {
      console.log("Company Login Data:", data);
      alert("Company logged in successfully! Redirecting to company dashboard.");
      navigate("/company");
    } else {
      console.log("Company Registration Data:", data);
      alert("Company registered successfully! Please log in.");
      setIsLogin(true); // Redirect to login form after signup
    }
  };

  return (
    <div className="min-h-screen bg-gray-100/50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 sm:p-12 lg:p-16">
        <div className="flex flex-col items-center justify-center mb-6">
          <img src="/setulogodark.png" alt="Setu Logo" className="h-12 w-auto transform scale-[200%]" />
        </div>
        
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {isLogin ? "Company Login" : "Company Registration"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? "Sign in to your company account" : "Register your company with InternSetu"}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="company-email" className="sr-only">
              Company Email
            </label>
            <input
              id="company-email"
              name="companyEmail"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
              placeholder="Company Email"
            />
          </div>
          <div>
            <label htmlFor="company-password" className="sr-only">
              Password
            </label>
            <input
              id="company-password"
              name="password"
              type="password"
              autoComplete={isLogin ? "current-password" : "new-password"}
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
          
          <div className="flex items-center justify-between">
            {!isLogin && (
              <div className="text-sm">
                <Link to="#" onClick={() => setIsLogin(true)} className="font-medium text-primary hover:text-accent">
                  Already have an account?
                </Link>
              </div>
            )}
            {isLogin && (
              <div className="text-sm">
                <Link to="#" className="font-medium text-primary hover:text-accent">
                  Forgot password?
                </Link>
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/90 transition-colors"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
