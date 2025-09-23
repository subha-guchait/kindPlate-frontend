import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";
import NetworkNotifier from "./components/NetworkNotifier";
import FullScreenAd from "./components/FullScreenAd";

import Home from "./pages/home/Home";
import LeaderboardPage from "./pages/leaderboard/LeadboardPage";
import UserPostsPage from "./pages/userPages/UserPosts";
import OtherUserPostsPage from "./pages/userPages/OtherUserPosts";
import EditProfile from "./pages/profile/EditProfile";
import ViewProfile from "./pages/profile/ViewProfile";
import PointHistoryPage from "./pages/pointHistory/PoinHistory";
import OtherUserProfile from "./pages/profile/OtherUserProfile";
import ChangePasswordForm from "./pages/ChangePassword";
import NotFoundPage from "./pages/NotFoundPage";

import AdsLayout from "./pages/ads/AdsLayout";
import CreateAds from "./pages/ads/CreateAds";
import ManageAds from "./pages/ads/ManageAds";

import PaymentReceipt from "./pages/payment/PaymentReceipt";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageAdmins from "./pages/admin/ManageAdmin";
import UserManagementPage from "./pages/admin/UserManagementPage";
import AdsManagement from "./pages/admin/AdsManagement";

import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

import ProtectedRoute from "./routes/ProtectedRoute";
import { useAuthContext } from "./context/AuthContext";
import useFullScreenAd from "./hooks/useFullScreenAds";

const App = () => {
  const { authUser, loading } = useAuthContext();
  const { ad, visible, closeAd } = useFullScreenAd(authUser);

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
      <Toaster />
      <div className="p-4 pt-15">
        <Routes>
          {/* Public routes */}
          <Route
            path="/login"
            element={
              authUser ? (
                ["admin", "superAdmin"].includes(authUser.role) ? (
                  <Navigate to="/admin" />
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

          {/* User routes (all authenticated users) */}
          <Route
            path="/"
            element={
              <ProtectedRoute allowedRoles={["user", "admin", "superAdmin"]}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts"
            element={
              <ProtectedRoute allowedRoles={["user", "admin", "superAdmin"]}>
                <UserPostsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/:userId/posts"
            element={
              <ProtectedRoute allowedRoles={["user", "admin", "superAdmin"]}>
                <OtherUserPostsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={["user", "admin", "superAdmin"]}>
                <ViewProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/:userId"
            element={
              <ProtectedRoute allowedRoles={["user", "admin", "superAdmin"]}>
                <OtherUserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <ProtectedRoute allowedRoles={["user", "admin", "superAdmin"]}>
                <EditProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute allowedRoles={["user", "admin", "superAdmin"]}>
                <LeaderboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/point-history"
            element={
              <ProtectedRoute allowedRoles={["user", "admin", "superAdmin"]}>
                <PointHistoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/change-password"
            element={
              <ProtectedRoute allowedRoles={["user", "admin", "superAdmin"]}>
                <ChangePasswordForm />
              </ProtectedRoute>
            }
          />

          {/* Ads routes */}
          <Route
            path="/ads"
            element={
              <ProtectedRoute allowedRoles={["user", "admin", "superAdmin"]}>
                <AdsLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="manage" replace />} />
            <Route path="create" element={<CreateAds />} />
            <Route path="manage" element={<ManageAds />} />
          </Route>

          {/* Payment */}
          <Route
            path="/payments/receipt/:orderId"
            element={
              <ProtectedRoute allowedRoles={["user", "admin", "superAdmin"]}>
                <PaymentReceipt />
              </ProtectedRoute>
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin", "superAdmin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route
              path="manage-admin"
              element={
                <ProtectedRoute allowedRoles={["superAdmin"]}>
                  <ManageAdmins />
                </ProtectedRoute>
              }
            />
            <Route path="manage-user" element={<UserManagementPage />} />
            {/* <Route path="manage-ads" element={<AdsManagement />} /> */}
          </Route>

          {/* routes not exists */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
      <FullScreenAd ad={ad} visible={visible} closeAd={closeAd} />
    </div>
  );
};

export default App;
