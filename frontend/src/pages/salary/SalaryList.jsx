import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const SalaryList = () => {
    const [salary, setSalary] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const handleGetSalary = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get('http://localhost:4000/salary/salaryList');
            setSalary(res.data.salary);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            // const errorMessage = err.data?.response?.message || "Error occured";
            setIsLoading(true);
        }
    }

    useEffect(() => {
        handleGetSalary();
    }, []);

    const handleDeleteSalary = async (_id) => {
        try {
            const confrim = window.confirm("Are you sure ?");
            if (!confrim) {
                return;
            }
            setIsLoading(true);
            await axios.delete(`http://localhost:4000/salary/delete/${_id}`);
            await handleGetSalary();
            setIsLoading(false);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="bg-gray-50 min-h-screen flex justify-center">
            <div className="mt-30">
                <div className="flex justify-between mb-3">
                   <h1 className="mb-2 text-2xl font-bold text-gray-700">Salaries List</h1>
                   <button onClick={() => navigate('/AddSalary')} className="bg-gray-400 text-white px-3 rounded-lg hover:bg-gray-500 transition-colors">Add Salary</button>
                </div>
                <table border={2}>
                    <thead className="bg-gray-400 text-white ">
                        <tr>
                            <th className="py-3 px-5">Gloss Salary</th>
                            <th className="py-3 px-5">Total Deduction</th>
                            <th className="py-3 px-5">Net Salary</th>
                            <th className="py-3 px-5">Month</th>
                            <th className="py-3 px-5">Employee</th>
                            <th className="py-3 px-5">Created At</th>
                            <th className="py-3 px-5">Last update</th>
                            <th className="py-3 px-5">Modification</th>
                        </tr>
                    </thead>

                    <tbody>
                        {salary?.map((salary, index) => (
                            <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-300 hover:bg-gray-400'}`}>
                                <td className="py-3 px-5">{salary.GlossSalary}</td>
                                <td className="py-3 px-5">{salary.TotalDeduction}</td>
                                <td className="py-3 px-5">{salary.NetSalary}</td>
                                <td className="py-3 px-5">{salary.month}</td>
                                <td className="py-3 px-5">{salary.employee?.FirstName || "No Employee"}</td>
                                <td className="py-3 px-5">{new Date(salary.createdAt).toLocaleDateString()}</td>
                                <td className="py-3 px-5">{new Date(salary.updatedAt).toLocaleDateString()}</td>

                                <td className="flex gap-4">
                                    <Link className="py-2 px-3 bg-green-400 mt-2 rounded-lg text-white font-bold hover:bg-green-500 transition-colors" to={`/salary/update/${salary._id}`}>Update</Link>
                                    <button className="py-2 px-3 bg-red-400 mt-2 rounded-lg text-white font-bold me-3 hover:bg-red-500 transition-colors" onClick={() => handleDeleteSalary(salary._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SalaryList;