import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom"; // ✅ added
import config from "../config";
import "../assets/subscription.css";

// Create a single socket instance for the app
const socket = io(process.env.REACT_APP_SOCKET_URL, {
  transports: ["websocket"], // enforce WebSocket
  autoConnect: false,        // connect manually
});
console.log("✅ SOCKET URL from .env:", process.env.REACT_APP_SOCKET_URL);

const Subscribe = ({ userId }) => {
  const navigate = useNavigate(); // ✅ added

  const [formData, setFormData] = useState({
    amount: "",
    phoneNumber: "",
    user_id: userId || "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (!userId) return;

    setFormData((prev) => ({ ...prev, user_id: userId }));
    const roomName = `user_${userId}`;

    if (!socket.connected) {
      socket.connect();
    }

    const handleConnect = () => {
      console.log("✅ Socket connected:", socket.id);
      socket.emit("joinRoom", roomName, () => {
        console.log("✅ Room joined:", roomName);
      });
    };

    const handlePaymentSuccess = (data) => {
      console.log("💰 paymentSuccess event received:", data);
      setMessage({
        type: "success",
        text: `Payment Successful! Amount: KES ${data.Amount}, Receipt: ${data.MpesaReceiptNumber}`,
      });
      setLoading(false);
    };

    const handlePaymentFailed = (data) => {
      console.log("⚠️ paymentFailed event received:", data);
      setMessage({
        type: "error",
        text: `Payment Failed: ${data.reason}`,
      });
      setLoading(false);
    };

    socket.on("connect", handleConnect);
    socket.on("paymentSuccess", handlePaymentSuccess);
    socket.on("paymentFailed", handlePaymentFailed);
    socket.on("connect_error", (err) => console.error("❌ Socket connection error:", err));
    socket.on("disconnect", (reason) => console.warn("⚠️ Socket disconnected:", reason));

    return () => {
      socket.off("connect", handleConnect);
      socket.off("paymentSuccess", handlePaymentSuccess);
      socket.off("paymentFailed", handlePaymentFailed);
      socket.off("connect_error");
      socket.off("disconnect");
    };
  }, [userId]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      console.log("📤 Sending STK push request:", formData);

      const response = await axios.post(
        `${config.API_BASE_URL}/api/transactions/stk/push`,
        formData
      );

      const initialMsg =
        response.data.CustomerMessage || "Request accepted. Confirm payment on your phone.";
      console.log("📬 STK push response:", initialMsg);
      setMessage({ type: "info", text: initialMsg });

      setFormData((prev) => ({ ...prev, amount: "", phoneNumber: "" }));
    } catch (err) {
      const errorMessage = err.response?.data?.message || `Request error: ${err.message}`;
      console.error("❌ STK push error:", errorMessage);
      setMessage({ type: "error", text: errorMessage });
      setLoading(false);
    }
  };

  // ✅ NEW CLOSE HANDLER
  const handleCloseAlert = () => {
    if (message.type === "success") {
      navigate("/"); // redirect only on success
    }
    setMessage({ type: "", text: "" });
  };

  return (
    <div className="container mt-2">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white text-center">
              <h5>Follow these steps to subscribe</h5>
            </div>
            <div className="card-body">

{message.text && (message.type === "success" || message.type === "error") && (
  <div
    className={`alert alert-${
      message.type === "error" ? "danger" : "success"
    } alert-dismissible fade show`}
    role="alert"
  >
    {message.text}
    <button
      type="button"
      className="btn-close"
      aria-label="Close"
      onClick={handleCloseAlert}  // ✅ updated
    ></button>
  </div>
)}

{message.text && message.type === "info" && (
  <div className="alert alert-info" role="alert">
    {message.text}
  </div>
)}

              <form onSubmit={handleSubmit}>
                <ol className="subscription-steps">
                  <li>Enter the amount</li>
                  <li>Enter your phone number</li>
                  <li>Click <strong>Submit</strong></li>
                  <li>Confirm payment on your phone with your PIN</li>
                </ol>

                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">Amount (KES):</label>
                  <input
                    type="number"
                    id="amount"
                    className="form-control mt-2"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="Preferred amount"
                    min="1"
                    required
                  />
                  <small className="text-muted d-block mt-1">Minimum KES 10</small>
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

                <input type="hidden" id="user_id" value={formData.user_id} />

                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
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
