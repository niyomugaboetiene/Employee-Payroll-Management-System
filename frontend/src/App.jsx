import AddEmployee from "./pages/employee/AddEmployee"
import AddDepartment from "./pages/department/AddDepartment"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AddSalary from "./pages/salary/AddSalary"
import EmployeeList from "./pages/employee/EmployeeList"
import UpdateEmployee from "./pages/employee/UpdateEmployee"


function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/AddEmployee" element={<AddEmployee />} />
              <Route path="/AddDepartment" element={<AddDepartment />} />
              <Route path="/AddSalary" element={<AddSalary />} />
              <Route path="/employeeList" element={<EmployeeList />} />
              <Route path="/employee/update/:_id" element={<UpdateEmployee />} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
