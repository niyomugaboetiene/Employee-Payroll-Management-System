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

router.get('/departmentList', async (req, res) => {
    try {
        const List = await Department.find();

        if (List.length === 0) {
            return res.status(404).json({ message: 'No department in the database'})
        }

        return res.status(200).json({
            message: 'Department list',
            department: List
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

        const List = await Department.findById(_id);
        // Employee.find({ employeeNumber: employeeNumber });
        // Employee.findOne({ _id: _id });

        return res.status(200).json({ message: 'Department', department: List });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });      
    }
});

router.put('/update/:_id', async (req, res) => {
    try{
        const _id = req.params._id;
    
        const {DepartmentCode, DepartmentName, GrossSalary } = req.body;  
     
        let fieldToBeUpdated = {};

        if (DepartmentCode) fieldToBeUpdated.DepartmentCode = DepartmentCode;
        if (DepartmentName) fieldToBeUpdated.DepartmentName = DepartmentName;
        if (GrossSalary) fieldToBeUpdated.GrossSalary = GrossSalary;

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