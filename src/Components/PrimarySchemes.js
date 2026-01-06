// src/components/PP2Exams.js
import React from 'react';
import ExamsList from './ExamsListPerYear';


const PrimarySchemes = ({ isLoggedIn, clearToken }) => {
    const items = [
        { name: 'PRIMARY SCHEMES 2026 ', year: 2026, bgColor: 'rgba(0, 0, 0, 0.2)', textColor: 'rgb(0, 0, 0)', path: "primary", value: "schemes" },
        { name: 'PRIMARY SCHEMES 2025 ', year: 2025, bgColor: 'rgba(0, 0, 0, 0.1)', textColor: 'rgb(0, 0, 0)', path: "primary", value: "schemes" },
        { name: 'PRIMARY SCHEMES 2024 ', year: 2024, bgColor: 'rgba(0, 0, 0, 0.2)', textColor: 'rgb(0, 0, 0)', path: "primary", value: "schemes" },
        { name: 'PRIMARY SCHEMES 2023 ', year: 2023, bgColor: 'rgba(0, 0, 0, 0.1)', textColor: 'rgb(0, 0, 0)', path: "primary", value: "schemes" }
    ];

    return (
        <>
        
        <ExamsList           
            heading="PRIMARY SCHEMES"
            items={items}
            navigateTo="/primary/schemes/downloads"
        />
        </>
    );
};

export default PrimarySchemes;
