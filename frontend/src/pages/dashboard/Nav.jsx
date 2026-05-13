import { Link } from "react-router-dom";
const NavBar = () => {
    

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="bg-white h-18 flex justify-between fixed top-0 left-0 right-0">
                <div className="relative">
                    <p className="absolute sm:left-0 lg:top-4 md:top-4 md:left-12 text-3xl font-bold bg-linear-to-b from-green-300 to-gray-600 text-transparent bg-clip-text hover:scale-105 transition duration-300">EMPS</p>
                </div>
                <nav className="sm:gap-1 gap-2 flex justify-center flex-wrap md:gap-6 pt-4 text-xl font-light text-gray-700">
                    <Link className="hover:border-b border-gray-600" to={'/'}>Home</Link>
                    <Link className="hover:border-b border-gray-600" to={'/employeeList'}>Employees</Link>
                    <Link className="hover:border-b border-gray-600" to={'/department/departmentList'}>Department</Link>
                    <Link className="hover:border-b border-gray-600" to={'/salary/SalaryList'}>Salary</Link>
                    <Link className="hover:border-b border-gray-600" to={'/eport'}>Payroll Report</Link>
                </nav>
                <div className="flex  sm:space-x-1 me-4">
                    <button className="bg-gray-200 h-8 mt-5 px-4 rounded-s-full hover:bg-gray-300 transition-colors text-gray-700">Sign in</button>
                   <button className="border h-8 mt-5 px-3 border-gray-500 rounded-e-full font-light text-gray-700 hover:bg-gray-300 transition-colors hover:text-white">Sign up</button>
                </div>
            </div>

        </div>
    )
}

export default NavBar;