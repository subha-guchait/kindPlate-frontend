import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import LogoutButton from "../logoutButton/LogoutButton";
import { House, UserRoundPen } from "lucide-react";
import allPostsIcon from "../../assets/allPostIcon.png";

const Navbar = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold text-primary">
          Feed Forward
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
              <li>
                <Link to="/">
                  <div className="tooltip tooltip-bottom" data-tip="Home">
                    <House />
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/profile">
                  <div className="tooltip tooltip-bottom" data-tip="Profile">
                    <UserRoundPen className="w-6 h-6 object-contain" />
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/my-posts">
                  <div className="tooltip tooltip-bottom" data-tip="My posts">
                    <img
                      src={allPostsIcon}
                      alt="posts"
                      className="w-6 h-6 object-contain"
                    />
                  </div>
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
            <li>
              <div className="tooltip tooltip-bottom" data-tip="Logout">
                <LogoutButton />
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
