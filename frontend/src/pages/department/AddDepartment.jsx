import { useState } from "react";
import axios from "axios";

const AddDepartment = () => {
    // DepartementCode, DepartementName, GrossSalary 
    const [DepartementCode, setDepartementCode] = useState("");
    const [DepartementName, setDepartementName] = useState("");
    const [GrossSalary, setGrossSalary] = useState("");

    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const handleAddNewDepartment = async () => {
        try {
            if (!DepartementCode || !DepartementName || !GrossSalary) {
                setError("Fill out missing fields");
                setTimeout(() => {
                    setError("");
                }, 4000);
                setSuccess("");
                return;
            }
            setLoading(true);
            const res = await axios.post('http://localhost:4000/department/addDepartment', {
                DepartementCode, DepartementName, GrossSalary
            },  { withCredentials: true} );
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
        <div className="bg-gray-200 min-h-screen flex justify-center items-center">
            <div className="bg-white p-3 rounded-lg shadow-2xl w-90">
                <h2 className="text-gray-700 font-bold text-center text-sm">Add Department Portal</h2>

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
                    type="text" onChange={(e) => {
                        setDepartementCode(e.target.value)
                    }} 
                    placeholder="Enter Department code"
                    />
                </div>
                
                <div className="mt-2">
                    <input 
                    className="bg-gray-300 text-xs py-2  w-full p-1 rounded-lg focus:outline-1 focus:outline-gray-500"
                    type="text" onChange={(e) => {
                        setDepartementName(e.target.value)
                    }} 
                    placeholder="Enter Departement Name"
                    />
                </div>
                
                <div className="mt-2">
                    <input 
                    className="bg-gray-300 text-xs py-2 w-full p-1 rounded-lg focus:outline-1 focus:outline-gray-500"
                    type="number" onChange={(e) => {
                        setGrossSalary(e.target.value)
                    }} 
                    placeholder="Enter Gross Salary"
                    />
                </div>

                {/* <div className="mt-4 flex justify-between">
                    <button onClick={handleAddNewEmployee} className="bg-gray-300 py-2 text-xs px-2 rounded-lg font-light hover:bg-gray-400 transition-colors active:bg-gray-500">+ Add new</button>
                    <button className="bg-red-500 text-xs px-2 rounded-lg font-light text-white hover:bg-red-400 transition-colors active:bg-red-500">Back</button>
                </div> */}
              <div className="mt-4">
                    <button onClick={handleAddNewDepartment} className="w-full bg-gray-300 py-2 text-xs px-2 rounded-lg font-light hover:bg-gray-400 transition-colors active:bg-gray-500">+ Add new</button>
                    <button className="bg-red-500 text-xs px-2 w-full py-2 mt-2 rounded-lg font-light text-white hover:bg-red-400 transition-colors active:bg-red-500">Back</button>
                </div>
            </div>
        </div>
    )
}


export default AddDepartment;