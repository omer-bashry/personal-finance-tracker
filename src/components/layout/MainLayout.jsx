import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";
import AddTransactionDialog from "../../pages/AddTransaction/AddTransactionPage";

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f6f7f9] dark:bg-gray-900 transition-colors duration-300">
      {/* Mobile Header: Visible only on small screens */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-40 transition-colors duration-300">
        <div className="flex items-center gap-2">
          <img className="w-8 h-8 rounded-full" src="/logo.png" alt="Logo" />
          <span className="font-semibold text-gray-800 dark:text-white">Finance Tracker</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition cursor-pointer"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar: Hidden on mobile, fixed width on md+ screens */}
      <div className={`
        fixed inset-0 z-50 transform md:relative md:translate-x-0 transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        w-64 md:w-60 lg:w-64 flex-shrink-0
      `}>
        {/* Mobile Overlay: Clicks to close sidebar */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 md:hidden z-[-1]" 
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        {/* Actual Sidebar Component */}
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Page Content: Scrollable area */}
      <main className="flex-1 w-full p-4 md:p-6 lg:p-8 overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Add Transaction Modal: Global */}
      <AddTransactionDialog />
    </div>
  );
}
