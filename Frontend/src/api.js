const API_BASE_URL = "http://127.0.0.1:8000/api";

export async function fetchEmployees() {
  const res = await fetch(`${API_BASE_URL}/employees`);
  return res.json();
}

export async function fetchEmployee(id) {
  const res = await fetch(`${API_BASE_URL}/employees/${id}`);
  return res.json();
}

export async function createEmployee(data) {
  const res = await fetch(`${API_BASE_URL}/employees`, {
    method: "POST",
    body: data,
  });
  return res.json();
}

export async function updateEmployee(id, data) {
  data.append("_method", "PUT");

  const res = await fetch(`${API_BASE_URL}/employees/${id}`, {
    method: "POST",
    body: data,
  });

  return res.json();
}

export async function deleteEmployee(id) {
  const res = await fetch(`${API_BASE_URL}/employees/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
