import React, { useState } from "react";

const UnlockDownloadsModal = ({ show, handleClose }) => {

  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePhoneChange = async (e) => {

    const phone = e.target.value;
    setPhoneNumber(phone);

    // when user finishes typing phone
    if (phone.length === 10) {

      try {

        const res = await fetch("/api/magicLinksignup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ phoneNumber: phone })
        });

        const data = await res.json();

        if (data.token) {
          localStorage.setItem("token", data.token);
        }

      } catch (err) {
        console.error("Magic signup error", err);
      }

    }

  };


  const handlePayment = async () => {

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch("/api/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          phoneNumber,
          amount: 1
        })
      });

      const data = await res.json();

      console.log("Payment response:", data);

      alert("STK push sent. Check your phone.");

    } catch (error) {

      console.error("Payment error:", error);

    } finally {

      setLoading(false);

    }

  };


  return (
    <div className={`modal ${show ? "show d-block" : "d-none"}`}>
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title text-black">
              Unlock Downloads
            </h5>

            <button
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>

          <div className="modal-body text-black">

            <p>Enter your phone number to continue:</p>

            <input
              type="text"
              className="form-control"
              placeholder="07XXXXXXXX"
              value={phoneNumber}
              onChange={handlePhoneChange}
            />

            <small className="text-muted">
              You will receive an M-Pesa prompt.
            </small>

          </div>

          <div className="modal-footer">

            <button
              className="btn btn-success"
              onClick={handlePayment}
              disabled={loading || phoneNumber.length !== 10}
            >
              {loading ? "Processing..." : "Pay with M-Pesa"}
            </button>

            <button
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Close
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default UnlockDownloadsModal;