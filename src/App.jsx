import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import UserPostsPage from "./pages/userPages/UserPosts";
import Profile from "./pages/profile/Profile";
import { useAuthContext } from "./context/AuthContext";
import NetworkNotifier from "./components/NetworkNotifier";

const App = () => {
  const { authUser, loading } = useAuthContext();
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-dots loading-xl text-primary"></span>
      </div>
    );
  }
  return (
    <div data-theme="corporate">
      <NetworkNotifier />
      <Navbar />
      <div>
        <Toaster />
      </div>
      <div className="p-4">
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="/my-posts"
            element={authUser ? <UserPostsPage /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="/profile"
            element={authUser ? <Profile /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="/login"
            element={
              authUser ? (
                authUser.role === "admin" ? (
                  <Navigate to="/admin/" />
                ) : (
                  <Navigate to="/" />
                )
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" /> : <Signup />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
