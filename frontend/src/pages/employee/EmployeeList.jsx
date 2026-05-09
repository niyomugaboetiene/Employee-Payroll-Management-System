import axios from "axios";
import { useState, useEffect } from "react";

const EmployeeList = () => {
    const [employee, setEmployee] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleGetEmployee = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get('http://localhost:4000/employee/employeeList');
            setEmployee(res.data.employee);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            // const errorMessage = err.data?.response?.message || "Error occured";
            setIsLoading(true);
        }
    }

    useEffect(() => {
        handleGetEmployee();
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen flex justify-center">
            <div className="">
                <table border={2}>
                    <thead>
                        <tr>
                            <th>Employee Number</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Position</th>
                            <th>Address</th>
                            <th>Telephone</th>
                            <th>Gender</th>
                            <th>Hired Date</th>
                            <th>Registered Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {employee?.map((emp, index) => (
                            <tr key={index}>
                                <td>{emp.employeeNumber}</td>
                                <td>{emp.FirstName}</td>
                                <td>{emp.LastName}</td>
                                <td>{emp.Position}</td>
                                <td>{emp.Address}</td>
                                <td>{emp.Telephone}</td>
                                <td>{emp.Gender}</td>
                                <td>{new Date(emp.hiredDate).toLocaleDateString()}</td>
                                <td>{new Date(emp.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default EmployeeList;