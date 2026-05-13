import express from "express";
import Salary from "../schema/SalarySchema.js";
import Employee from "../schema/EmployeeSchema.js";
import Department from "../schema/DepartmentSchema.js";

const router = express.Router();

router.post('/addSalary', async (req, res) => {
    try {
        const { GlossSalary, TotalDeduction, month, employee, department } = req.body;  

        // console.log("Received fields", "GrossSalary", GlossSalary, "Total deduction", TotalDeduction, "Month", month, "employee", employee);

        if (!GlossSalary || !TotalDeduction || !month || !employee || !department) {
            return res.status(403).json({ message: 'Fill some missing fields' });
        }

        const NetSalary = Number(GlossSalary) - Number(TotalDeduction);

        const newSalary = await Salary.create({
            GlossSalary, TotalDeduction, NetSalary, month, employee, department
        });

        return res.status(201).json({ message: 'Salary added succesfully', salary: newSalary });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/salaryList', async (req, res) => {
    try {
        const List = await Salary.find().populate("employee");

        if (List.length === 0) {
            return res.status(404).json({ message: 'No salary in the database'})
        }

        return res.status(200).json({
            message: 'Salary list',
            salary: List
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

        const List = await Salary.findById(_id).populate("employee");
        // Employee.find({ employeeNumber: employeeNumber });
        // Employee.findOne({ _id: _id });

        return res.status(200).json({ message: 'Salary', salary: List });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });      
    }
});

router.put('/update/:_id', async (req, res) => {
    try{
        const _id = req.params._id;
    
        const { GlossSalary, TotalDeduction,  month, employee, department  } = req.body;  
     
        let fieldToBeUpdated = {};

        if (GlossSalary) fieldToBeUpdated.GlossSalary = GlossSalary;
        if (TotalDeduction) fieldToBeUpdated.TotalDeduction = TotalDeduction;
        if (department) fieldToBeUpdated.department = department;

        if (TotalDeduction || GlossSalary) {
            const NetSalary = GlossSalary - TotalDeduction;
            fieldToBeUpdated.NetSalary = NetSalary;
        }
        if (month) fieldToBeUpdated.month = month;
        if (employee) fieldToBeUpdated.employee = employee;

        const updatedSalary = await Salary.findByIdAndUpdate(_id, fieldToBeUpdated);

        return res.status(200).json({ message:'Updated salary', updated: updatedSalary });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });      
    }
});

router.delete('/delete/:_id', async(req, res) => {
    try {
        const _id = req.params._id;
        // const { _id } = req.params;

        await Salary.findByIdAndDelete(_id);
        return res.status(200).json({ message: 'Salary deleted succesfully'})

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error'})
    }
});

// montly paylor
router.get('/montly', async (req, res) => {
    try {
         const { month } = req.query;

         const montlyResult = await Salary.find({ month: month }).populate("employee").populate("department");

         if (montlyResult.length === 0) {
             res.status(404).json({ message: 'No paylor found on this month' });
             return;
         }

         return res.status(200).json({ message: 'Monthly paylor result', result: montlyResult });
    } catch (err) {
        console.error(err);
    }
});

router.get('/recentEmployee', async (req, res) => {
    try {
         const recentEmployee = await Employee.find().sort({ createdAt: -1 }).limit(5).populate("department");
         return res.status(200).json({ message: 'Recent employee', recent: recentEmployee });
    } catch (err) {
          console.error(err);
    }
});

router.get('/recentDepartment', async (req, res) => {
    try {
         const recentDepartment = await Department.find().sort({ createdAt: -1 }).limit(5);
         return res.status(200).json({ message: 'Recent department', recent: recentDepartment });
    } catch (err) {
          console.error(err);
    }
});

router.get('/recentSalary', async (req, res) => {
    try {
         const recentSalary = await Salary.find().sort({ createdAt: -1 }).limit(5);
         return res.status(200).json({ message: 'Recent salary', recent: recentSalary }).populate("employee");
    } catch (err) {
          console.error(err);
    }
});
export default router;