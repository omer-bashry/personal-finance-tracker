import { useState } from "react";
import { User, Moon, DollarSign, Bell, Shield, Trash2, LogOut } from "lucide-react";
import useFinance from "../../logic/hooks/useFinance";
import Card from "../../components/ui/Card";

export default function SettingsPage() {
  const { deleteAllTransactions, isDarkMode, toggleDarkMode } = useFinance();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [currency, setCurrency] = useState("USD ($)");

  function handleDeleteData() {
    const confirmed = window.confirm(
      "Are you sure you want to delete ALL your financial data? This action cannot be undone."
    );
    if (confirmed) {
      deleteAllTransactions();
      alert("All transaction data has been permanently deleted.");
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your account preferences and app settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Account Profile */}
        <div className="md:col-span-1 space-y-6">
          <Card className="flex flex-col items-center text-center p-6 border-transparent bg-gradient-to-br from-blue-600 to-blue-800 shadow-xl shadow-blue-200">
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md p-1 mb-4">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                <User size={40} className="text-blue-600" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-white">Omer Bashry</h2>
            <p className="text-blue-100 text-sm mt-1">OmerBashry@gmail.com</p>
            <span className="mt-3 px-3 py-1 bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-md">
              Pro Member
            </span>
          </Card>

          {/* Account Actions */}
          <Card className="p-2 border-gray-100 shadow-sm">
            <button className="w-full flex items-center gap-3 p-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition cursor-pointer">
              <User size={18} className="text-gray-400" />
              Edit Profile
            </button>
            <button className="w-full flex items-center gap-3 p-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition cursor-pointer">
              <Shield size={18} className="text-gray-400" />
              Security & Privacy
            </button>
            <div className="h-px bg-gray-100 dark:bg-gray-700 my-1 mx-3" />
            <button className="w-full flex items-center gap-3 p-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition cursor-pointer">
              <LogOut size={18} />
              Sign Out
            </button>
          </Card>
        </div>

        {/* Right Column: Preferences & Danger Zone */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Preferences */}
          <Card className="border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
             <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                <h3 className="font-bold text-gray-800 dark:text-gray-200">App Preferences</h3>
             </div>
             <div className="divide-y divide-gray-50 dark:divide-gray-700">
               
               {/* Dark Mode Toggle */}
               <div className="flex items-center justify-between p-6">
                 <div className="flex items-center gap-3">
                   <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                     <Moon size={20} />
                   </div>
                   <div>
                     <p className="font-semibold text-gray-800 text-sm">Dark Mode</p>
                     <p className="text-xs text-gray-500 mt-0.5">Adjust the app appearance</p>
                   </div>
                 </div>
                 <button 
                  onClick={toggleDarkMode}
                  className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${isDarkMode ? 'bg-indigo-600' : 'bg-gray-200'}`}
                 >
                   <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${isDarkMode ? 'left-7' : 'left-1'}`} />
                 </button>
               </div>

                {/* Notifications Toggle */}
                <div className="flex items-center justify-between p-6">
                 <div className="flex items-center gap-3">
                   <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                     <Bell size={20} />
                   </div>
                   <div>
                     <p className="font-semibold text-gray-800 text-sm">Notifications</p>
                     <p className="text-xs text-gray-500 mt-0.5">Weekly summaries and alerts</p>
                   </div>
                 </div>
                 <button 
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${notificationsEnabled ? 'bg-orange-600' : 'bg-gray-200'}`}
                 >
                   <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${notificationsEnabled ? 'left-7' : 'left-1'}`} />
                 </button>
               </div>

                {/* Currency Selector */}
                <div className="flex items-center justify-between p-6">
                 <div className="flex items-center gap-3 items-start">
                   <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                     <DollarSign size={20} />
                   </div>
                   <div>
                     <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">Currency</p>
                     <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Primary currency for charts</p>
                   </div>
                 </div>
                 <select 
                   value={currency}
                   onChange={(e) => setCurrency(e.target.value)}
                   className="border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2 text-sm font-medium bg-gray-50 dark:bg-gray-700 dark:text-gray-200 outline-none cursor-pointer focus:ring-2 focus:ring-blue-500 transition-shadow"
                 >
                   <option>USD ($)</option>
                   <option>EUR (€)</option>
                   <option>GBP (£)</option>
                 </select>
               </div>
             </div>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-100 dark:border-red-900 shadow-sm overflow-hidden">
             <div className="px-6 py-4 border-b border-red-100 dark:border-red-900 bg-red-50/50 dark:bg-red-900/10">
                <h3 className="font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
                  <Trash2 size={18} />
                  Danger Zone
                </h3>
             </div>
             <div className="p-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Permanently delete all your transaction data. This action is irreversible and will reset your entire dashboard.
                </p>
                <button 
                  onClick={handleDeleteData}
                  className="px-4 py-2 bg-white dark:bg-gray-800 border-2 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 font-bold rounded-xl text-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition shadow-sm cursor-pointer"
                >
                  Delete All Data
                </button>
             </div>
          </Card>

        </div>
      </div>
    </div>
  );
}
