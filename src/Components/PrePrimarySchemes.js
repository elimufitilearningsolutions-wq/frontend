// src/components/PP2Exams.js
import React from 'react';
import ExamsList from './ExamsListPerYear';


const PrePrimarySchemes = ({ isLoggedIn, clearToken }) => {
    const items = [
        
        { name: 'PRE PRIMARY SCHEMES 2026 ', year: 2026, bgColor: 'rgba(0, 0, 0, 0.2)', textColor: 'rgb(0, 0, 0)', path: "pre/primary", value: "schemes" },
        { name: 'PRE PRIMARY SCHEMES 2025 ', year: 2025, bgColor: 'rgba(0, 0, 0, 0.1)', textColor: 'rgb(0, 0, 0)', path: "pre/primary", value: "schemes" },
        { name: 'PRE PRIMARY SCHEMES 2024 ', year: 2024, bgColor: 'rgba(0, 0, 0, 0.2)', textColor: 'rgb(0, 0, 0)', path: "pre/primary", value: "schemes" },
        { name: 'PRE PRIMARY SCHEMES 2023 ', year: 2023, bgColor: 'rgba(0, 0, 0, 0.1)', textColor: 'rgb(0, 0, 0)', path: "pre/primary", value: "schemes" }
    ];

    return (
        <>
       
        <ExamsList           
            heading="PRE PRIMARY SCHEMES"
            items={items}
            navigateTo="/pre/primary/schemes/download"
        />
        </>
    );
};

export default PrePrimarySchemes;
