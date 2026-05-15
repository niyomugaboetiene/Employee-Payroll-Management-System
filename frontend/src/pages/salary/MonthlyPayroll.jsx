import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const MonthlyPayroll = () => {
    const [salary, setSalary] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [query, setQuery] = useState("5");

    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const navigate = useNavigate();

    const handleGetSalary = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get(`http://localhost:4000/salary/montly/${query}`,  { withCredentials: true} );
            setSalary(res.data.result);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            // const errorMessage = err.data?.response?.message || "Error occured";
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
                <div className="flex justify-between mb-2">
                   <h1 className="mb-1 text-2xl font-bold text-gray-700">Monthly payroll</h1>
                   <div className="flex">
                        <input type="text" className="bg-gray-300 py-1 px-2 w-80 rounded-s-full focus:outline-1 focus:outline-gray-400" placeholder="search by month" onClick={(e) => setQuery(e.target.value)} />
                        <button className="bg-gray-400 px-6 rounded-e-full text-white hover:bg-gray-500 transition-colors" onClick={handleGetSalary}>Search</button>
                   </div>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MonthlyPayroll;