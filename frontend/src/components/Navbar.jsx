import { Bell } from "lucide-react";

const Navbar = () => {

    return (

        <div className="flex justify-between md:p-6 px-10 py-6  border-0 items-center">
            <div className="px-10 md:px-0">
                <h1 className="text-l font-medium">HR Dashboard</h1>
            </div>
            <div className="cursor-pointer">
                <Bell />
            </div>
        </div>

    );
};

export default Navbar;