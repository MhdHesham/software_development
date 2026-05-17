import { useEffect, useState } from "react";
import { createEmployee, updateEmployee, fetchEmployee } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import "./EmployeeForm.css";

function EmployeeForm({ mode, showToast }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    salary: "",
    hire_date: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (mode === "edit") {
      loadEmployee();
    }
  }, []);

  async function loadEmployee() {
    const res = await fetchEmployee(id);
    setForm({ ...res.data, image: null });
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  
  function validate() {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";

    if (form.email && !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email format";

    if (!form.phone.trim()) newErrors.phone = "Phone is required";

    if (form.salary && isNaN(form.salary))
      newErrors.salary = "Salary must be a number";

    if (!form.hire_date) newErrors.hire_date = "Hire date is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) {
      showToast("Please fix the errors", "error");
      return;
    }

    const fd = new FormData();
    for (let key in form) {
      fd.append(key, form[key]);
    }

    if (mode === "add") {
      createEmployee(fd)
        .then(() => {
          showToast("Employee added successfully", "success");
          navigate("/");
        })
        .catch(() => showToast("Error adding employee", "error"));
    } else {
      updateEmployee(id, fd)
        .then(() => {
          showToast("Employee updated successfully", "success");
          navigate("/");
        })
        .catch(() => showToast("Error updating employee", "error"));
    }
  }

  return (
    <div className="form-container">
      <h2 className="form-title">
        {mode === "add" ? "Add Employee" : "Edit Employee"}
      </h2>

      <form onSubmit={handleSubmit} className="employee-form">
        
        <label>Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter name"
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <label>Email</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter email"
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label>Phone</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Enter phone"
        />
        {errors.phone && <p className="error">{errors.phone}</p>}

        <label>Position</label>
        <input
          name="position"
          value={form.position}
          onChange={handleChange}
          placeholder="Enter position"
        />

        <label>Salary</label>
        <input
          name="salary"
          value={form.salary}
          onChange={handleChange}
          placeholder="Enter salary"
        />
        {errors.salary && <p className="error">{errors.salary}</p>}

        <label>Hire Date</label>
        <input
          type="date"
          name="hire_date"
          value={form.hire_date}
          onChange={handleChange}
        />
        {errors.hire_date && <p className="error">{errors.hire_date}</p>}

        <label>Employee Image</label>
        <input
          type="file"
          onChange={(e) =>
            setForm({ ...form, image: e.target.files[0] })
          }
        />

        <div className="form-buttons">
          <button type="submit" className="save-btn">
            Save
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeForm;
