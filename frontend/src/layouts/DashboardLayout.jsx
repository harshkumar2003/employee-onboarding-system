import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {Outlet} from "react-router-dom";

const DashboardLayout = ()=>{
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Navbar/>
                <main className="flex-1 p-6 bg-[#F8FAFC] overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;