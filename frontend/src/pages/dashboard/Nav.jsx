import { Link } from "react-router-dom";
const NavBar = () => {
    

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="bg-white h-14">
                <div className="relative">
                    <p className="absolute top-4 left-12 text-3xl font-bold bg-linear-to-b from-green-300 to-gray-600 text-transparent">EMPS</p>
                </div>
                <nav className="flex justify-center gap-6">
                    <Link>Home</Link>
                    <Link>Employees</Link>
                    <Link>Department</Link>
                    <Link>Salary</Link>
                    <Link>Payroll Report</Link>
                </nav>
            </div>
        </div>
    )
}

export default NavBar;