import axios from "axios";
import { useState, useEffect } from "react";

const handleGetEmployee = () => {
    const [employee, setEmployee] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleGetEmployee = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get('http://localhost:4000/employee/employeeList');
            setIsLoading(false);

        }
    }
}