import { useEffect, useState } from "react";
import { fetchEmployees, deleteEmployee } from "../api";
import { useNavigate } from "react-router-dom";
import "./EmployeeList.css";

function EmployeeList({ showToast }) {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  async function load() {
    const res = await fetchEmployees();
    setEmployees(res.data);
  }

  useEffect(() => {
    load();
  }, []);

  // Filter employees by search text
  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.position.toLowerCase().includes(search.toLowerCase())
  );

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      await deleteEmployee(id);
      showToast("Employee deleted successfully", "success");
      load();
    }
  }

  return (
    <div className="container">
      <div className="top-bar">
        <button className="add-btn" onClick={() => navigate("/add")}>
          Add Employee
        </button>

        <input
          type="text"
          className="search-input"
          placeholder="Search by name or position..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="employee-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredEmployees.map((emp) => (
            <tr key={emp.id}>
              <td>
                {emp.image && (
                  <img
                    src={`http://127.0.0.1:8000/storage/${emp.image}`}
                    className="employee-img"
                  />
                )}
              </td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.phone}</td>
              <td>{emp.position}</td>
              <td>{emp.salary}</td>
              <td>
                <button
                  className="details-btn"
                  onClick={() => navigate(`/details/${emp.id}`)}
                >
                  Details
                </button>

                <button
                  className="edit-btn"
                  onClick={() => navigate(`/edit/${emp.id}`)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(emp.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {filteredEmployees.length === 0 && (
            <tr>
              <td colSpan="7" className="no-results">
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
