import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <div className="m-2 flex">
         <div className="fixed top-170 h-full bg-gray-200 w-full py-4 p-12">
            <div className="flex justify-between">
            <div className="relative top-19 left-30">
                <h1 className="text-4xl bg-linear-to-b from-green-500 to-gray-700 via-purple-600 font-bold bg-clip-text text-transparent">EMPS</h1>
            </div>
            <div className="grid space-y-2 mt-4">
                <h1 className="text-2xl font-bold text-stone-700">Navigation</h1>
                <Link className="text-stone-900 hover:underline transition duration-200" to={'/'}>Home</Link>
                <Link className="text-stone-900 hover:underline transition duration-200" to={'/employeeList'}>Employees</Link>
                <Link className="text-stone-900 hover:underline transition duration-200" to={'/department/departmentList'}>Department</Link>
                <Link className="text-stone-900 hover:underline transition duration-200" to={'/salary/SalaryList'}>Salary</Link>
                <Link className="text-stone-900 hover:underline transition duration-200">Payroll Report</Link>
            </div>
            <div className="space-y-2 mt-4">
                <h1 className="text-2xl font-bold text-stone-700">Contact us</h1>
                <p className="text-stone-900 hover:underline transition duration-200">niyomugaboetiene53@gmail.com</p>
                <p className="text-stone-900">+250 796 878 992</p>
            </div>                
            </div>
         </div>
        </div>
    )
}

export default Footer;