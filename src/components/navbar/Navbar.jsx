import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import LogoutButton from "../logoutButton/LogoutButton";
import { House, UserRoundPen } from "lucide-react";
import allPostsIcon from "../../assets/allPostIcon.png";
import logo from "../../../public/logo.png";

const Navbar = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold text-primary">
          <img
            src={logo}
            alt="Kind Plate logo"
            className="inline-block w-10 h-10 mr-2"
          />
          Kind Plate
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-1">
          {authUser?.role === "admin" && (
            <>
              <li>
                <Link to="/profile">
                  <div className="tooltip tooltip-bottom" data-tip="Profile">
                    <UserRoundPen className="w-6 h-6 object-contain" />
                  </div>
                </Link>
              </li>

              <li>
                <Link to="/">
                  <House />
                </Link>
              </li>
            </>
          )}

          {authUser && authUser.role === "user" && (
            <>
              <li className="tooltip tooltip-bottom" data-tip="Home">
                <Link to="/">
                  <House />
                </Link>
              </li>
              <li className="tooltip tooltip-bottom" data-tip="Profile">
                <Link to="/profile">
                  <UserRoundPen className="w-6 h-6 object-contain" />
                </Link>
              </li>
              <li className="tooltip tooltip-bottom" data-tip="My posts">
                <Link to="/my-posts">
                  <img
                    src={allPostsIcon}
                    alt="posts"
                    className="w-6 h-6 object-contain"
                  />
                </Link>
              </li>
            </>
          )}
          {!authUser ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          ) : (
            <li className="tooltip tooltip-bottom" data-tip="Logout">
              <LogoutButton />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
