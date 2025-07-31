import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { loading, login } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(input);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="flex flex-col items-center justify-center w-96 p-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="label p-2">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter Email"
              className="w-full input input-bordered h-10"
              value={input.email}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="password" className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="w-full input input-bordered h-10 pr-10"
                value={input.password}
                onChange={(e) =>
                  setInput({ ...input, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex flex-col mt-2 space-y-1 text-sm">
            <Link
              to="/forgot-password"
              className="hover:underline hover:text-blue-600 text-gray-600  "
            >
              Forgot Password?
            </Link>
            <Link
              to="/signup"
              className="hover:underline hover:text-blue-600 text-gray-600"
            >
              Don't have an account?
            </Link>
          </div>

          <div>
            <button
              type="submit"
              className="btn btn-primary w-full mt-4"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Log In"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
