// src/components/Grade10Examinations.js
import React from 'react';
import ExamsList from './ExamsListPerYear';


const SeniorSchoolSchemes = ({ isLoggedIn, clearToken }) => {
    const items = [
        { name: 'SENIOR SCHOOLS SCHEMES 2026', year: 2026, bgColor: 'rgba(0, 0, 0, 0.2)', textColor: 'rgb(0, 0, 0)', path: "senior/school", value: "schemes" },
        { name: 'SENIOR SCHOOLS SCHEMES 2025', year: 2025, bgColor: 'rgba(0, 0, 0, 0.1)', textColor: 'rgb(0, 0, 0)', path: "senior/school", value: "schemes" },
        
    ];

    return (
        <ExamsList           
            heading="GRADE 10"
            items={items}
            navigateTo="/senior/school/schemes/downloads"
        />
    );
};

export default SeniorSchoolSchemes;
