import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <div>
         <div>
            <div>
                <h1>EMPS</h1>
            </div>
            <div>
                <Link>Home</Link>
                <Link>Employees</Link>
                <Link>Department</Link>
                <Link>Salary</Link>
                <Link>Payroll Report</Link>
            </div>
            <div>
                <h1>Contact us</h1>
            </div>
         </div>
        </div>
    )
}

export default Footer;