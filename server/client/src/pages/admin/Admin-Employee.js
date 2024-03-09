import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useAuth } from "../../store/auth-context";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AdminEmployee = () => {
  const [empData, setEmpData] = useState([]);
  const [locationFilter, setLocationFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const { authToken } = useAuth();

  const getFilteredEmployees = async () => {
    try {
      let apiUrl = `${window.location.origin}/api/employee/all-emp`;

      // Add filters to the API URL if they are set
      if (locationFilter || nameFilter) {
        apiUrl = `${window.location.origin}/api/employee/filter-emp?location=${locationFilter}&name=${nameFilter}&sort=userName:${sortOrder}`;
      }

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      });

      if (response.status === 200) {
        const filteredEmpData = await response.json();
        setEmpData(filteredEmpData);
      }
    } catch (error) {
      console.log(`Error in fetching data: ${error}`);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `${window.location.origin}/api/employee/delete-emp/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authToken,
          },
        }
      );

      if (response.status === 200) {
        const empData = await response.json();
        toast.success(empData.message);
      }
      getFilteredEmployees();
    } catch (error) {
      console.log(`Error in fetching data: ${error}`);
    }
  };

  useEffect(() => {
    // Fetch all employees when the component mounts
    getFilteredEmployees();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <section className="admin-users-section">
        <div className="container">
          <h5>Admin Employees Data</h5>
        </div>
        <div className="filter-section">
          <label htmlFor="locationFilter">Filter by Location:</label>
          <input
            type="text"
            id="locationFilter"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />

          <label htmlFor="nameFilter">Filter by Name:</label>
          <input
            type="text"
            id="nameFilter"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />

          <label htmlFor="sortOrder">Sort Order:</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="filter-select"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>

          <button onClick={getFilteredEmployees}>Apply Filters</button>
        </div>
        <div className="container admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Role</th>
                <th>Department</th>
                <th>Edit</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {empData.map((emp) => {
                return (
                  <tr key={emp._id}>
                    <td>{emp.userName}</td>
                    <td>{emp.email}</td>
                    <td>{emp.phone}</td>
                    <td>{emp.location}</td>
                    <td>{emp.isManager === true ? "Manager" : "Employee"}</td>
                    <td>{emp.department}</td>
                    <td>
                      <Link to={`/admin/employee/edit-emp/${emp._id}`}>
                        <Button variant="contained" color="success">
                          Edit
                        </Button>
                      </Link>
                    </td>
                    <td>
                      <Button
                        onClick={() => deleteUser(emp._id)}
                        variant="contained"
                        color="error"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default AdminEmployee;
