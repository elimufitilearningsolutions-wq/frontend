// src/components/PP2Exams.js
import React from 'react';
import ExamsList from './ExamsListPerYear';


const JSSSchemes = ({ isLoggedIn, clearToken }) => {
    const items = [
        { name: 'JUNIOR SCHOOL SCHEMES 2026 ', year: 2026, bgColor: 'rgba(0, 0, 0, 0.2)', textColor: 'rgb(0, 0, 0)', path: "jss", value: "schemes" },
        { name: 'JUNIOR SCHOOL SCHEMES 2025 ', year: 2025, bgColor: 'rgba(0, 0, 0, 0.1)', textColor: 'rgb(0, 0, 0)', path: "jss", value: "schemes" },
        { name: 'JUNIOR SCHOOL SCHEMES 2024 ', year: 2024, bgColor: 'rgba(0, 0, 0, 0.2)', textColor: 'rgb(0, 0, 0)', path: "jss", value: "schemes" },
        { name: 'JUNIOR SCHOOL SCHEMES 2023 ', year: 2023, bgColor: 'rgba(0, 0, 0, 0.1)', textColor: 'rgb(0, 0, 0)', path: "jss", value: "schemes" }
    ];

    return (
        <>

        <ExamsList           
            heading="JUNIOR SCHOOL SCHEMES"
            items={items}
            navigateTo="/jss/schemes/downloads"
        />
        </>
    );
};

export default JSSSchemes;
