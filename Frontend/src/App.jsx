import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeDetails from "./components/EmployeeDetails";
import Toast from "./components/Toast";

import "./App.css";

function App() {
  const [toast, setToast] = useState(null);

  function showToast(message, type = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  }

  return (
    <div className="app-container">
      <h1 className="app-title">Employees Management System</h1>

      {toast && <Toast message={toast.message} type={toast.type} />}

      <Routes>
        <Route path="/" element={<EmployeeList showToast={showToast} />} />
        <Route path="/add" element={<EmployeeForm mode="add" showToast={showToast} />} />
        <Route path="/edit/:id" element={<EmployeeForm mode="edit" showToast={showToast} />} />
        <Route path="/details/:id" element={<EmployeeDetails showToast={showToast} />} />
      </Routes>
    </div>
  );
}

export default App;
