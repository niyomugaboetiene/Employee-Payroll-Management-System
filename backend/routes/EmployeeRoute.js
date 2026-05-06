import express from "express";
import Employee from "../schema/EmployeeSchema.js";

const router = express.Router();

router.post('/addEmployee', async (req, res) => {
    try {
        const { employeeNumber, FirstName, LastName, Position, Address, Telephone, Gender, hiredDate } = req.body;  

        if (!employeeNumber || !FirstName || !LastName || !Position || !Address || !Telephone || !Gender || !hiredDate) {
            return res.status(403).json({ message: 'Fill some missing fields' });
        }

        const newEmployee = await Employee.create({
            employeeNumber, FirstName, LastName, Position, Address, Telephone, Gender, hiredDate
        });

        return res.status(201).json({ message: 'Employee added succesfully', employee: newEmployee });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


export default router;