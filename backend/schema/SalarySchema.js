import mongoose from "mongoose";
import connection from "../db/connection.js";

connection();

const SalarySchema = mongoose.Schema({
    GlossSalary: { type: Number, required: true },
    TotalDeduction: { type: Number, required: true },
    NetSalary: { type: Number, required: true },
    month: { type: String, required: true },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "employees" },
    department: { type: mongoose.Schema.Types.ObjectId, ref: "departments" }
}, { timestamps: true });

const Salary = mongoose.model("salaries", SalarySchema);

export default Salary;