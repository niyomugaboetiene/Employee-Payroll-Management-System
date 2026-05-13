import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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

            // console.log(department.data.recent, employee.data.recent, salary.data.recent);
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

    useEffect(() => {
        handleGetRecents();
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

                <div className="mt-4">
                    <h1 className="mb-4 font-bold text-gray-700">Recents</h1>

                    <div className="w-fit  text-lg bg-gray-200 rounded-lg  p-4">
                    <h1 className="font-bold text-gray-700 text-2xl mb-3">Recent Employee</h1>
                   <table border={2}>
                    <thead className="bg-gray-400 text-white ">
                        <tr>
                            <th className="py-3 px-5">Employee Number</th>
                            <th className="py-3 px-5">First Name</th>
                            <th className="py-3 px-5">Last Name</th>
                            <th className="py-3 px-5">Position</th>
                            <th className="py-3 px-5">Address</th>
                            <th className="py-3 px-5">Telephone</th>
                            <th className="py-3 px-5">Gender</th>
                            <th className="py-3 px-5">Department</th>
                            <th className="py-3 px-5">Hired Date</th>
                            <th className="py-3 px-5">Registered Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {recentEmployee?.map((emp, index) => (
                            <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-300 hover:bg-gray-400'}`}>
                                <td className="py-3 px-5">{emp.employeeNumber}</td>
                                <td className="py-3 px-5">{emp.FirstName}</td>
                                <td className="py-3 px-5">{emp.LastName}</td>
                                <td className="py-3 px-5">{emp.Position}</td>
                                <td className="py-3 px-5">{emp.Address}</td>
                                <td className="py-3 px-5">{emp.Telephone}</td>
                                <td className="py-3 px-5">{emp.Gender}</td>
                                <td className="py-3 px-5">{emp.department?.DepartementName || "No department"}</td>
                                <td className="py-3 px-5">{new Date(emp.hiredDate).toLocaleDateString()}</td>
                                <td className="py-3 px-5">{new Date(emp.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
               
                     <div className="mt-3">
                         <Link className="flex justify-center text-blue-400 font-black underline" to={'/employeeList'}>View more</Link>
                     </div>
                     </div>


                    <div className="w-410 mt-8 text-lg bg-gray-200 rounded-lg  p-4">
                    <h1 className="font-bold text-gray-700 text-2xl mb-3">Recent Department</h1>
                     <table border={2} className="w-404">
                    <thead className="bg-gray-400 text-white ">
                        <tr>
                            <th className="py-3 px-0">Departement Code</th>
                            <th className="py-3 px-0">Departement Name</th>
                            <th className="py-3 px-0">Gross Salary</th>
                            <th className="py-3 px-0">Created At</th>
                            <th className="py-3 px-0">Last Update</th>
                        </tr>
                    </thead>

                    <tbody>
                        {recentDepartment?.map((dep, index) => (
                            <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-300 hover:bg-gray-400'}`}>
                                <td className="py-3 px-5">{dep.DepartementCode}</td>
                                <td className="py-3 px-5">{dep.DepartementName}</td>
                                <td className="py-3 px-5">{dep.GrossSalary}</td>
                                <td className="py-3 px-5">{new Date(dep.createdAt).toLocaleDateString()}</td>
                                <td className="py-3 px-5">{new Date(dep.updatedAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
               
                     <div className="mt-3">
                         <Link className="flex justify-center text-blue-400 font-black underline" to={'/department/departmentList'}>View more</Link>
                     </div>
                     </div>
                     
                     <div className="w-410 mt-8 text-lg bg-gray-200 rounded-lg  p-4">
                    <h1 className="font-bold text-gray-700 text-2xl mb-3">Recent Department</h1>
                     <table border={2} className="w-404">
                    <thead className="bg-gray-400 text-white ">
                        <tr>
                            <th className="py-3 px-0">Departement Code</th>
                            <th className="py-3 px-0">Departement Name</th>
                            <th className="py-3 px-0">Gross Salary</th>
                            <th className="py-3 px-0">Created At</th>
                            <th className="py-3 px-0">Last Update</th>
                        </tr>
                    </thead>

                    <tbody>
                        {recentDepartment?.map((dep, index) => (
                            <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-300 hover:bg-gray-400'}`}>
                                <td className="py-3 px-5">{dep.DepartementCode}</td>
                                <td className="py-3 px-5">{dep.DepartementName}</td>
                                <td className="py-3 px-5">{dep.GrossSalary}</td>
                                <td className="py-3 px-5">{new Date(dep.createdAt).toLocaleDateString()}</td>
                                <td className="py-3 px-5">{new Date(dep.updatedAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
               
                     <div className="mt-3">
                         <Link className="flex justify-center text-blue-400 font-black underline" to={'/department/departmentList'}>View more</Link>
                     </div>
                     </div>
                </div>
                
            </div>
        </div>
    )
}

export default HomePage;