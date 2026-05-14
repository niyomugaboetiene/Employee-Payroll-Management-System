import express from "express";
import Department from "../schema/DepartmentSchema.js";
import Employee from "../schema/EmployeeSchema.js";
import Salary from "../schema/SalarySchema.js";

const router = express.Router();

function IsAuthorized (req, res, next) {
       try {
        if (req.session.admin) {
            next();
        } 

        return res.status(401).json({ message: 'You are not authorized' });
       } catch (err) {
        console.error(err);
       }
}

router.post('/addDepartment', IsAuthorized, async (req, res) => {
    try {
        const { DepartementCode, DepartementName, GrossSalary } = req.body;  

        if (!DepartementCode || !DepartementName || !GrossSalary) {
            return res.status(403).json({ message: 'Fill some missing fields' });
        }

        console.log("DepartementCode", DepartementCode);

        const newDepartment = await Department.create({
            DepartementCode, DepartementName, GrossSalary
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
    
        const {DepartementCode, DepartementName, GrossSalary } = req.body;  
     
        let fieldToBeUpdated = {};

        if (DepartementCode) fieldToBeUpdated.DepartementCode = DepartementCode;
        if (DepartementName) fieldToBeUpdated.DepartementName = DepartementName;
        if (GrossSalary) fieldToBeUpdated.GrossSalary = GrossSalary;

        const updatedDepartment = await Department.findByIdAndUpdate(_id, fieldToBeUpdated, { returnDocument: 'after' });

        return res.status(200).json({ message:'Updated Department', updated: updatedDepartment });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });      
    }
});

router.delete('/delete/:_id', async(req, res) => {
    try {
        const _id = req.params._id;
        // const { _id } = req.params;

        await Department.findByIdAndDelete(_id);
        return res.status(200).json({ message: 'Employee deleted succesfully'})

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error'})
    }
});


router.get('/total', async (req, res) => {
    try {
        const totalDepartment = await Department.countDocuments();
        const totalEmployee = await Employee.countDocuments();
        const total = await Salary.find();

        const totalPayroll = total.reduce((total, salary) => {
            return total + salary.NetSalary;
        }, 0);

        return res.status(200).json({ payroll: totalPayroll, department: totalDepartment, employee: totalEmployee });
    }  catch (err) {
        console.error("ERROR", err);
    }
});

export default router;