import express from "express";
import EmployeeRoute from "./routes/EmployeeRoute.js";
import SalaryRuute from './routes/SalaryRoute.js';
import DepartmentRoute from "./routes/DepartmentRoute.js";
import AdminRouter from "./routes/AdmibRoute.js";

import session from "express-session";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    // credentials: true
}));

app.use(session({
    secret: 'my-secret-key'
}))

app.use('/employee', EmployeeRoute);
app.use('/salary', SalaryRuute);
app.use('/department', DepartmentRoute);;
app.use('/admin', AdminRouter);;

app.listen(4000, () => {
    console.log('http://localhost:4000');
});