import { Link } from "react-router-dom";
const NavBar = () => {
    

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="bg-white h-18 flex justify-between">
                <div className="relative">
                    <p className="absolute sm:left-0 lg:top-4 md:top-4 md:left-12 text-3xl font-bold bg-linear-to-b from-green-300 to-gray-600 text-transparent bg-clip-text hover:scale-105 transition duration-300">EMPS</p>
                </div>
                <nav className="sm:gap-1 gap-2 flex justify-center flex-wrap md:gap-6 pt-4 text-xl font-light text-gray-700">
                    <Link>Home</Link>
                    <Link>Employees</Link>
                    <Link>Department</Link>
                    <Link>Salary</Link>
                    <Link>Payroll Report</Link>
                </nav>
                <div className="flex md:space-x-4 sm:space-x-1 me-4">
                    <button className="bg-gray-200">Sign in</button>
                   <button>Sign up</button>
                </div>
            </div>

        </div>
    )
}

export default NavBar;