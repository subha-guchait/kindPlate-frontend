import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import LogoutButton from "../logoutButton/LogoutButton";
import {
  House,
  SquarePen,
  User,
  Megaphone,
  HeartHandshake,
  Settings,
  Component,
  KeyRound,
  ShieldUser,
} from "lucide-react";
import { MdOutlineLeaderboard } from "react-icons/md";
import useProfile from "@/hooks/useProfile";
import { motion } from "framer-motion";
import { useHelpDrawerStore } from "@/stores/helpDrawerStore";

const Navbar = () => {
  const { authUser } = useAuthContext();
  const { user, loading } = useProfile();
  const { openDrawer } = useHelpDrawerStore();

  return (
    <div className="navbar bg-base-100 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold text-primary">
          <img
            src="/logo.png"
            alt="Kind Plate logo"
            className="inline-block w-8 h-8 mr-2"
          />
          Kind Plate
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-1">
          {authUser && (
            <>
              <motion.li
                className="tooltip tooltip-bottom"
                data-tip="Home"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link to="/">
                  <House className="w-6 h-6 object-contain" />
                </Link>
              </motion.li>

              <motion.li
                className="tooltip tooltip-bottom"
                data-tip="Leaderboard"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link to="/leaderboard">
                  <MdOutlineLeaderboard className="w-6 h-6 object-contain" />
                </Link>
              </motion.li>

              <motion.li
                className="tooltip tooltip-bottom"
                data-tip="My posts"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link to="/posts">
                  <Component className="w-6 h-6 object-contain" />
                </Link>
              </motion.li>
              <li className="dropdown dropdown-end">
                <label tabIndex={0} className="cursor-pointer">
                  {user?.imgUrl ? (
                    <img
                      src={user.imgUrl}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full object-cover border border-gray-300"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                      {user?.firstName?.[0] ?? "U"}
                    </div>
                  )}
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  {/* User Header */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-2 pb-3 border-b border-gray-200"
                  >
                    <motion.p
                      className="font-bold text-lg text-gray-800"
                      whileHover={{ scale: 1.05 }}
                    >
                      {user?.firstName + " " + user?.lastName || "Guest User"}
                    </motion.p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </motion.div>

                  {/* Points Card */}
                  <motion.li whileHover={{ scale: 1.05 }}>
                    <Link
                      to="/point-history"
                      className="flex items-center justify-between gap-2 p-3 rounded-xl bg-gradient-to-r from-yellow-100 to-yellow-200 hover:from-yellow-200 hover:to-yellow-300 shadow-sm"
                    >
                      <div className="flex items-center gap-2">
                        <motion.span
                          className="text-2xl"
                          animate={{ rotate: [0, 15, -15, 0] }}
                          transition={{
                            repeat: Infinity,
                            duration: 2,
                            ease: "easeInOut",
                          }}
                        >
                          🪙
                        </motion.span>
                        <span className="font-semibold">My Points</span>
                      </div>
                      <span className="text-lg font-bold text-yellow-800">
                        {user?.points ?? 0}
                      </span>
                    </Link>
                  </motion.li>

                  {/* Menu Links with hover animations */}
                  {(authUser.role === "admin" ||
                    authUser.role === "superAdmin") && (
                    <motion.li whileHover={{ x: 4 }}>
                      <Link to="/admin" className="flex items-center gap-2">
                        <ShieldUser className="w-5 h-5" />
                        <span>Admin</span>
                      </Link>
                    </motion.li>
                  )}

                  <motion.li whileHover={{ x: 4 }}>
                    <Link to="/profile" className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      <span>View Profile</span>
                    </Link>
                  </motion.li>

                  <motion.li whileHover={{ x: 4 }}>
                    <Link
                      to="/edit-profile"
                      className="flex items-center gap-2"
                    >
                      <SquarePen className="w-5 h-5" />
                      <span>Edit Profile</span>
                    </Link>
                  </motion.li>
                  <motion.li whileHover={{ x: 4 }}>
                    <Link
                      to="/change-password"
                      className="flex items-center gap-2"
                    >
                      <KeyRound className="w-5 h-5" />
                      <span>Change Password</span>
                    </Link>
                  </motion.li>

                  <motion.li whileHover={{ x: 4 }}>
                    <Link to="/ads" className="flex items-center gap-2">
                      <Megaphone className="w-5 h-5" />
                      <span>Ads</span>
                    </Link>
                  </motion.li>

                  <motion.li whileHover={{ rotate: 10, scale: 1.1 }}>
                    <Link to="/settings" className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      <span>Settings</span>
                    </Link>
                  </motion.li>

                  <motion.li whileHover={{ scale: 1.1 }}>
                    <button
                      onClick={openDrawer}
                      className="flex items-center gap-2 w-full text-left px-2 py-2 cursor-pointer"
                    >
                      <HeartHandshake className="w-5 h-5" />
                      <span>Help</span>
                    </button>
                  </motion.li>

                  {/* Logout */}
                  <motion.li whileHover={{ scale: 1.1, rotate: -5 }}>
                    <LogoutButton />
                  </motion.li>
                </ul>
              </li>
            </>
          )}
          {!authUser && (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
