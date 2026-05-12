import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ListComponent = () => {
    const [employee, setEmployee] = useState(null);

    const navigate = useNavigate();
    
    const handleGet = async () => {
        try {
            const res = await axios.get('http://localhost:4000/employee/employeeList');
            console.log("Debug result", res.data.employee);
            setEmployee(res.data.employee);
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        handleGet();
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen flex justify-center">
            <div className="mt-12">
                <div className="flex justify-between mb-4">
                    <h1 className="text-3xl font-bold text-gray-900">Employee list</h1>
                    <button className="bg-gray-500 px-5 text-white font-bold text-2xl rounded-lg py-2 hover:bg-gray-900 transition duration-1000" onClick={() => navigate('/AddEmployee')}>Add new</button>
                </div>
                <table border={2}>
                    <thead className="bg-gray-500 text-white text-xl">
                        <tr>
                            <th className="py-2 px-3">Employee number</th>
                            <th className="py-2 px-3">First name</th>
                            <th className="py-2 px-3">Last name</th>
                            <th className="py-2 px-3">Postion</th>
                            <th className="py-2 px-3">Address</th>
                            <th className="py-2 px-3">Telephone</th>
                            <th className="py-2 px-3">Gender</th>
                            <th className="py-2 px-3">Hired date</th>
                            <th className="py-2 px-3">Department</th>
                            <th colSpan={2} className="py-2 px-3">Action</th>
                        </tr>
                    </thead>

                    <tbody className="text-xl">
                        {employee?.map((emp, index) => (
                            <tr key={index} className={`${index % 2 == 0 ? 'bg-gray-400 hover:bg-gray-300 transition-colors' : 'bg-gray-500'} text-white hover:bg-gray-600 transition-colors`}>
                            {/* employeeNumber, FirstName, LastName, Position, Address, Telephone, Gender, hiredDate, department */}
                                <td className="py-2 px-3">{emp.employeeNumber}</td>
                                <td className="py-2 px-3">{emp.FirstName}</td>
                                <td className="py-2 px-3">{emp.LastName}</td>
                                <td className="py-2 px-3">{emp.Position}</td>
                                <td className="py-2 px-3">{emp.Address}</td>
                                <td className="py-2 px-3">{emp.Telephone}</td>
                                <td className="py-2 px-3">{emp.Gender}</td>
                                <td className="py-2 px-3">{new Date(emp.hiredDate).toLocaleDateString()}</td>
                                <td className="py-2 px-3">{emp.department?.DepartementName || "No department"}</td>

                                <td className="py-2 px-3 flex justify-between gap-8">
                                  <Link to={`/update/${emp._id}`} className="bg-green-300 text-gray-700 px-4 py-1 rounded-lg ">Update</Link>
                                  <button className="bg-red-300 text-gray-700 px-4 rounded-lg">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListComponent;