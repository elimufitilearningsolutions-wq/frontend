// src/components/PP2Exams.js
import React from 'react';
import ExamsList from './ExamsListPerYear';


const SecondarySchemes = ({ isLoggedIn, clearToken }) => {
    const items = [
        { name: 'SECONDARY SCHEMES 2026 ', year: 2026, bgColor: 'rgba(0, 0, 0, 0.2)', textColor: 'rgb(0, 0, 0)', path: "secondary", value: "schemes" },
        { name: 'SECONDARY SCHEMES 2025 ', year: 2025, bgColor: 'rgba(0, 0, 0, 0.1)', textColor: 'rgb(0, 0, 0)', path: "secondary", value: "schemes" },

    ];

    return (
        <>
        
        <ExamsList           
            heading="SECONDARY SCHEMES"
            items={items}
            navigateTo="/secondary/schemes/downloads"
        />
        </>
    );
};

export default SecondarySchemes;
