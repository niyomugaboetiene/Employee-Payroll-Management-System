import AddEmployee from "./pages/employee/AddEmployee"
import AddDepartment from "./pages/department/AddDepartment"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/AddEmployee" element={<AddEmployee />} />
              <Route path="/AddDepartment" element={<AddDepartment />} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
