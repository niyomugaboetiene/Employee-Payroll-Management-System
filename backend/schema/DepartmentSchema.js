import mongoose from "mongoose";
import connection from "../db/connection.js";

connection();

const DepartmentSchema = mongoose.Schema({
    DepartementCode: { type: String, required: true, unique: true },
    DepartementName: { type: String, required: true },
    GrossSalary: { type: Number, required: true },
}, { timestamps: true });

const Department = mongoose.model("departments", DepartmentSchema);

export default Department;