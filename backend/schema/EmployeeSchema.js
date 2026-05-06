import mongoose from "mongoose";
import connect from "../db/connection.js";

connect();

const EmployeeSchema = mongoose.Schema({
    employeeNumber: { type: Number, unique: true, required: true },
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Position: { type: String, required: true },
    Address: { type: String, required: true },
    Telephone: { type: String , required: true },
    Gender: { type: String, required: true },
    hiredDate: { type: Date, required: true },
}, { timestamps: true });

mongoose.model("employees", EmployeeSchema);