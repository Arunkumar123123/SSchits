import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import axios from "axios";
import { Unauthorized } from "./components/helper/HelperTwo";
import { ProtectedRoute } from "./components/helper/HelperOne";
import Test from "./components/test/Test";
import RoleCreate from "./components/admin/role/RoleCreate";
import {
  employeePermission,
  roleCreatePermission,
} from "./components/helper/HelperThree";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Employee from "./components/admin/employee/Employee";
import Roles from "./components/admin/role/Role";
import RoleAssign from "./components/admin/roleAssign/RoleAssign";
import ForgetPassword from "./components/auth/ForgetPassword";
import ResetPassword from "./components/auth/ResetPassword";
import EmployeeDesignation from "./components/admin/Masters/EmployeeDesignation/EmployeeDesignation";
import EmployeeDepartment from "./components/admin/Masters/EmployeeDepartment/EmployeeDepartment";
import Dashboard from "./components/admin/dashboard/Dashboard";
import Customer from "./components/admin/customer/Customer";
import Plan from "./components/admin/plan/Plan";






axios.defaults.baseURL = "http://localhost/arun/laravel/lRamChits/";


function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/crm/" element={<Login />} />
        <Route path="/crm/forgot/password" element={<ForgetPassword />} />
        <Route path="/crm/reset/password/:id" element={<ResetPassword />} />
        
        <Route path="/crm/dashboard" element={<Dashboard />} />
        <Route path="/crm/customer" element={<Customer />} />
        <Route path="/crm/plan" element={<Plan />} />
        <Route
          path="/crm/employees"
          element={
            <ProtectedRoute
              element={<Employee />}
              allowed={employeePermission()}
            />
          }
        />
        
         
        
      
       
        
        
        <Route
          path="/crm/roles"
          element={
            <ProtectedRoute
              element={<Roles />}
              allowed={roleCreatePermission()}
            />
          }
        />
        <Route
          path="/crm/roles/assign"
          element={
            <ProtectedRoute
              element={<RoleAssign />}
              allowed={roleCreatePermission()}
            />
          }
        />
        <Route
          path="/crm/employee/designation"
          element={
            <ProtectedRoute
              element={<EmployeeDesignation />}
              allowed={employeePermission()}
            />
          }
        />
        <Route
          path="/crm/employee/department"
          element={
            <ProtectedRoute
              element={<EmployeeDepartment />}
              allowed={employeePermission()}
            />
          }
        />
       
       
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/role/create" element={<RoleCreate />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  );
}

export default App;
