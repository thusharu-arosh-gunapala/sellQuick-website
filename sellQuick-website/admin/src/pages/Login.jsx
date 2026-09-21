import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import authService from "../services/authService";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await authService.login(formData);
      // Data contains token and user info, authService handles localStorage
      localStorage.setItem("adminToken", data.token); // To keep existing ProtectedRoute working
      navigate("/admin");
    } catch (err) {
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : "An error occurred during login."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md">

        <div className="bg-white rounded-3xl shadow-xl p-8">

          {/* Logo */}
          <div className="text-center mb-8">

            <h1 className="text-4xl font-bold text-blue-600">SellQuick</h1>

            <p className="text-slate-500 mt-2">Admin Dashboard Login</p>
            {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block mb-2 font-medium">Email Address</label>

              <div className="flex items-center border rounded-xl px-4">
                <FaEnvelope className="text-slate-400" />

                <input
                  type="email"
                  name="email"
                  placeholder="admin@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 outline-none"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 font-medium">Password</label>

              <div className="flex items-center border rounded-xl px-4">
                <FaLock className="text-slate-400" />

                <input
                  type="password"
                  name="password"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-4 outline-none"
                  required
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">

              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" /> Remember Me
              </label>

              <Link to="/forgot-password" className="text-blue-600 text-sm">
                Forgot Password?
              </Link>

            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-4 rounded-xl font-semibold transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          {/* Footer */}
          <div className="text-center mt-6 text-sm text-slate-500">© 2026 SellQuick Admin</div>

        </div>

      </div>
    </div>
  );
};

export default Login;
