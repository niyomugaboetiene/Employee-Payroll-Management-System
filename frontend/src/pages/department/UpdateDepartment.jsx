import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateDepartment = () => {
    // DepartementCode, DepartementName, GrossSalary 
    const [DepartementCode, setDepartementCode] = useState("");
    const [DepartementName, setDepartementName] = useState("");
    const [GrossSalary, setGrossSalary] = useState("");

    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { _id } = useParams();


    const GetCurrentDepartment = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`http://localhost:4000/department/get/${_id}`);
            const departments = res.data?.department;
            setDepartementCode(departments.DepartementCode);
            setDepartementName(departments.DepartementName);
            setGrossSalary(departments.GrossSalary);
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        GetCurrentDepartment();
    }, [_id]);
    
    const handleUpdateDepartment = async () => {
        try {
            setLoading(true);
            const res = await axios.put(`http://localhost:4000/department/update/${_id}`, {
                DepartementCode, DepartementName, GrossSalary
            });
           setLoading(false);
           setError("");
           setSuccess(res.data.message);
          setInterval(() => {
                    setSuccess("");
         }, 4000);
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
                <h2 className="text-gray-700 font-bold text-center text-sm">Update Department Portal</h2>

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
                    value={DepartementCode}
                     className="bg-gray-300 text-xs py-2  w-full p-1 rounded-lg focus:outline-1 focus:outline-gray-500"
                    type="text" onChange={(e) => {
                        setDepartementCode(e.target.value)
                    }} 
                    placeholder="Enter Department code"
                    />
                </div>
                
                <div className="mt-2">
                    <input 
                    value={DepartementName}
                    className="bg-gray-300 text-xs py-2  w-full p-1 rounded-lg focus:outline-1 focus:outline-gray-500"
                    type="text" onChange={(e) => {
                        setDepartementName(e.target.value)
                    }} 
                    placeholder="Enter Departement Name"
                    />
                </div>
                
                <div className="mt-2">
                    <input 
                    value={GrossSalary}
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
                    <button onClick={handleUpdateDepartment} className="w-full bg-gray-300 py-2 text-xs px-2 rounded-lg font-light hover:bg-gray-400 transition-colors active:bg-gray-500">Update</button>
                    <button className="bg-red-500 text-xs px-2 w-full py-2 mt-2 rounded-lg font-light text-white hover:bg-red-400 transition-colors active:bg-red-500">Back</button>
                </div>
            </div>
        </div>
    )
}


export default UpdateDepartment;