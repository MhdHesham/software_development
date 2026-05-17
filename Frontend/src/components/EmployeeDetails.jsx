import { useEffect, useState } from "react";
import { fetchEmployee } from "../api";
import { useParams, useNavigate } from "react-router-dom";
import "./EmployeeDetails.css";

function EmployeeDetails() {
  const [employee, setEmployee] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await fetchEmployee(id);
    setEmployee(res.data);
  }

  if (!employee) return <p className="loading">Loading...</p>;

  return (
    <div className="details-container">
      <h2 className="details-title">Employee Details</h2>

      {employee.image && (
        <img
          src={`http://127.0.0.1:8000/storage/${employee.image}`}
          className="details-image"
        />
      )}

      <div className="details-info">
        <p><strong>Name:</strong> {employee.name}</p>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Phone:</strong> {employee.phone}</p>
        <p><strong>Position:</strong> {employee.position}</p>
        <p><strong>Salary:</strong> {employee.salary}</p>
        <p><strong>Hire Date:</strong> {employee.hire_date}</p>
      </div>

      <div className="details-buttons">
        <button className="back-btn" onClick={() => navigate("/")}>
          Back
        </button>

        <button
          className="edit-btn"
          onClick={() => navigate(`/edit/${employee.id}`)}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default EmployeeDetails;
