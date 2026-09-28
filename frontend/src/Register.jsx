
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "./api/authApi";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const data = await registerUser(formData);

      setMessage(data.message);

      setFormData({
        name: "",
        email: "",
        password: ""
      });

      navigate("/login");

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">

          <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
            J
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mt-5">
            Create Your Account
          </h1>

          <p className="text-gray-500 mt-2">
            Join Job Portal and start exploring opportunities
          </p>

        </div>

        {/* Register Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">

          <form onSubmit={handleSubmit}>

            {/* Full Name */}
            <div className="mb-5">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />

            </div>

            {/* Email */}
            <div className="mb-5">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />

            </div>

            {/* Password */}
            <div className="mb-6">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />

            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition shadow-sm"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

          {/* Message */}
          {message && (
            <div className="mt-5 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg text-sm text-center">
              {message}
            </div>
          )}

          {/* Login */}
          <div className="border-t border-gray-100 mt-6 pt-6 text-center">

            <p className="text-gray-500 text-sm">
              Already have an account?
            </p>

            <Link
              to="/login"
              className="inline-block mt-2 text-blue-600 hover:text-blue-700 font-semibold text-sm"
            >
              Login to your account
            </Link>

          </div>

        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Find opportunities. Build your career.
        </p>

      </div>

    </div>
  );
}

export default Register;

