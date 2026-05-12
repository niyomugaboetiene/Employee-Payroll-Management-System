// import AddEmployee from "./pages/employee/AddEmployee"
// import AddDepartment from "./pages/department/AddDepartment"
// import { BrowserRouter, Routes, Route } from "react-router-dom"
// import AddSalary from "./pages/salary/AddSalary"
// import EmployeeList from "./pages/employee/EmployeeList"
// import UpdateEmployee from "./pages/employee/UpdateEmployee"
// import DepartmentList from "./pages/department/DepartmentLIst"
// import UpdateDepartment from "./pages/department/UpdateDepartment"
// import SalaryList from "./pages/salary/SalaryList"
// import UpdateSalary from "./pages/salary/UpdateSalary"

import { BrowserRouter, Routes, Route } from "react-router-dom"
import ListComponent from "./pages/employee/List"
import AddEmployee from "./pages/employee/AddEmployee"

function App() {

  return (
      // <BrowserRouter>
      //     <Routes>
      //         <Route path="/AddEmployee" element={<AddEmployee />} />
      //         <Route path="/AddDepartment" element={<AddDepartment />} />
      //         <Route path="/AddSalary" element={<AddSalary />} />
      //         <Route path="/employeeList" element={<EmployeeList />} />
      //         <Route path="/employee/update/:_id" element={<UpdateEmployee />} />
      //         <Route path="/department/departmentList" element={<DepartmentList />}/>
      //         <Route path="/department/update/:_id" element={<UpdateDepartment />}/>
      //         <Route path="/salary/SalaryList" element={<SalaryList />}/>
      //         <Route path="/salary/update/:_id" element={<UpdateSalary />}/>

      //     </Routes>
      // </BrowserRouter>

    <BrowserRouter>
        <Routes>
            <Route path="/AddEmployee" element={<AddEmployee />} />
            <Route path="/empList" element={<ListComponent />}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
