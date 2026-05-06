import { useState } from "react";
import axios from "axios";

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

    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleAddNewEmployee = async () => {
        try {
            if (!employeeNumber || !FirstName || !LastName || !Position || !Address || !Telephone || !Gender || !hiredDate) {
                setError("Fill out missing fields");
                setSuccess("");
                return;
            }
            setLoading(true);
            const res = await axios.post('http://localhost:4000/employee/addEmployee', {
                employeeNumber, FirstName, LastName, Position, Address, Telephone, Gender, hiredDate, department
            });
           setLoading(false);
           setSuccess(res.data.message);
           setError("");
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.message || "Error occurred";
            setError(errorMessage);
            setSuccess("");
        }
    }


    return (
        <div>
            <div>
                <h2>Add Employee Portal</h2>

                {success && (
                    <p>{success}</p>
                )}
                {error && (
                    <p>{error}</p>
                )}
                <div>
                    <input 
                    type="number" onChange={(e) => {
                        setEmployeeNumber(e.target.value)
                    }} 
                    placeholder="Enter Employee Number"
                    />
                </div>
                
                <div>
                    <input 
                    type="text" onChange={(e) => {
                        setFirstName(e.target.value)
                    }} 
                    placeholder="Enter First name"
                    />
                </div>
                
                <div>
                    <input 
                    type="text" onChange={(e) => {
                        setLastName(e.target.value)
                    }} 
                    placeholder="Enter LastName"
                    />
                </div>
                {/*     // employeeNumber, FirstName, LastName, Position, Address, Telephone, Gender, hiredDate, department */}

                <div>
                    <input 
                    type="text" onChange={(e) => {
                        setPosition(e.target.value)
                    }} 
                    placeholder="Enter Postion"
                    />
                </div>
                <div>
                    <input 
                    type="text" onChange={(e) => {
                        setAddress(e.target.value)
                    }} 
                    placeholder="Enter Address"
                    />
                </div>
                
                <div>
                    <input 
                    type="text" onChange={(e) => {
                        setTelephone(e.target.value)
                    }} 
                    placeholder="Enter Telephone"
                    />
                </div>
                <div>
                    <input 
                    type="text" onChange={(e) => {
                        setGender(e.target.value)
                    }} 
                    placeholder="Enter Gender"
                    />
                </div>
                
                <div>
                    <input 
                    type="date" onChange={(e) => {
                        setHiredDate(e.target.value)
                    }} 
                    />
                </div>
                
                <div>
                    <input 
                    type="text" onChange={(e) => {
                        setDepartment(e.target.value)
                    }} 
                    placeholder="Enter department"
                    />
                </div>

                <button onClick={handleAddNewEmployee}>+ Add new</button>
            </div>
        </div>
    )
}


export default AddEmployee