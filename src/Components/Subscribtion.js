import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../config";
import "../assets/subscription.css"


const Subscribe = ({ userId }) => {
    const [formData, setFormData] = useState({
        amount: "",
        phoneNumber: "",
        user_id: userId || "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            setFormData((prevData) => ({ ...prevData, user_id: userId }));
        }
    }, [userId]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });

        try {
            const response = await axios.post(`${config.API_BASE_URL}/api/transactions/stk/push`, formData);
            const messageType = response.data.CustomerMessage ? "success" : "error";
            const messageText = response.data.CustomerMessage || "Unexpected response. Please try again.";

            setMessage({ type: messageType, text: messageText });

            if (messageType === "success") {
                setTimeout(() => navigate("/"), 3000);
            }
        } catch (err) {
            const errorMessage = err.response 
                ? err.response.data.message || "Failed to process the subscription." 
                : `Request error: ${err.message}`;
            setMessage({ type: "error", text: errorMessage });
        } finally {
            setLoading(false);
            setFormData({ amount: "", phoneNumber: "", user_id: userId });
            setTimeout(() => setMessage({ type: "", text: "" }), 5000);
        }
    };

    return (
        <div className="container mt-2">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header bg-primary text-white text-center">
                            <h5>Follow the simple steps below</h5>
                        </div>
                        <div className="card-body">
                            {message.text && (
                                <div className={`alert alert-${message.type === "error" ? "danger" : "success"}`}>
                                    {message.text}
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                
                                <ol class="subscription-steps">
                                <li>Enter your preferred amount</li>
                                <li>Enter the phone number to pay with</li>
                                <li>Click <strong>Submit</strong></li>
                                <li>Confirm the payment on your phone by entering your PIN</li>
                                </ol>

                            <div className="mb-3">
                            <label htmlFor="amount" className="form-label">Amount:</label>
                                <input
                                type="number"
                                id="amount"
                                name="amount"
                                className="form-control mt-2"
                                value={formData.amount}
                                onChange={handleChange}
                                placeholder="Preferred amount (KES)"
                                min="10"
                                required
                                />

                                <small className="text-muted d-block mt-1">
                                Minimum KES 10
                                </small>


                        </div>


                                <div className="mb-3">
                                    <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
                                    <input
                                        placeholder="Enter number to Use for Payment"
                                        type="tel"
                                        id="phoneNumber"
                                        className="form-control"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        pattern="^\d{10}$"
                                        required
                                        
                                    />
                                </div>
                                <div className="mb-3 d-none">{/*hide the user id and this part to be replaced with user name later*/}
                                    <label htmlFor="user_id" className="form-label">User ID:</label>
                                    <input
                                        type="text"
                                        id="user_id"
                                        className="form-control"
                                        value={formData.user_id}
                                        readOnly
                                    />
                                </div>
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
