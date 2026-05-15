import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const DepartmentList = () => {
    const [department, setDepartement] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const navigate = useNavigate();

    const handleGetDepartment = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get('http://localhost:4000/department/departmentList',  { withCredentials: true} );
            setDepartement(res.data.department);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            // const errorMessage = err.data?.response?.message || "Error occured";
            setIsLoading(true);
            if (err.response?.status === 401) {
                setIsLoggedIn(false);
            }
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
            await axios.delete(`http://localhost:4000/department/delete/${_id}`,  { withCredentials: true} );
            await handleGetDepartment();
            setIsLoading(false);
        } catch (err) {
            console.error(err);
             if (err.response?.status === 401) {
                setIsLoggedIn(false);
            }
        }
    }
    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-gray-100 flex justify-center items-center">
                <div className="bg-white p-2 px-12 py-4 w-70 h-30 rounded-lg shadow-lg">
                    <h1 className="text-center text-xl font-bold text-gray-700 mb-3">Access denied</h1>
                    <button className="bg-gray-500 mt-2 py-2 px-5 ms-12 text-white hover:bg-gray-600 transition-colors" onClick={() => navigate('/admin/login')}>Login</button>
                </div>
            </div>
        )
    }


    return (
        <div className="bg-gray-50 min-h-screen flex justify-center">
            <div className="mt-30">
                <div className="flex justify-between mb-3">
                   <h1 className="mb-2 text-2xl font-bold text-gray-700">Department List</h1>
                   <button onClick={() => navigate('/AddDepartment')} className="bg-gray-400 text-white px-3 rounded-lg hover:bg-gray-500 transition-colors">Add Department</button>
                </div>
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
                        {department?.map((dep, index) => (
                            <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-300 hover:bg-gray-400'}`}>
                                <td className="py-3 px-5">{dep.DepartementCode}</td>
                                <td className="py-3 px-5">{dep.DepartementName}</td>
                                <td className="py-3 px-5">{dep.GrossSalary}</td>
                                <td className="py-3 px-5">{new Date(dep.createdAt).toLocaleDateString()}</td>
                                <td className="py-3 px-5">{new Date(dep.updatedAt).toLocaleDateString()}</td>

                                <td className="flex gap-4">
                                    <Link className="py-2 px-3 bg-green-400 mt-2 rounded-lg text-white font-bold hover:bg-green-500 transition-colors" to={`/department/update/${dep._id}`}>Update</Link>
                                    <button className="py-2 px-3 bg-red-400 mt-2 rounded-lg text-white font-bold me-3 hover:bg-red-500 transition-colors" onClick={() => handleDeleteDepartment(dep._id)}>Delete</button>
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