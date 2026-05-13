import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";


const EmployeeList = () => {
    const [employee, setEmployee] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const handleGetEmployee = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get('http://localhost:4000/employee/employeeList');
            setEmployee(res.data.employee);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            // const errorMessage = err.data?.response?.message || "Error occured";
            setIsLoading(false);
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
            <div className="mt-30">
                <div className="flex justify-between mb-3">
                   <h1 className="mb-2 text-2xl font-bold text-gray-700">Employee List</h1>
                   <button onClick={() => navigate('/AddEmployee')} className="bg-gray-400 text-white px-3 rounded-lg hover:bg-gray-500 transition-colors font-bold"><span className="mt-2 inline-flex  gap-2"><FaPlus /> Add Employee</span></button>
                </div>

                {isLoading && (
                    <div className="flex justify-center items-center">
                        <div className="border-transparent text-gray-700 border animate-spin"></div>
                    </div>
                )}
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
                                <td className="py-3 px-5">{emp.department?.DepartementName || "No department"}</td>
                                <td className="py-3 px-5">{new Date(emp.hiredDate).toLocaleDateString()}</td>
                                <td className="py-3 px-5">{new Date(emp.createdAt).toLocaleDateString()}</td>

                                <td className="flex gap-4">
                                    <Link className="py-1 px-3 bg-green-400 mt-2 rounded-lg text-white font-bold hover:bg-green-500 transition-colors" to={`/employee/update/${emp._id}`}><span className="inline-flex mt-3"><FaEdit />Update</span></Link>
                                    <button className="py-1 px-3 bg-red-400 mt-2 rounded-lg text-white font-bold me-3 hover:bg-red-500 transition-colors" onClick={() => handleDeleteEmployee(emp._id)}><span className="inline-flex mt-3"><FaTrash /> Delete</span></button>
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