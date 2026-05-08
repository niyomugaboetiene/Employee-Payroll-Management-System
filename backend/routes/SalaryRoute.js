import express from "express";
import Salary from "../schema/SalarySchema.js";

const router = express.Router();

router.post('/addSalary', async (req, res) => {
    try {
        const { GlossSalary, TotalDeduction, month, employee } = req.body;  

        if (!GlossSalary || !TotalDeduction || !month || !employee) {
            return res.status(403).json({ message: 'Fill some missing fields' });
        }

        const NetSalary = Number(GlossSalary) - Number(TotalDeduction);

        const newSalary = await Salary.create({
            GlossSalary, TotalDeduction, NetSalary, month, employee
        });

        return res.status(201).json({ message: 'Salary added succesfully', salary: newSalary });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/salaryList', async (req, res) => {
    try {
        const List = await Salary.find().populate("employees");

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

        const List = await Salary.findById(_id).populate("employees");
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
    
        const { GrossSalary, TotoalDeduction,  month, employee  } = req.body;  
     
        let fieldToBeUpdated = {};

        if (GrossSalary) fieldToBeUpdated.GrossSalary = GrossSalary;
        if (TotoalDeduction) fieldToBeUpdated.TotoalDeduction = TotoalDeduction;

        if (GrossSalary && TotoalDeduction) {
            const NetSalary = GrossSalary - TotoalDeduction;
            fieldToBeUpdated.NetSalary = NetSalary;
        }
        if (month) fieldToBeUpdated.month = Gender;
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

export default router;