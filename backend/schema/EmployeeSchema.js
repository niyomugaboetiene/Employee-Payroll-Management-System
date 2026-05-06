import mongoose from "mongoose";
import connection from "../db/connection.js";

connection();

const EmployeeSchema = mongoose.Schema({
    employeeNumber: { type: Number, required: true, unique: true },
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Position: { type: String, required: true },
    Address: { type: String, required: true },
    Telephone: { type: String, required: true },
    Gender: { type: String, required: true },
    hiredDate: { type: Date, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: "departments" }
}, { timestamps: true });

const Employee = mongoose.model("employees", EmployeeSchema);
export default Employee;