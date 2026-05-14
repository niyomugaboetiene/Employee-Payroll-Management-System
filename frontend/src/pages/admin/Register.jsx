import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    // username, password
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            if (!username || !password) {
                setError("Fill out missing fields");
                setTimeout(() => {
                    setError("");
                }, 4000);
                setSuccess("");
                return;
            }
            setLoading(true);
            const res = await axios.post("http://localhost:4000/admin/login", {
                username, password
            }, { withCredentials: true });
           setLoading(false);
           setSuccess(res.data.message);
          setTimeout(() => {
                setSuccess("");
         }, 4000);
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.message || "Error occurred";
            if (errorMessage === "Enter valid username") {
                setError("Enter valid username");
            }

            if (errorMessage === "Incorrect password") {
                setError("Incorrect password");
            }

          setTimeout(() => {
               setError("");
         }, 4000);
            setSuccess("");
        }
    }


    return (
        <div className="bg-gray-200 min-h-screen flex justify-center items-center">
            <div className="bg-white p-3 rounded-lg shadow-2xl w-90">
                <h2 className="text-gray-700 font-bold text-center text-sm">Login Portal</h2>

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
                        setUsername(e.target.value)
                    }} 
                    placeholder="Enter username"
                    />
                </div>
                
                <div className="mt-2">
                    <input 
                    className="bg-gray-300 text-xs py-2  w-full p-1 rounded-lg focus:outline-1 focus:outline-gray-500"
                    type="password" onChange={(e) => {
                        setPassword(e.target.value)
                    }} 
                    placeholder="Enter password"
                    />
                </div>
                
                {/* <div className="mt-4 flex justify-between">
                    <button onClick={handleAddNewEmployee} className="bg-gray-300 py-2 text-xs px-2 rounded-lg font-light hover:bg-gray-400 transition-colors active:bg-gray-500">+ Add new</button>
                    <button className="bg-red-500 text-xs px-2 rounded-lg font-light text-white hover:bg-red-400 transition-colors active:bg-red-500">Back</button>
                </div> */}
              <div className="mt-4">
                    <button onClick={handleLogin} className="w-full bg-gray-300 py-2 text-xs px-2 rounded-lg font-light hover:bg-gray-400 transition-colors active:bg-gray-500">Login</button>
                    <button className="bg-gray-400 text-xs px-2 w-full py-2 mt-2 rounded-lg font-light text-white hover:bg-gray-500 transition-colors active:bg-gray-400" onClick={() => navigate('/admin/register')}>register</button>
                </div>
            </div>
        </div>
    )
}


export default Register;