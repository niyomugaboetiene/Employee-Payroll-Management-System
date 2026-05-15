import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
    // employeeNumber, FirstName, LastName, Position, Address, Telephone, Gender, hiredDate, department
    const [employeeNumber, setEmployeeNumber] = useState(0);
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Position, setPosition] = useState("");
    const [Address, setAddress] = useState("");
    const [Gender, setGender] = useState("");
    const [Telephone, setTelephone] = useState("");
    const [hiredDate, setHiredDate] = useState("");
    const [department, setDepartment] = useState("");

    const navigate = useNavigate();

    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const handleAddNewEmployee = async () => {
        try {
            if (!employeeNumber || !FirstName || !LastName || !Position || !Address || !Telephone || !Gender || !hiredDate) {
                setError("Fill out missing fields");
                setTimeout(() => {
                    setError("");
                }, 4000);
                setSuccess("");
                return;
            }
            setLoading(true);
            const res = await axios.post('http://localhost:4000/employee/addEmployee', {
                employeeNumber, FirstName, LastName, Position, Address, Telephone, Gender, hiredDate, department
            },  { withCredentials: true} );
           setLoading(false);
           setError("");
           setSuccess(res.data.message);
          setTimeout(() => {
                setSuccess("");
                navigate('/empList');
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

    const GetDepartment = async () => {
        try {
            setLoading(true);
            const res = await axios.get('http://localhost:4000/department/departmentList');
            setSelectedDepartment(res.data.department);
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        GetDepartment();
    }, []);

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
                <h2 className="text-gray-700 font-bold text-center text-sm">Add Employee Portal</h2>

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
                        setEmployeeNumber(e.target.value)
                    }} 
                    placeholder="Enter Employee Number"
                    />
                </div>
                
                <div className="mt-2">
                    <input 
                    className="bg-gray-300 text-xs py-2  w-full p-1 rounded-lg focus:outline-1 focus:outline-gray-500"
                    type="text" onChange={(e) => {
                        setFirstName(e.target.value)
                    }} 
                    placeholder="Enter First name"
                    />
                </div>
                
                <div className="mt-2">
                    <input 
                    className="bg-gray-300 text-xs py-2 w-full p-1 rounded-lg focus:outline-1 focus:outline-gray-500"
                    type="text" onChange={(e) => {
                        setLastName(e.target.value)
                    }} 
                    placeholder="Enter LastName"
                    />
                </div>

                <div className="mt-2">
                    <input 
                     className="bg-gray-300 text-xs  py-2 w-full p-1 rounded-lg focus:outline-1 focus:outline-gray-500"
                    type="text" onChange={(e) => {
                        setPosition(e.target.value)
                    }} 
                    placeholder="Enter Postion"
                    />
                </div>
                <div className="mt-2">
                    <input 
                    className="bg-gray-300 text-xs py-2 w-full p-1 rounded-lg focus:outline-1 focus:outline-gray-500"
                    type="text" onChange={(e) => {
                        setAddress(e.target.value)
                    }} 
                    placeholder="Enter Address"
                    />
                </div>
                
                <div className="mt-2">
                    <input 
                    className="bg-gray-300 text-xs py-2  w-full p-1 rounded-lg focus:outline-1 focus:outline-gray-500"
                    type="text" onChange={(e) => {
                        setTelephone(e.target.value)
                    }} 
                    placeholder="Enter Telephone"
                    />
                </div>
                <div className="mt-2">
                    <input 
                   className="bg-gray-300 text-xs py-2  w-full p-1 rounded-lg focus:outline-1 focus:outline-gray-500"
                    type="text" onChange={(e) => {
                        setGender(e.target.value)
                    }} 
                    placeholder="Enter Gender"
                    />
                </div>
                
                <div className="mt-2">
                    <input 
                    className="bg-gray-300 text-xs py-2 w-full p-1 rounded-lg focus:outline-1 focus:outline-gray-500"
                    type="date" onChange={(e) => {
                        setHiredDate(e.target.value)
                    }} 
                    />
                </div>
                
                <div className="mt-2">
                    <select 
                     className="bg-gray-300 text-xs py-2  w-full p-1 rounded-lg focus:outline-1 focus:outline-gray-500"
                    type="text" onChange={(e) => {
                        setDepartment(e.target.value)
                    }} 
                    >
                      {selectedDepartment?.map((dep, index) => (
                        <>
                          <option>-----Select department-----</option>
                          <option value={dep._id}>{dep.DepartementName}</option>
                        </>
                      ))}    
                    </select>
                </div>

                {/* <div className="mt-4 flex justify-between">
                    <button onClick={handleAddNewEmployee} className="bg-gray-300 py-2 text-xs px-2 rounded-lg font-light hover:bg-gray-400 transition-colors active:bg-gray-500">+ Add new</button>
                    <button className="bg-red-500 text-xs px-2 rounded-lg font-light text-white hover:bg-red-400 transition-colors active:bg-red-500">Back</button>
                </div> */}
              <div className="mt-4">
                    <button onClick={handleAddNewEmployee} className="w-full bg-gray-300 py-2 text-xs px-2 rounded-lg font-light hover:bg-gray-400 transition-colors active:bg-gray-500">+ Add new</button>
                    <button className="bg-red-500 text-xs px-2 w-full py-2 mt-2 rounded-lg font-light text-white hover:bg-red-400 transition-colors active:bg-red-500" onClick={() => navigate(-1)}>Back</button>
                </div>
            </div>
        </div>
    )
}


export default AddEmployee