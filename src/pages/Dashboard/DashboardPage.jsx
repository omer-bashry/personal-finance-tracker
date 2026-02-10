import Sidebar from "../../components/layout/Sidebar";
export default function DashboardPage() {
  return (
    <>
      <div className="grid grid-cols-12 gap-4 ">
        <div className="col-span-3 lg:col-span-2 sticky top-0 h-screen">
          <Sidebar />
        </div>
        <div className="col-span-9 lg:col-span-10 bg-[#f6f7f9] h-dvh">
          <span> Main content</span>
        </div>
      </div>
    </>
  );
}
