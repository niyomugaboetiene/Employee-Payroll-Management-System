import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ListComponent = () => {
    const [employee, setEmployee] = useState(null);
    
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
                    <button className="bg-gray-500 px-5 text-white font-bold text-2xl rounded-lg py-2 hover:bg-gray-600 transition ">Add new</button>
                </div>
                <table border={2}>
                    <thead>
                        <tr>
                            <th>Employee number</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Postion</th>
                            <th>Address</th>
                            <th>Telephone</th>
                            <th>Gender</th>
                            <th>Hired date</th>
                            <th>Department</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {employee?.map((emp, index) => (
                            <tr key={index}>
                            {/* employeeNumber, FirstName, LastName, Position, Address, Telephone, Gender, hiredDate, department */}
                                <td>{emp.employeeNumber}</td>
                                <td>{emp.FirstName}</td>
                                <td>{emp.LastName}</td>
                                <td>{emp.Position}</td>
                                <td>{emp.Address}</td>
                                <td>{emp.Telephone}</td>
                                <td>{emp.Gender}</td>
                                <td>{new Date(emp.hiredDate).toLocaleDateString()}</td>
                                <td>{emp.department?.DepartementName || "No department"}</td>

                                <td>
                                  <Link to={`/update/${emp._id}`}>Update</Link>
                                  <button>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListComponent