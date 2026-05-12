import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const AddSalary = () => {
    // GlossSalary, TotalDeduction, month, employee 
    const [GlossSalary, setGlossSalary] = useState("");
    const [TotalDeduction, setTotalDeduction] = useState("");
    const [month, setMonth] = useState("");
    const [employee, setEmployee] = useState("");
    const [department, setDepartment] = useState("");

    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

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
    
    const handleGetDepartment = async () => {
        try {
            setLoading(true);
            const res = await axios.get('http://localhost:4000/department/departmentList');
            setSelectedDepartment(res.data.department);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    } 

    useEffect(() => {
        handleGetDepartment();
    }, []);

    const handleAddNewSalary = async () => {
        try {
            if (!GlossSalary || !TotalDeduction || !month) {
                setError("Fill out missing fields");
                setTimeout(() => {
                    setError("");
                }, 4000);
                setSuccess("");
                return;
            }
            setLoading(true);
            const res = await axios.post('http://localhost:4000/salary/addSalary', {
                GlossSalary, TotalDeduction, month, employee, department
            });
           setLoading(false);
           setError("");
           setSuccess(res.data.message);
          setTimeout(() => {
                    setSuccess("");
         }, 4000);
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.message || "Error occurred";
            setError(errorMessage);
             setError("");
          setTimeout(() => {
               setError("");
         }, 4000);
            setSuccess("");
        }
    }


    return (
        <div className="bg-gray-200 min-h-screen flex justify-center items-center">
            <div className="bg-white p-3 rounded-lg shadow-2xl w-90">
                <h2 className="text-gray-700 font-bold text-center text-sm">Add Salary Portal</h2>

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
                     className="bg-gray-300 text-xs py-2  w-full p-1 rounded-lg focus:outline-1 focus:outline-gray-500"
                     type="number" onChange={(e) => {
                        setGlossSalary(e.target.value)
                    }} 
                    placeholder="Enter Gross Salary"
                    />
                </div>
                
                <div className="mt-2">
                    <input 
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
                    placeholder="Enter month"
                    />
                </div>

                <div className="mt-2">
                    <select onChange={(e) => setEmployee(e.target.value)} className="bg-gray-300 text-xs py-2 w-full p-1 rounded-lg focus:outline-1 focus:outline-gray-500">
                        <option value="" disabled>Select employee</option>
                        {selectedEmployee?.map((emp, index) => (
                            <option value={emp._id} key={index}>{emp.FirstName} {emp.LastName}</option>
                        ))}
                    </select>
                </div>
                
                <div className="mt-2">
                    <select onChange={(e) => setDepartment(e.target.value)} className="bg-gray-300 text-xs py-2 w-full p-1 rounded-lg focus:outline-1 focus:outline-gray-500">
                        <option value="" >Select department</option>
                        {selectedDepartment?.map((dep, index) => (
                            <option value={dep._id} key={index}>{dep.DepartementName}</option>
                        ))}
                    </select>
                </div>

                {/* <div className="mt-4 flex justify-between">
                    <button onClick={handleAddNewEmployee} className="bg-gray-300 py-2 text-xs px-2 rounded-lg font-light hover:bg-gray-400 transition-colors active:bg-gray-500">+ Add new</button>
                    <button className="bg-red-500 text-xs px-2 rounded-lg font-light text-white hover:bg-red-400 transition-colors active:bg-red-500">Back</button>
                </div> */}
              <div className="mt-4">
                    <button onClick={handleAddNewSalary} className="w-full bg-gray-300 py-2 text-xs px-2 rounded-lg font-light hover:bg-gray-400 transition-colors active:bg-gray-500">+ Add new</button>
                    <button className="bg-red-500 text-xs px-2 w-full py-2 mt-2 rounded-lg font-light text-white hover:bg-red-400 transition-colors active:bg-red-500">Back</button>
                </div>
            </div>
        </div>
    )
}


export default AddSalary;