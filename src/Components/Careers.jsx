import React, { useState } from "react";
import axios from "axios";
import config from "../config";
import jobapp from "../files/job application.pdf";
import graphics from "../images/Graphiced Final 2  Deeee.png";
import "../assets/careers.css"


const Careers = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    applicationType: "",
    startDate: "",
    employmentStatus: "",
    resumeSubmission: "upload", // default to upload
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

      // Append all fields except resume
      submitData.append("firstName", formData.firstName);
      submitData.append("lastName", formData.lastName);
      submitData.append("email", formData.email);
      submitData.append("phone", formData.phone);
      submitData.append("applicationType", formData.applicationType);
      submitData.append("startDate", formData.startDate);
      submitData.append("employmentStatus", formData.employmentStatus);

      // Handle resume
      if (formData.resumeSubmission === "upload" && formData.resumeFile) {
        submitData.append("resume", formData.resumeFile); // backend expects `req.file`
      } else if (formData.resumeSubmission === "url" && formData.resumeUrl) {
        submitData.append("resumeUrl", formData.resumeUrl); // backend should handle URL saving
      }

      const apiUrl = config.API_BASE_URL;

      const response = await axios.post(`${apiUrl}/applicants`, submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Application submitted:", response.data);
      alert("Your application has been submitted successfully!");

      // Reset form
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
      <div
        className="container my-4 rounded"
        
      >
        <div className="row">
          <div className="col-md-6 mb-4 d-flex flex-column pb-lg-10 text-center">
            <p
              className="mt-5"
              style={{ fontSize: "24px", fontWeight: "500", letterSpacing: "1px" }}
            >
              ELIMUFITI LEARNING SOLUTIONS
            </p>
            <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
              Elimufiti Learning Solutions is a dynamic and innovative organization
              dedicated to enhancing education through quality resources, exceptional
              service, and cutting-edge solutions.
            </p>
            <a
              href={jobapp}
              download={jobapp}
              className="text-primary"
              style={{
                fontSize: "18px",
                cursor: "pointer",
                textDecoration: "underline",
                marginTop: "20px",
              }}
            >
              Click here to download the list of available jobs
            </a>
          </div>
<div className="col-md-6 mb-4">
  <div className="card p-5 shadow-lg custom_form" >
    <h5 className="text-center mb-4  fw-bold">Job Application Form</h5>
    <form onSubmit={handleSubmit}>
      
      {/* Personal Info */}
      {["firstName", "lastName", "email", "phone"].map((field) => (
        <div className="mb-4" key={field}>
          <label htmlFor={field} className="form-label  fw-medium">
            {field === "phone" ? "Phone Number" : field.charAt(0).toUpperCase() + field.slice(1)}
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

      {/* Application Type */}
      <div className="mb-4">
        <label htmlFor="applicationType" className="form-label  fw-medium">
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

      {/* Start Date */}
      <div className="mb-4">
        <label htmlFor="startDate" className="form-label  fw-medium">
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

      {/* Employment Status */}
      <div className="mb-4">
        <p className=" fw-medium mb-2">Current employment status?</p>
        {["employed", "unemployed", "self-employed", "student"].map((status) => (
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
            <label className="form-check-label " htmlFor={status}>
              {status.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </label>
          </div>
        ))}
      </div>

      {/* Resume Submission */}
      <div className="mb-4">
        <p className=" fw-medium mb-2">Resume submission method:</p>
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
            <label className="form-check-label " htmlFor={method}>
              {method === "upload" ? "Upload file" : "Provide URL"}
            </label>
          </div>
        ))}
      </div>

      {/* File Upload or URL */}
      {formData.resumeSubmission === "upload" ? (
        <div className="mb-4">
          <label htmlFor="resumeFile" className="form-label  fw-medium">Upload Resume</label>
          <input
            type="file"
            id="resumeFile"
            className="form-control form-control-modern"
            onChange={handleChange}
          />
        </div>
      ) : (
        <div className="mb-4">
          <label htmlFor="resumeUrl" className="form-label  fw-medium">Resume URL</label>
          <input
            type="url"
            id="resumeUrl"
            className="form-control form-control-modern"
            value={formData.resumeUrl}
            onChange={handleChange}
          />
        </div>
      )}

      {/* Submit */}
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
        <img src={graphics} alt="graphics loading" className="img-fluid custom-image" />
      </div>
    </>
  );
};

export default Careers;
