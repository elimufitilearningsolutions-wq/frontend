import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config';
const ExamsList = ({ heading, items, navigateTo, customBg }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchData = useCallback(async (path, value, year) => {
        try {
            setLoading(true);
            setError(null);
            const apiUrl = config.API_BASE_URL;
           //http://localhost:8000/pre/primary/pp2/exams/2024
            const url = `${apiUrl}/${path}/${value}/${year}`;
            console.log('the fetched url is:', url)

            const res = await axios.get(url);
        
            navigate(navigateTo, { state: { data: res.data, selectedItem: { path, value, year } } });
        } catch (error) {
            setError("Error fetching data, please try again later.");
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }, [navigate, navigateTo]);

    useEffect(() => {
        if (selectedItem) {
            fetchData(selectedItem.path, selectedItem.value, selectedItem.year);
        }
    }, [selectedItem, fetchData]);

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    return (
        <div  className="bg-opacity"
            style={{
            position: "relative",
    backgroundImage: customBg ? customBg : "none",
    backgroundSize: "cover",          // fills entire screen
    backgroundPosition: "center",     // keeps image centered
    backgroundRepeat: "no-repeat",    // no tiling
    backgroundAttachment: "fixed",    // smooth desktop effect
    minHeight: "100vh",               // full viewport height
    width: "100%",
    display: "flex",
    flexDirection: "column",
            }}>
        <div>
        <div className="container-fluid" style={{ paddingLeft: '10px', paddingRight: '10px' }}>
            <div className="row">
                <div className="col-lg-12">
                    <h1 className="text-center my-4 py-4">{heading}</h1>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
<div className="d-flex justify-content-center">
  <div style={{ width: "100%", maxWidth: "600px" }}>
    {items.map((item, index) => (
      <div
        key={index}
        onClick={() => handleItemClick(item)}
        style={{
          marginBottom: "25px",
          padding: "25px",
          borderRadius: "16px",
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.15)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
          transition: "all 0.3s ease",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.25)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
        }}
      >
        <div
          style={{
            fontSize: "22px",
            fontWeight: "600",
            color: item.textColor || "#ffffff",
            textAlign: "center",
            letterSpacing: "0.5px",
          }}
        >
          {item.name}
        </div>
      </div>
    ))}
  </div>
</div>

                    )}
                </div>
            </div>
        </div>
    </div>
</div>

    );
};

export default ExamsList;
