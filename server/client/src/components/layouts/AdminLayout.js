import React from "react";
import { NavLink, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../store/auth-context";

const AdminLayout = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  console.log("User data", user.isManager);

  if (!user.isManager) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <header>
        <div className="container">
          <nav>
            <ul>
              <li>
                <NavLink to="employee">Employees</NavLink>
              </li>
              <li>
                <NavLink to="department">Departments</NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <Outlet />
      </header>
    </>
  );
};

export default AdminLayout;
