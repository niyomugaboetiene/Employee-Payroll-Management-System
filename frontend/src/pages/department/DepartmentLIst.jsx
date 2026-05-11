import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const DepartmentList = () => {
    const [department, setDepartement] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleGetDepartment = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get('http://localhost:4000/department/departmentList');
            setDepartement(res.data.department);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            // const errorMessage = err.data?.response?.message || "Error occured";
            setIsLoading(true);
        }
    }

    useEffect(() => {
        handleGetDepartment();
    }, []);

    const handleDeleteDepartment = async (_id) => {
        try {
            const confrim = window.confirm("Are you sure ?");
            if (!confrim) {
                return;
            }
            setIsLoading(true);
            await axios.delete(`http://localhost:4000/department/delete/${_id}`);
            await handleGetDepartment();
            setIsLoading(false);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="bg-gray-50 min-h-screen flex justify-center">
            <div className="mt-12">
                <h1 className="text-center mb-2 text-2xl font-bold text-gray-700">Department List</h1>
                <table border={2}>
                    <thead className="bg-gray-400 text-white ">
                        <tr>
                            <th className="py-3 px-5">Departement Code</th>
                            <th className="py-3 px-5">Departement Name</th>
                            <th className="py-3 px-5">Gross Salary</th>
                            <th className="py-3 px-5">Created At</th>
                            <th className="py-3 px-5">Last Update</th>
                            <th className="py-3 px-5">Modification</th>
                        </tr>
                    </thead>

                    <tbody>
                        {employee?.map((dep, index) => (
                            <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-300 hover:bg-gray-400'}`}>
                                <td className="py-3 px-5">{dep.DepartementCode}</td>
                                <td className="py-3 px-5">{dep.DepartementName}</td>
                                <td className="py-3 px-5">{dep.GrossSalary}</td>
                                <td className="py-3 px-5">{new Date(emp.createdAt).toLocaleDateString()}</td>
                                <td className="py-3 px-5">{new Date(emp.updatedAt).toLocaleDateString()}</td>

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

export default DepartmentList;