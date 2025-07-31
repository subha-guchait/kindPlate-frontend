import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import useSignup from "../../hooks/useSignup";

const Signup = () => {
  const [isAccepted, setIsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isOrg, setIsOrg] = useState(false);

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    userType: "individual",
    password: "",
    isAccepted: false,
  });

  const { loading, signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(input);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="flex flex-col items-center justify-center w-96 p-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Signup
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mt-2">
            <input
              id="firstName"
              type="text"
              placeholder="Enter First Name"
              className="w-full input input-bordered h-10"
              value={input.firstName}
              onChange={(e) =>
                setInput({ ...input, firstName: e.target.value })
              }
              required
            />
          </div>
          <div className="mt-2">
            <input
              id="lastName"
              type="text"
              placeholder="Enter Last Name"
              className="w-full input input-bordered h-10"
              value={input.lastName}
              onChange={(e) => setInput({ ...input, lastName: e.target.value })}
              required
            />
          </div>

          <div className="mt-2">
            <input
              id="email"
              type="email"
              placeholder="Enter Email"
              className="w-full input input-bordered h-10"
              value={input.email}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
              required
            />
          </div>

          <div className="mt-2">
            <input
              id="phone"
              type="tel"
              placeholder="Enter Mobile No"
              className="w-full input input-bordered h-10"
              value={input.phone}
              onChange={(e) => setInput({ ...input, phone: e.target.value })}
              required
            />
          </div>

          <div className="mt-2">
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
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Toggle for organization registration */}
          <div className="mt-3 flex items-center gap-2">
            <input
              type="checkbox"
              className="checkbox"
              checked={isOrg}
              onChange={(e) => {
                const checked = e.target.checked;
                setIsOrg(checked);
                setInput({
                  ...input,
                  userType: checked ? "" : "individual",
                });
              }}
            />
            <span>Are you registering as an organization?</span>
          </div>

          {/* Conditional userType dropdown */}
          {isOrg && (
            <div className="mt-2">
              <select
                id="userType"
                className="w-full input input-bordered h-10 cursor-auto"
                value={input.userType}
                onChange={(e) =>
                  setInput({ ...input, userType: e.target.value })
                }
                required
              >
                <option value="">Select organization type</option>
                <option value="ngo">NGO</option>
                <option value="oldage">Old Age Home</option>
                <option value="orphanage">Orphanage</option>
                <option value="shelter">Shelter</option>
              </select>
            </div>
          )}

          <Link
            to="/login"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block pl-1"
          >
            Already have an account?
          </Link>

          <div className="m-2">
            <input
              type="checkbox"
              className="toggle"
              checked={isAccepted}
              onChange={(e) => {
                setIsAccepted(e.target.checked);
                setInput({ ...input, isAccepted: e.target.checked });
              }}
            />
            <span className="p-2">
              I accept{" "}
              <a
                className="text-sm hover:underline hover:text-blue-600"
                href="#"
              >
                T&C
              </a>
            </span>
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
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
