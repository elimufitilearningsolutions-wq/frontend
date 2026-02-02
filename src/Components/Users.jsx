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
              <th>Admin</th>
              <th>Subscribed</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Transaction Date</th>
              <th>M-Pesa Receipt</th>
              <th>Checkout ID</th>
              <th>Failure Reason</th>
              <th>Token</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan="13" className="text-center py-4">
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
                  <span className={`badge ${u.isAdmin ? "bg-danger" : "bg-secondary"}`}>
                    {u.isAdmin ? "Yes" : "No"}
                  </span>
                </td>

                <td>
                  <span className={`badge ${u.isSubscribed ? "bg-success" : "bg-warning text-dark"}`}>
                    {u.isSubscribed ? "Yes" : "No"}
                  </span>
                </td>

                <td>{u.amount ? `KES ${u.amount}` : "—"}</td>

                <td>
                  <span className={`badge ${
                    u.status === "SUCCESS"
                      ? "bg-success"
                      : u.status === "FAILED"
                      ? "bg-danger"
                      : "bg-secondary"
                  }`}>
                    {u.status || "—"}
                  </span>
                </td>

                <td>
                  {u.transactionDate
                    ? new Date(u.transactionDate).toLocaleString()
                    : "—"}
                </td>

                <td>{u.mpesaReceiptNumber || "—"}</td>
                <td>{u.checkoutRequestID || "—"}</td>
                <td>{u.FailureReason || "—"}</td>

                <td style={{ maxWidth: "160px" }}>
                  {u.current_token ? (
                    <span
                      className="text-truncate d-inline-block"
                      title={u.current_token}
                    >
                      Active
                    </span>
                  ) : (
                    <span className="text-muted">None</span>
                  )}
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
