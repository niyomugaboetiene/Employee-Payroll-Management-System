import { useState } from "react";
import axios from "axios";

const UpdateEmployee = () => {
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

    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const 

    const handleUpdateEmployee = async () => {
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:4000/employee/addEmployee', {
                employeeNumber, FirstName, LastName, Position, Address, Telephone, Gender, hiredDate, department
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
                    <input 
                     className="bg-gray-300 text-xs py-2  w-full p-1 rounded-lg focus:outline-1 focus:outline-gray-500"
                    type="text" onChange={(e) => {
                        setDepartment(e.target.value)
                    }} 
                    placeholder="Enter department"
                    />
                </div>

                {/* <div className="mt-4 flex justify-between">
                    <button onClick={handleAddNewEmployee} className="bg-gray-300 py-2 text-xs px-2 rounded-lg font-light hover:bg-gray-400 transition-colors active:bg-gray-500">+ Add new</button>
                    <button className="bg-red-500 text-xs px-2 rounded-lg font-light text-white hover:bg-red-400 transition-colors active:bg-red-500">Back</button>
                </div> */}
              <div className="mt-4">
                    <button onClick={handleUpdateEmployee} className="w-full bg-gray-300 py-2 text-xs px-2 rounded-lg font-light hover:bg-gray-400 transition-colors active:bg-gray-500">Update</button>
                    <button className="bg-red-500 text-xs px-2 w-full py-2 mt-2 rounded-lg font-light text-white hover:bg-red-400 transition-colors active:bg-red-500">Back</button>
                </div>
            </div>
        </div>
    )
}


export default UpdateEmployee;