import { NavLink } from "react-router-dom";

export default function SidebarLink({ to, label, Icon, expanded }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center h-12 rounded-lg transition-colors ${
          isActive ? "bg-primary text-white" : "hover:bg-base-200"
        }`
      }
    >
      {/* Icon wrapper (fixed width so text animation doesn't push it) */}
      <div className="flex-shrink-0 flex items-center justify-center w-12">
        <Icon className="w-5 h-5" />
      </div>

      {/* Label (only visible when expanded) */}
      <span
        className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
          expanded ? "ml-2 max-w-[140px] opacity-100" : "ml-0 max-w-0 opacity-0"
        }`}
      >
        {label}
      </span>
    </NavLink>
  );
}
