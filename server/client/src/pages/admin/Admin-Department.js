import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useAuth } from "../../store/auth-context";
import { toast } from "react-toastify";

const AdminDepartment = () => {
  const [deptData, setDeptData] = useState([]);
  const [newDeptName, setNewDeptName] = useState("");
  const [editDeptName, setEditDeptName] = useState("");
  const [editingDeptId, setEditingDeptId] = useState(null);

  const { authToken } = useAuth();

  const getDepartment = async () => {
    try {
      const response = await fetch(
        `${window.location.origin}/api/department/all-dept`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken,
          },
        }
      );

      if (response.status === 200) {
        const deptData = await response.json();
        setDeptData(deptData);
      }
    } catch (error) {
      console.log(`Error in fetching data: ${error}`);
    }
  };

  const addDepartment = async () => {
    try {
      const response = await fetch(
        `${window.location.origin}/api/department/create-dept`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken,
          },
          body: JSON.stringify({ departmentName: newDeptName }),
        }
      );

      if (response.status === 200) {
        const newDept = await response.json();
        setDeptData((prevDeptData) => [...prevDeptData, newDept]);
        toast.success("Department added successfully!");
        setNewDeptName(""); // Clear the input after adding
      }
    } catch (error) {
      console.log(`Error in adding department: ${error}`);
      toast.error("Error adding department");
    }
  };

  const updateDepartment = async () => {
    try {
      const response = await fetch(
        `${window.location.origin}/api/department/update-dept/${editingDeptId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken,
          },
          body: JSON.stringify({ departmentName: editDeptName }),
        }
      );

      if (response.status === 200) {
        toast.success("Department updated successfully!");
        setEditingDeptId(null);
        setEditDeptName(""); // Clear the input after updating
        getDepartment();
      }
    } catch (error) {
      console.log(`Error in updating department: ${error}`);
      toast.error("Error updating department");
    }
  };

  const deleteDept = async (id) => {
    try {
      const response = await fetch(
        `${window.location.origin}/api/department/delete-dept/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authToken,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Department deleted successfully!");
        getDepartment();
      }
    } catch (error) {
      toast.error(`Error in deleting department: ${error}`);
    }
  };

  useEffect(() => {
    getDepartment();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <section className="admin-users-section">
        <div className="container">
          <h5>Admin Departments Data</h5>
          <div>
            <form>
              <label htmlFor="newDeptName">New Department Name:</label>
              <input
                type="text"
                id="newDeptName"
                value={newDeptName}
                onChange={(e) => setNewDeptName(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                fontSize="small"
                onClick={addDepartment}
              >
                Add Department
              </Button>
            </form>
          </div>
        </div>

        <div className="container admin-users">
          {deptData.length > 0 && (
            <table>
              <thead>
                <tr className="dept-row">
                  <th>Department Name</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {deptData.map((dept) => (
                  <tr key={dept._id} className="dept-row">
                    <td>
                      {editingDeptId === dept._id ? (
                        <input
                          type="text"
                          value={editDeptName}
                          onChange={(e) => setEditDeptName(e.target.value)}
                        />
                      ) : (
                        dept.departmentName
                      )}
                    </td>
                    <td>
                      {editingDeptId === dept._id ? (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={updateDepartment}
                        >
                          Update
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="info"
                          onClick={() => {
                            setEditDeptName(dept.departmentName);
                            setEditingDeptId(dept._id);
                          }}
                        >
                          Start Edit
                        </Button>
                      )}
                    </td>
                    <td>
                      <Button
                        onClick={() => deleteDept(dept._id)}
                        variant="contained"
                        color="error"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </>
  );
};

export default AdminDepartment;
