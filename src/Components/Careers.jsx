import React, { useState } from "react";
import axios from "axios";
import config from "../config";
import graphics from "../images/Graphiced Final 2  Deeee.png";
import "../assets/careers.css";

/* =========================
   JOBS DATA (DISPLAY ONLY)
========================= */
const JOBS = [
  { id: "preprimary", title: "Pre-Primary Teacher", slots: 2 },
  { id: "primary", title: "Primary Teacher", slots: 2 },
  { id: "jss", title: "Junior Secondary (JSS) Teacher", slots: 3 },
  { id: "senior", title: "Senior School Teacher", slots: 3 },
  { id: "secondary", title: "Secondary School Teacher", slots: 1 },
  { id: "data_clerk", title: "Data Clerk", slots: 4 },
];

const Careers = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    applicationType: "",
    startDate: "",
    employmentStatus: "",
    resumeSubmission: "upload",
    resumeFile: null,
    resumeUrl: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, name, value, type, files } = e.target;

    if (type === "radio") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, resumeFile: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [id || name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData = new FormData();

      submitData.append("firstName", formData.firstName);
      submitData.append("lastName", formData.lastName);
      submitData.append("email", formData.email);
      submitData.append("phone", formData.phone);
      submitData.append("applicationType", formData.applicationType);
      submitData.append("startDate", formData.startDate);
      submitData.append("employmentStatus", formData.employmentStatus);

      if (formData.resumeSubmission === "upload" && formData.resumeFile) {
        submitData.append("resume", formData.resumeFile);
      } else if (formData.resumeSubmission === "url" && formData.resumeUrl) {
        submitData.append("resumeUrl", formData.resumeUrl);
      }

      const apiUrl = config.API_BASE_URL;

      await axios.post(`${apiUrl}/applicants`, submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Your application has been submitted successfully!");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        applicationType: "",
        startDate: "",
        employmentStatus: "",
        resumeSubmission: "upload",
        resumeFile: null,
        resumeUrl: "",
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      alert(
        error.response?.data?.message ||
          "There was an error submitting your application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="container my-4 rounded">
        <div className="row">
          {/* LEFT COLUMN */}
          <div className="col-md-6 mb-4 d-flex flex-column pb-lg-10 text-center">
            <p
              className="mt-5"
              style={{ fontSize: "24px", fontWeight: "500", letterSpacing: "1px" }}
            >
              ELIMUFITI LEARNING SOLUTIONS
            </p>

            <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
              Elimufiti Learning Solutions is a dynamic and innovative organization
              dedicated to enhancing education through quality resources,
              exceptional service, and cutting-edge solutions.
            </p>

            {/* JOBS SECTION (DISPLAY ONLY) */}
            <div className="mt-4 text-start">
              <h5 className="fw-bold mb-3">Current Open Positions</h5>
              <ul className="list-unstyled" style={{ fontSize: "16px", lineHeight: "1.8" }}>
                {JOBS.map((job) => (
                  <li key={job.id}>
                    📌 <strong>{job.title}</strong> – {job.slots} Position
                    {job.slots > 1 ? "s" : ""}
                  </li>
                ))}
              </ul>
              <p className="mt-3 fw-medium">
                Apply using the form provided.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN (FORM UNCHANGED) */}
          <div className="col-md-6 mb-4">
            <div className="card p-5 shadow-lg custom_form">
              <h5 className="text-center mb-4 fw-bold">
                Job Application Form
              </h5>

              <form onSubmit={handleSubmit}>
                {["firstName", "lastName", "email", "phone"].map((field) => (
                  <div className="mb-4" key={field}>
                    <label htmlFor={field} className="form-label fw-medium">
                      {field === "phone"
                        ? "Phone Number"
                        : field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      id={field}
                      className="form-control form-control-modern"
                      value={formData[field]}
                      onChange={handleChange}
                      required
                    />
                  </div>
                ))}

                <div className="mb-4">
                  <label htmlFor="applicationType" className="form-label fw-medium">
                    What are you applying for?
                  </label>
                  <select
                    id="applicationType"
                    className="form-select form-select-modern"
                    value={formData.applicationType}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select an option</option>
                    <option value="job">Job</option>
                    <option value="internship">Internship</option>
                    <option value="scholarship">Scholarship</option>
                    <option value="volunteer">Volunteer</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="startDate" className="form-label fw-medium">
                    Available start date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    className="form-control form-control-modern"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <p className="fw-medium mb-2">Current employment status?</p>
                  {["employed", "unemployed", "self-employed", "student"].map(
                    (status) => (
                      <div className="form-check form-check-modern mb-2" key={status}>
                        <input
                          type="radio"
                          className="form-check-input"
                          name="employmentStatus"
                          id={status}
                          value={status}
                          checked={formData.employmentStatus === status}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor={status}>
                          {status.replace("-", " ").replace(/\b\w/g, (l) =>
                            l.toUpperCase()
                          )}
                        </label>
                      </div>
                    )
                  )}
                </div>

                <div className="mb-4">
                  <p className="fw-medium mb-2">Resume submission method:</p>
                  {["upload", "url"].map((method) => (
                    <div className="form-check form-check-modern mb-2" key={method}>
                      <input
                        type="radio"
                        className="form-check-input"
                        name="resumeSubmission"
                        id={method}
                        value={method}
                        checked={formData.resumeSubmission === method}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor={method}>
                        {method === "upload" ? "Upload file" : "Provide URL"}
                      </label>
                    </div>
                  ))}
                </div>

                {formData.resumeSubmission === "upload" ? (
                  <div className="mb-4">
                    <label htmlFor="resumeFile" className="form-label fw-medium">
                      Upload Resume
                    </label>
                    <input
                      type="file"
                      id="resumeFile"
                      className="form-control form-control-modern"
                      onChange={handleChange}
                    />
                  </div>
                ) : (
                  <div className="mb-4">
                    <label htmlFor="resumeUrl" className="form-label fw-medium">
                      Resume URL
                    </label>
                    <input
                      type="url"
                      id="resumeUrl"
                      className="form-control form-control-modern"
                      value={formData.resumeUrl}
                      onChange={handleChange}
                    />
                  </div>
                )}

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-gradient-modern fw-bold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <img
          src={graphics}
          alt="graphics loading"
          className="img-fluid custom-image"
        />
      </div>
    </>
  );
};

export default Careers;
