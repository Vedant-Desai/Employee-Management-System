import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth-context";

const Employee = () => {
  const [empData, setEmpData] = useState([]);
  const { authToken } = useAuth();

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const response = await fetch(
          `${window.location.origin}/api/auth/user`,
          {
            method: "GET",
            headers: {
              Authorization: authToken,
            },
          }
        );

        if (response.status === 200) {
          // alert("Data fetched successfully");
          const empData = await response.json();
          setEmpData(empData.userData);
          console.log(empData.userData);
        }
      } catch (error) {
        console.log(`Error in fetching data : ${error}`);
      }
    };
    getEmployees();
    // eslint-disable-next-line
  }, []);

  return (
    <section className="users-section">
      <div className="container">
        <h5>Employe Detail</h5>
      </div>
      <div className="container users">
        <table>
          <thead>
            <tr className="emp-row">
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Location</th>
              <th>Role</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {/* {empData.map((emp) => {
              return (
                <tr className="emp-row" key={emp._id}>
                  <td>{emp.userName}</td>
                  <td>{emp.email}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.location}</td>
                  <td>{emp.isManager === true ? "Manager" : "Employee"}</td>
                  <td>{emp.department}</td>
                </tr>
              );
            })} */}
            <tr className="emp-row" key={empData._id}>
              <td>{empData.userName}</td>
              <td>{empData.email}</td>
              <td>{empData.phone}</td>
              <td>{empData.location}</td>
              <td>{empData.isManager === true ? "Manager" : "Employee"}</td>
              <td>{empData.department}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Employee;
