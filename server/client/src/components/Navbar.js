import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth-context";
import "./Navbar.css";

import React from "react";

const Navbar = () => {
  const { isLoggedIn, isLoading, user } = useAuth();
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <header>
      <div className="container">
        <div className="logo-brand">
          <h1 className="logo">
            <NavLink to="/">React App</NavLink>
          </h1>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>

            {isLoggedIn ? (
              <>
                <li>
                  <NavLink to={"/employee"}>Employees</NavLink>
                </li>
                {user && user.isManager && (
                  <li>
                    <NavLink to={"/admin"}>Admin</NavLink>
                  </li>
                )}

                <li>
                  <NavLink to={"/logout"}>Logout</NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to={"/login"}>Login</NavLink>
                </li>
                <li>
                  <NavLink to={"/register"}>Register</NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
