import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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

    const handleDeleteEmployee = async (_id) => {
        try {
            const confrim = window.confirm("Are you sure ?");
            if (!confrim) {
                return;
            }
            setIsLoading(true);
            await axios.delete(`http://localhost:4000/employee/delete/${_id}`);
            await handleGetEmployee();
            setIsLoading(false);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="bg-gray-50 min-h-screen flex justify-center">
            <div className="mt-12">
                <h1 className="text-center mb-2 text-2xl font-bold text-gray-700">Employee List</h1>
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
                            <th className="py-3 px-5">Hired Date</th>
                            <th className="py-3 px-5">Registered Date</th>
                            <th className="py-3 px-5">Modification</th>
                        </tr>
                    </thead>

                    <tbody>
                        {employee?.map((emp, index) => (
                            <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-300 hover:bg-gray-400'}`}>
                                <td className="py-3 px-5">{emp.employeeNumber}</td>
                                <td className="py-3 px-5">{emp.FirstName}</td>
                                <td className="py-3 px-5">{emp.LastName}</td>
                                <td className="py-3 px-5">{emp.Position}</td>
                                <td className="py-3 px-5">{emp.Address}</td>
                                <td className="py-3 px-5">{emp.Telephone}</td>
                                <td className="py-3 px-5">{emp.Gender}</td>
                                <td className="py-3 px-5">{new Date(emp.hiredDate).toLocaleDateString()}</td>
                                <td className="py-3 px-5">{new Date(emp.createdAt).toLocaleDateString()}</td>

                                <td className="flex gap-4">
                                    <Link className="py-2 px-3 bg-green-400 mt-2 rounded-lg text-white font-bold hover:bg-green-500 transition-colors" to={`/employee/update/${emp._id}`}>Update</Link>
                                    <button className="py-2 px-3 bg-red-400 mt-2 rounded-lg text-white font-bold me-3 hover:bg-red-500 transition-colors" onClick={() => handleDeleteEmployee(emp._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default EmployeeList;