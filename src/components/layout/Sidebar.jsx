import { NavLink } from "react-router-dom";
import { LayoutDashboard, ArrowRightLeft, ChartNoAxesCombined, Settings, X } from "lucide-react";

export default function Sidebar({ onClose }) {
  return (
    <div className="flex flex-col h-full border-r border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 transition-colors duration-300">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between mb-8 px-2">
        <div className="flex items-center gap-2">
          <img
            className="rounded-full w-10 h-10"
            src="/logo.png"
            alt="Logo"
          />
          <div className="font-semibold text-gray-800 dark:text-white">Finance Tracker</div>
        </div>
        
        {/* Close Button: Only visible on mobile */}
        <button 
          onClick={onClose}
          className="md:hidden p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition cursor-pointer"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation links */}
      <nav className="flex flex-col gap-1">
        <SidebarItem to="/" name="Dashboard" icon={<LayoutDashboard size={20} />} onClick={onClose} />
        <SidebarItem to="/transactions" name="Transactions" icon={<ArrowRightLeft size={20} />} onClick={onClose} />
        <SidebarItem to="/reports" name="Reports" icon={<ChartNoAxesCombined size={20} />} onClick={onClose} />
        <SidebarItem to="/settings" name="Settings" icon={<Settings size={20} />} onClick={onClose} />
      </nav>

    </div>
  );
}


function SidebarItem({ to, name, icon, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition duration-200 ${
          isActive
            ? "bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-medium"
            : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200"
        }`
      }
    >
      <div className="flex-shrink-0">{icon}</div>
      <span className="text-sm">{name}</span>
    </NavLink>
  );
}
