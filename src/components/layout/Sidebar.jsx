import { LayoutDashboard } from "lucide-react";
import { ArrowRightLeft } from "lucide-react";
import { Settings } from "lucide-react";
import { ChartNoAxesCombined } from "lucide-react";
export default function Sidebar() {
  return (
    <>
      <div className="pt-4 ps-4 pe-2 pb-4 max-sm:ps-0">
        <div className=" flex justify-around items-center max-sm:flex-col">
          <img
            className="rounded-full w-10 h-10 max-sm:w-5 max-sm:h-5"
            src="../../public/logo.png"
            alt="Logo"
          />
          <div className=" font-semibold max-sm:hidden">Finance Tracker</div>
        </div>
        <div className=" mt-5 max-sm:flex flex-col h-screen items-center justify-evenly">
          <SidebarItem name="Dashboard" icon={<LayoutDashboard />} />
          <SidebarItem name="Transactions" icon={<ArrowRightLeft />} />
          <SidebarItem name="Reports" icon={<ChartNoAxesCombined />} />
          <SidebarItem name="Settings" icon={<Settings />} />
        </div>
      </div>
    </>
  );
}

function SidebarItem({ name, icon }) {
  return (
    <>
      <div className=" mb-2 flex justify-evenly items-center max-sm:flex-col cursor-pointer rounded-2xl transition hover:bg-[#f6f7f9] p-2">
        <div>{icon}</div>
        <h2 className=" max-sm:hidden">{name}</h2>
      </div>
    </>
  );
}
