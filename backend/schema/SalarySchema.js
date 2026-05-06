import mongoose from "mongoose";
import connect from "../db/connection.js";

connect();

const SalarySchema = mongoose.Schema({
    GlossSalary: { type: Number, required: true },
    TotalDeduction: { type: Number, required: true },
    NetSalary: { type: Number, required: true },
    month: { type: Date, required: true },
}, { timestamps: true });

mongoose.model("salaries", SalarySchema);