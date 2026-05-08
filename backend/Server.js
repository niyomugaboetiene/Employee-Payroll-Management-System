import express from "express";
import EmployeeRoute from "./routes/EmployeeRoute.js";
import SalaryRuute from './routes/SalaryRoute.js';
import DepartmentRoute from "./routes/DepartmentRoute.js";

import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    // credentials: true
}));

app.use('/employee', EmployeeRoute);
app.use('/salary', SalaryRuute);
app.use('/department', DepartmentRoute);;

app.listen(4000, () => {
    console.log('http://localhost:4000');
});