import axios from "axios";
import { useState, useEffect } from "react";

const HomePage = () => {
    const [totalPayroll, setTotalPayroll] = useState(null);
    const [totalDepartment, setTotalDepartment] = useState(null);
    const [totalEmployee, setTotalEmployee] = useState(null);

    // recents
    const [recentEmployee, setRecentEmployee] = useState(null);
    const [recentDepartment, setRecentDepartment] = useState(null);
    const [recentSalary, setRecentSalary] = useState(null);

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

    const handleGetRecents = async () => {
        try {
            const salary = await axios.get('http://localhost:4000/salary/recentSalary');
            const employee = await axios.get('http://localhost:4000/salary/recentEmployee');
            const department = await axios.get('http://localhost:4000/salary/recentDepartment');

            setRecentDepartment(department.data.recent);
            setRecentEmployee(employee.data.recent);
            setRecentSalary(salary.data.recent);
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

                <div className="mt-4 space-y-5">
                    <div className="flex bg-gray-200 w-fit py-3 p-2 font-light px-4 rounded-lg">
                        <h1>Total Employee:</h1>
                        {totalEmployee && (
                            <div>
                                <p className="ms-4 font-bold">{totalEmployee}</p>
                            </div>
                        )}
                    </div>
                    
                    <div className="flex bg-gray-200 w-fit py-3 p-2 font-light px-4 rounded-lg">
                        <h1>Total Departments</h1>
                        {totalDepartment && (
                            <div>
                                <p className="ms-4 font-bold">{totalDepartment}</p>
                            </div>
                        )}
                    </div>
                    
                    <div className="flex bg-gray-200 w-fit py-3 p-2 font-light px-4 rounded-lg">
                        <h1>Total Payroll</h1>
                        {totalPayroll && (
                            <div>
                                <p className="font-bold ms-4">RWF: {totalPayroll}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div>

                </div>
            </div>
        </div>
    )
}

export default HomePage;