import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateSalary = () => {
    // GlossSalary, TotalDeduction, month, employee 
    const [GlossSalary, setGlossSalary] = useState("");
    const [TotalDeduction, setTotalDeduction] = useState("");
    const [month, setMonth] = useState("");
    const [employee, setEmployee] = useState("");

    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const { _id } = useParams();

    const GetCurrentSalary = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`http://localhost:4000/salary/get/${_id}`);
            const salary = res.data?.salary;
            console.log("Result", salary);
            setGlossSalary(salary.GlossSalary);
            setEmployee(salary.employee?._id);
            setTotalDeduction(salary.TotalDeduction);
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        GetCurrentSalary();
    }, [_id]);

    const handleGetEmployee = async () => {
        try {
            setLoading(true);
            const res = await axios.get('http://localhost:4000/employee/employeeList');
            setSelectedEmployee(res.data.employee);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    } 

    useEffect(() => {
        handleGetEmployee();
    }, []);

    const handleUpdateSalary = async () => {
        try {
            setLoading(true);
            const res = await axios.put(`http://localhost:4000/salary/update/${_id}`, {
                GlossSalary, TotalDeduction, month, employee
            });
           setLoading(false);
           setError("");
           setSuccess(res.data.message);
          setInterval(() => {
                    setSuccess("");
         }, 4000);
         navigate('/salary/salaryList');
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.message || "Error occurred";
            setError(errorMessage);
             setError("");
          setInterval(() => {
               setError("");
         }, 4000);
            setSuccess("");
        }
    }


    return (
        <div className="bg-gray-200 min-h-screen flex justify-center items-center">
            <div className="bg-white p-3 rounded-lg shadow-2xl w-90">
                <h2 className="text-gray-700 font-bold text-center text-sm">Update Salary Portal</h2>

                {success && (
                    <div className="bg-green-500 mt-2 mb-3 p-1 rounded-lg text-green-100">
                        <p className="ms-1 font-bold text-sm">{success}</p>
                    </div>
                )}
                {error && (
                 <div className="bg-red-500 mt-2 mb-3 p-1 rounded-lg text-red-100">
                    <p className="ms-1 font-bold text-sm">{error}</p>
                  </div>
                )}
                <div className="mt-2"> 
                    <input 
                    value={GlossSalary}
                     className="bg-gray-300 text-xs py-2  w-full p-1 rounded-lg focus:outline-1 focus:outline-gray-500"
                     type="number" onChange={(e) => {
                        setGlossSalary(e.target.value)
                    }} 
                    placeholder="Enter Gross Salary"
                    />
                </div>
                
                <div className="mt-2">
                    <input 
                    value={TotalDeduction}
                    className="bg-gray-300 text-xs py-2  w-full p-1 rounded-lg focus:outline-1 focus:outline-gray-500"
                    type="number" onChange={(e) => {
                        setTotalDeduction(e.target.value)
                    }} 
                    placeholder="Enter Total Deduction"
                    />
                </div>
                
                <div className="mt-2">
                    <input 
                    className="bg-gray-300 text-xs py-2 w-full p-1 rounded-lg focus:outline-1 focus:outline-gray-500"
                    type="text" onChange={(e) => {
                        setMonth(e.target.value)
                    }} 
                    placeholder="Enter Month"
                    />
                </div>

                <div className="mt-2">
                    <select value={employee} onChange={(e) => setEmployee(e.target.value)} className="bg-gray-300 text-xs py-2 w-full p-1 rounded-lg focus:outline-1 focus:outline-gray-500">
                        {selectedEmployee?.map((emp, index) => (
                            <option value={emp._id} key={index}>{emp.FirstName} . {emp.LastName}</option>
                        ))}
                    </select>
                </div>

                {/* <div className="mt-4 flex justify-between">
                    <button onClick={handleAddNewEmployee} className="bg-gray-300 py-2 text-xs px-2 rounded-lg font-light hover:bg-gray-400 transition-colors active:bg-gray-500">+ Add new</button>
                    <button className="bg-red-500 text-xs px-2 rounded-lg font-light text-white hover:bg-red-400 transition-colors active:bg-red-500">Back</button>
                </div> */}
              <div className="mt-4">
                    <button onClick={handleUpdateSalary} className="w-full bg-gray-300 py-2 text-xs px-2 rounded-lg font-light hover:bg-gray-400 transition-colors active:bg-gray-500">Update</button>
                    <button className="bg-red-500 text-xs px-2 w-full py-2 mt-2 rounded-lg font-light text-white hover:bg-red-400 transition-colors active:bg-red-500">Back</button>
                </div>
            </div>
        </div>
    )
}


export default UpdateSalary;