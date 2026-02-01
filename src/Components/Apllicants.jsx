import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";

const Applicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const apiUrl = config.API_BASE_URL;
      const res = await axios.get(`${apiUrl}/applicants`);
      setApplicants(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load applicants");
    } finally {
      setLoading(false);
    }
  };

  const downloadResume = async (id) => {
    try {
      const apiUrl = config.API_BASE_URL;
      const res = await axios.get(`${apiUrl}/applicants/${id}/resume`);
      window.open(res.data.url, "_blank");
    } catch (err) {
      console.error(err);
      alert("Failed to download resume");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading applicants...</p>;
  if (error) return <p className="text-danger text-center mt-5">{error}</p>;

  return (
    <div className="container my-5">
      <h3 className="mb-4 fw-bold">Applicants</h3>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-striped align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Application Type</th>
              <th>Start Date</th>
              <th>Employment Status</th>
              <th>Resume</th>
              <th>Applied On</th>
            </tr>
          </thead>

          <tbody>
            {applicants.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  No applicants found
                </td>
              </tr>
            )}

            {applicants.map((a, index) => (
              <tr key={a.id}>
                <td>{index + 1}</td>
                <td>{a.firstName} {a.lastName}</td>
                <td>{a.email}</td>
                <td>{a.phone}</td>
                <td className="text-capitalize">{a.applicationType}</td>
                <td>{a.startDate}</td>
                <td className="text-capitalize">{a.employmentStatus}</td>
                <td>
                  {a.resume.exists ? (
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => downloadResume(a.id)}
                    >
                      Download
                    </button>
                  ) : (
                    <span className="text-muted">N/A</span>
                  )}
                </td>
                <td>
                  {new Date(a.resume.uploadedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Applicants;
