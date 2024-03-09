import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth-context";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminEmployeeUpdate = () => {
  const initialUserData = {
    userName: "",
    email: "",
    phone: "",
    location: "",
    isManager: false,
    department: "dept1",
  };

  const [userData, setUserData] = useState(initialUserData);
  const [departments, setDepartments] = useState([]);

  const { authToken } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data and department options from your server
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch(
          `${window.location.origin}/api/employee/get-emp/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: authToken,
            },
          }
        );

        if (userResponse.status === 200) {
          const userData = await userResponse.json();
          setUserData(userData);
        }

        const departmentsResponse = await fetch(
          `${window.location.origin}/api/department/all-dept`,
          {
            method: "GET",
            headers: {
              Authorization: authToken,
            },
          }
        );

        if (departmentsResponse.status === 200) {
          const departmentOptions = await departmentsResponse.json();
          setDepartments(departmentOptions);
        }
      } catch (error) {
        console.log(
          `Error in fetching Employee and Department Data : ${error}`
        );
      }
    };
    fetchUserData();
  }, [id, authToken]);

  const handleRoleChange = (e) => {
    setUserData({ ...userData, isManager: e.target.value });
  };

  const handleDepartmentChange = (e) => {
    setUserData({ ...userData, department: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send updated user data to the server
    try {
      const response = await fetch(
        `${window.location.origin}/api/employee/update-emp/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken,
          },
          body: JSON.stringify(userData),
        }
      );
      console.log("This is user data", userData);
      if (response.status === 200) {
        const data = await response.json();
        toast.success(data.message);
        navigate("/admin/employee");
      }
    } catch (error) {
      toast.error(`Error in Updating data : ${error}`);
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-form">
                <h1 className="main-heading mb-3">Update Employee</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label>Username</label>
                    <input type="text" value={userData.userName} />
                  </div>
                  <div>
                    <label>Email</label>
                    <input type="text" value={userData.email} />
                  </div>
                  <div>
                    <label>Phone</label>
                    <input type="text" value={userData.phone} />
                  </div>
                  <div>
                    <label>Location</label>
                    <input type="text" value={userData.location} />
                  </div>
                  <div>
                    <label>Role:</label>
                    <select
                      value={userData.isManager}
                      onChange={handleRoleChange}
                    >
                      <option value="false">Employee</option>
                      <option value="true">Manager</option>
                    </select>
                  </div>
                  <div>
                    <label>Department:</label>
                    <select
                      value={userData.department}
                      onChange={handleDepartmentChange}
                    >
                      <option value={null}>----Select Department----</option>
                      {departments.map((department) => (
                        <>
                          <option
                            key={department._id}
                            value={department.departmentName}
                          >
                            {department.departmentName}
                          </option>
                        </>
                      ))}
                    </select>
                  </div>
                  <div>
                    <button type="submit">Update Profile</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default AdminEmployeeUpdate;
