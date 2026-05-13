import axios from "axios";
import { useState, useEffect } from "react";

const HomePage = () => {
    const [totalPayroll, setTotalPayroll] = useState(null);
    const [totalDepartment, setTotalDepartment] = useState(null);
    const [totalEmployee, setTotalEmployee] = useState(null);

    const handleGetTotal = async () => {
          try {
            const res = await axios.get('http://localhost:4000/department/total');
            console.log("Total", res.data.payroll, res.data.department, res.data.employee);
            setTotalPayroll(res.data.payroll);
            setTotalDepartment(res.data.department);
            setTotalEmployee(res.data.employee);
          } catch (err) {
            console.error(err);
          }
    }

    useEffect(() => {
        handleGetTotal();
    }, []);
    return (
        <div>
            <div className="mt-30 ms-4 text-2xl font-light text-gray-800">
                <h1>Welcome to Employee paylor management system</h1>

                <div>
                    <div className="flex">
                        <h1>Total Employee</h1>
                        {totalEmployee && (
                            <div>
                                <p>{totalEmployee}</p>
                            </div>
                        )}
                    </div>
                    
                    <div className="flex">
                        <h1>Total Departments</h1>
                        {totalDepartment && (
                            <div>
                                <p>{totalDepartment}</p>
                            </div>
                        )}
                    </div>
                    
                    <div className="flex">
                        <h1>Total Payroll</h1>
                        {totalPayroll && (
                            <div>
                                <p>RWF: {totalPayroll}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;