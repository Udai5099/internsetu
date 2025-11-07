import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    skills: "",
    interests: "",
    goalCompanies: "",
    bio: "",
    resume: null as File | null,
  });

  const navigate = useNavigate();

  // Cookie helpers
  const setCookie = (name: string, value: string, days: number) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
  };

  const getCookie = (name: string) => {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(cname) === 0) {
        return c.substring(cname.length, c.length);
      }
    }
    return "";
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, resume: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) data.append(key, value as any);
      });

      // ✅ Get token from cookie
      const token = getCookie("auth_token");

      // Call backend API
      const res = await fetch("http://localhost:5000/api/profile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ token now works
        },
        body: data,
      });

      if (!res.ok) throw new Error("Failed to save profile");

      // Update cookie for Header
      setCookie("user_name", formData.name, 7);
      setCookie("new_user", "false", 7);

      alert("Profile saved successfully!");
      navigate("/"); // Redirect to home/dashboard
      window.location.reload(); // Force Header to read updated cookie
    } catch (err) {
      console.error(err);
      alert("Failed to save profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100/50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-2xl p-8 sm:p-12 lg:p-16">
        <div className="flex justify-center mb-6">
          <img
            src="/setulogodark.png"
            alt="Setu Logo"
            className="h-12 w-auto transform scale-[200%]"
          />
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Create Your Profile
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please fill in your details to get started with InternSetu.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Name, Age, Gender */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700"
              >
                Age <span className="text-red-500">*</span>
              </label>
              <input
                id="age"
                name="age"
                type="number"
                required
                value={formData.age}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700"
              >
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                id="gender"
                name="gender"
                required
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Optional Fields */}
          <div>
            <label
              htmlFor="skills"
              className="block text-sm font-medium text-gray-700"
            >
              Skills
            </label>
            <input
              id="skills"
              name="skills"
              type="text"
              placeholder="e.g., React, Python, Data Analysis"
              value={formData.skills}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="interests"
              className="block text-sm font-medium text-gray-700"
            >
              Interests
            </label>
            <input
              id="interests"
              name="interests"
              type="text"
              placeholder="e.g., Web Development, Machine Learning"
              value={formData.interests}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="goalCompanies"
              className="block text-sm font-medium text-gray-700"
            >
              Goal Companies
            </label>
            <input
              id="goalCompanies"
              name="goalCompanies"
              type="text"
              placeholder="e.g., Google, TCS"
              value={formData.goalCompanies}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="resume"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Resume
            </label>
            <input
              id="resume"
              name="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/90 transition-colors"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
