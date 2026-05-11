import AddEmployee from "./pages/employee/AddEmployee"
import AddDepartment from "./pages/department/AddDepartment"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AddSalary from "./pages/salary/AddSalary"
import EmployeeList from "./pages/employee/EmployeeList"
import UpdateEmployee from "./pages/employee/UpdateEmployee"
import DepartmentList from "./pages/department/DepartmentLIst"
import UpdateDepartment from "./pages/department/UpdateDepartment"
import SalaryList from "./pages/salary/SalaryList"

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/AddEmployee" element={<AddEmployee />} />
              <Route path="/AddDepartment" element={<AddDepartment />} />
              <Route path="/AddSalary" element={<AddSalary />} />
              <Route path="/employeeList" element={<EmployeeList />} />
              <Route path="/employee/update/:_id" element={<UpdateEmployee />} />
              <Route path="/department/departmentList" element={<DepartmentList />}/>
              <Route path="/department/update/:_id" element={<UpdateDepartment />}/>
              <Route path="/salary/SalaryList" element={<UpdateDepartment />}/>

          </Routes>
      </BrowserRouter>
  )
}

export default App
