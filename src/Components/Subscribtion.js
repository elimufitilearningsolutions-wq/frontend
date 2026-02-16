import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom"; // ✅ added
import config from "../config";
import "../assets/subscription.css";

// Get Socket URL from env
const socketUrl = process.env.REACT_APP_SOCKET_URL;

// Fail loudly if missing
if (!socketUrl) {
  console.error("❌ REACT_APP_SOCKET_URL is NOT defined!");
  throw new Error("Missing REACT_APP_SOCKET_URL environment variable. Set it in Vercel dashboard or .env.production before build.");
}

// Create Socket.IO client safely
const socket = io(socketUrl, {
  path: "/socket.io",
  transports: ["websocket"],
  autoConnect: false,
  secure: true,
  reconnection: true,
  reconnectionAttempts: 5,
  timeout: 10000,
});

// Debug logging
socket.on("connect", () => {
  console.log("✅ Socket connected:", socket.id);
  console.log("🆔 Connected URL:", socket.io.uri);
});

socket.on("connect_error", (err) => {
  console.error("❌ Socket connection error!");
  console.error("Attempted URL:", socket.io.uri);
  console.error("Error:", err.message);
});

socket.on("disconnect", (reason) => {
  console.warn("⚠️ Socket disconnected:", reason);
});

const Subscribe = ({ userId }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    amount: "",
    phoneNumber: "",
    user_id: userId || "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // ✅ Packages
  const packages = [
    { label: "2 Days", amount: 50 },
    { label: "1 Month", amount: 300 },
    { label: "6 Months", amount: 750 },
    { label: "1 Year", amount: 1500 },
  ];

  useEffect(() => {
    if (!userId) return;

    setFormData((prev) => ({ ...prev, user_id: userId }));
    const roomName = `user_${userId}`;

    if (!socket.connected) {
      socket.connect();
    }

    const handleConnect = () => {
      socket.emit("joinRoom", roomName);
    };

    const handlePaymentSuccess = (data) => {
      setMessage({
        type: "success",
        text: `Payment Successful! Amount: KES ${data.Amount}, Receipt: ${data.MpesaReceiptNumber}`,
      });
      setLoading(false);
    };

    const handlePaymentFailed = (data) => {
      setMessage({
        type: "error",
        text: `Payment Failed: ${data.reason}`,
      });
      setLoading(false);
    };

    socket.on("connect", handleConnect);
    socket.on("paymentSuccess", handlePaymentSuccess);
    socket.on("paymentFailed", handlePaymentFailed);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("paymentSuccess", handlePaymentSuccess);
      socket.off("paymentFailed", handlePaymentFailed);
    };
  }, [userId]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePackageClick = (amount) => {
    setFormData((prev) => ({ ...prev, amount }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await axios.post(
        `${config.API_BASE_URL}/api/transactions/stk/push`,
        formData
      );

      const initialMsg =
        response.data.CustomerMessage || "Request accepted. Confirm payment on your phone.";

      setMessage({ type: "info", text: initialMsg });

      setFormData((prev) => ({ ...prev, amount: "", phoneNumber: "" }));
    } catch (err) {
      const errorMessage = err.response?.data?.message || `Request error: ${err.message}`;
      setMessage({ type: "error", text: errorMessage });
      setLoading(false);
    }
  };

  const handleCloseAlert = () => {
    if (message.type === "success") {
      navigate("/");
    }
    setMessage({ type: "", text: "" });
  };

  return (
    <div className="container mt-2">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white text-center">
              <h5>Follow these steps to Gain Access</h5>
            </div>
            <div className="card-body">

{message.text && (message.type === "success" || message.type === "error") && (
  <div
    className={`alert alert-${message.type === "error" ? "danger" : "success"} alert-dismissible fade show`}
    role="alert"
  >
    {message.text}
    <button
      type="button"
      className="btn-close"
      aria-label="Close"
      onClick={handleCloseAlert}
    ></button>
  </div>
)}

{message.text && message.type === "info" && (
  <div className="alert alert-info" role="alert">
    {message.text}
  </div>
)}

              <form onSubmit={handleSubmit}>

                {/* ✅ STEPS (NOT REMOVED) */}
                <ol className="subscription-steps">
                  <li>Enter the amount</li>
                  <li>Enter your phone number</li>
                  <li>Click <strong>Submit</strong></li>
                  <li>Confirm payment on your phone with your PIN</li>
                </ol>

<div className="row">

  {/* LEFT SIDE - PACKAGES */}
  <div className="col-md-6">
    <label className="form-label">Quick Packages:</label>
    <div className="d-grid gap-2">
      {packages.map((pkg, index) => (
        <button
          key={index}
          type="button"
          className="btn btn-outline-primary"
          onClick={() => handlePackageClick(pkg.amount)}
        >
          {pkg.label} – KES {pkg.amount}
        </button>
      ))}
    </div>
  </div>

  {/* RIGHT SIDE - INPUTS */}
  <div className="col-md-6">
    <div className="mb-3">
      <label htmlFor="amount" className="form-label">Amount (KES):</label>
      <input
        type="number"
        id="amount"
        className="form-control mt-2"
        value={formData.amount}
        onChange={handleChange}
        placeholder="Preferred amount"
        min="50"
        required
      />
      <small className="text-muted d-block mt-1">
        Minimum KES 50 for 2 days
      </small>
    </div>

    <div className="mb-3">
      <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
      <input
        type="tel"
        id="phoneNumber"
        className="form-control"
        value={formData.phoneNumber}
        onChange={handleChange}
        placeholder="07XXXXXXXX"
        pattern="^\d{10}$"
        required
      />
    </div>
  </div>

</div>


                <input type="hidden" id="user_id" value={formData.user_id} />

                <button type="submit" className="btn btn-primary w-100 mt-3" disabled={loading}>
                  {loading ? "Processing..." : "Submit"}
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
