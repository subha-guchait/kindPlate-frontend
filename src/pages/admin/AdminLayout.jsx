import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Menu, BarChart2, Users, Settings, Megaphone } from "lucide-react";
import SidebarLink from "@/components/SideBarLink";
import { useAuthContext } from "@/context/AuthContext";

export default function AdminLayout() {
  const { authUser } = useAuthContext();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Define links and filter by role
  const links = [
    { to: "/admin/dashboard", label: "Dashboard", icon: BarChart2 },
    ...(authUser?.role === "superAdmin"
      ? [{ to: "/admin/manage-admin", label: "Manage Admin", icon: Settings }]
      : []),
    { to: "/admin/manage-user", label: "Manage User", icon: Users },
    // { to: "/admin/manage-ads", label: "Manage Ads", icon: Megaphone },
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center px-3 py-2 rounded-lg transition-colors ${
      isActive ? "bg-primary text-white" : "hover:bg-base-200"
    }`;

  return (
    <div className="min-h-screen flex bg-base-200">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed left-4 top-20 z-50">
        <button className="btn btn-ghost" onClick={() => setMobileOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile drawer backdrop */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-transparent z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`lg:hidden fixed left-0 top-0 bottom-0 z-50 transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-64 h-full bg-base-100 shadow-xl">
          <div className="p-4 border-b border-base-300 flex items-center justify-between">
            <div className="text-lg font-bold">Kind Plate</div>
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => setMobileOpen(false)}
            >
              ×
            </button>
          </div>

          <nav className="p-4 space-y-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={linkClass}
                onClick={() => setMobileOpen(false)}
              >
                <link.icon className="w-5 h-5" />
                <span className="ml-3">{link.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex fixed left-0 top-16 bottom-0 bg-base-100 border-r border-base-300 flex-col transition-all duration-300 z-30 ${
          expanded ? "w-64" : "w-20"
        }`}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        <div className="flex flex-col items-center p-4">
          <div className="mb-6 text-2xl mt-12"></div>
          <nav className="flex-1 space-y-2 w-full">
            {links.map((link) => (
              <SidebarLink
                key={link.to}
                to={link.to}
                label={link.label}
                Icon={link.icon}
                expanded={expanded}
              />
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 lg:ml-20 min-h-screen">
        <div className="p-6 pt-24 lg:pt-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
