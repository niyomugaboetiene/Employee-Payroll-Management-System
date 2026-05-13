import axios from "axios";
import { useState, useEffect } from "react";

const HomePage = () => {
    const [total, setTotal] = useState(null);

    const handleGetTotal = async () => {
          try {
            const res = await axios.get('http://localhost:4000/department/total');
            setTotal(res.data.total);
          } catch (err) {
            console.error(err);
          }
    }

    useEffect(() => {
        handleGetTotal();
    }, []);
    return (
        <div>
            <div className="mt-30 ms-4 text-2xl font-light text-gray-800">
                <h1>Welcome to Employee paylor management system</h1>

                <div>
                    
                </div>
            </div>
        </div>
    )
}

export default HomePage;