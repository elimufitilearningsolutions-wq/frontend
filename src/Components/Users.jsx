import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const apiUrl = config.API_BASE_URL;
      const res = await axios.get(`${apiUrl}/api/users`);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-5">Loading users...</p>;
  if (error) return <p className="text-danger text-center mt-5">{error}</p>;

  return (
    <div className="container my-5">
      <h3 className="mb-4 fw-bold">Registered Users</h3>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-striped align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Registered On</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No users found
                </td>
              </tr>
            )}

            {users.map((u, index) => (
              <tr key={u.user_id}>
                <td>{index + 1}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phoneNumber || "—"}</td>
                <td>
                  {u.isAdmin === 1 ? (
                    <span className="badge bg-danger">Admin</span>
                  ) : (
                    <span className="badge bg-primary">User</span>
                  )}
                </td>
                <td>
                  {u.created_at
                    ? new Date(u.created_at).toLocaleDateString()
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
