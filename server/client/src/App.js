import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Employee from "./pages/Employee";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Error from "./pages/Error";
import Logout from "./pages/Logout";
import AdminLayout from "./components/layouts/AdminLayout";
import AdminEmployee from "./pages/admin/Admin-Employee";
import AdminDepartment from "./pages/admin/Admin-Department";
import AdminEmployeeUpdate from "./pages/admin/Admin-Employee-Update";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminEmployee />} />
            <Route path="employee" element={<AdminEmployee />} />
            <Route
              path="employee/edit-emp/:id"
              element={<AdminEmployeeUpdate />}
            />
            <Route path="department" element={<AdminDepartment />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
