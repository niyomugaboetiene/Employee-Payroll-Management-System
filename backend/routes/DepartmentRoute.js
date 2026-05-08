import express from "express";
import Department from "../schema/DepartmentSchema.js";

const router = express.Router();

router.post('/addDepartment', async (req, res) => {
    try {
        const { DepartmentCode, DepartmentName, GrossSalary } = req.body;  

        if (!DepartmentCode || !DepartmentName || !GrossSalary) {
            return res.status(403).json({ message: 'Fill some missing fields' });
        }

        const newDepartment = await Department.create({
            DepartmentCode, DepartmentName, GrossSalary
        });

        return res.status(201).json({ message: 'Department added succesfully', department: newDepartment });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/employeeList', async (req, res) => {
    try {
        const List = await Employee.find().populate("departments");

        if (List.length === 0) {
            return res.status(404).json({ message: 'No employee in the database'})
        }

        return res.status(200).json({
            message: 'Employees list',
            employee: List
        });
    } catch (err) {
         console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/get/:_id', async (req, res) => {
    try {
        const _id = req.params._id;

        if (!_id) {
            return res.status(403).json({ message: 'Id is required' });
        }

        const Employees = await Employee.findById(_id).populate("departments");
        // Employee.find({ employeeNumber: employeeNumber });
        // Employee.findOne({ _id: _id });

        return res.status(200).json({ message: 'Employee', employee: Employees });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });      
    }
});

router.put('/update/:_id', async (req, res) => {
    try{
        const _id = req.params._id;
    
        const { employeeNumber, FirstName, LastName, Position, Address, Telephone, Gender, hiredDate, department } = req.body;  
     
        let fieldToBeUpdated = {};

        if (employeeNumber) fieldToBeUpdated.employeeNumber = employeeNumber;
        if (FirstName) fieldToBeUpdated.FirstName = FirstName;
        if (LastName) fieldToBeUpdated.LastName = LastName;
        if (Position) fieldToBeUpdated.Position = Position;
        if (Address) fieldToBeUpdated.Address = Address;
        if (Telephone) fieldToBeUpdated.Telephone = Telephone;
        if (hiredDate) fieldToBeUpdated.hiredDate = hiredDate;
        if (Gender) fieldToBeUpdated.Gender = Gender;
        if (department) fieldToBeUpdated.department = department;

        const updatedEmployee = await Employee.findByIdAndUpdate(_id, fieldToBeUpdated);

        return res.status(200).json({ message:'Updated employee', updated: updatedEmployee });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });      
    }
});

router.delete('/delete/:_id', async(req, res) => {
    try {
        const _id = req.params._id;
        // const { _id } = req.params;

        await Employee.findByIdAndDelete(_id);
        return res.status(200).json({ message: 'Employee deleted succesfully'})

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error'})
    }
});

export default router;