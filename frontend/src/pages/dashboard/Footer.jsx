import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <div className="m-2 flex">
         <div className="fixed top-190 h-full bg-gray-200 w-full py-4 p-3">
            <div className="flex justify-between">
            <div>
                <h1>EMPS</h1>
            </div>
            <div className="grid">
                <Link>Home</Link>
                <Link>Employees</Link>
                <Link>Department</Link>
                <Link>Salary</Link>
                <Link>Payroll Report</Link>
            </div>
            <div>
                <h1>Contact us</h1>
                <p>niyomugaboetiene53@gmail.com</p>
                <p>+250 796 878 992</p>
            </div>                
            </div>
         </div>
        </div>
    )
}

export default Footer;