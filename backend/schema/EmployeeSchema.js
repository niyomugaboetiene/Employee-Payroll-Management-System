import mongoose from "mongoose";
import connect from "../db/connection.js";

connect();

const EmployeeSchema = mongoose.Schema({
    employeeNumber: { type: Number, }
})