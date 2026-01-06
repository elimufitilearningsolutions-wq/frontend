// src/components/PP2Exams.js
import React from 'react';
import ExamsList from './ExamsListPerYear';


const PrimaryAssessmentTools = ({ isLoggedIn, clearToken }) => {
    const items = [
        { name: 'PRIMARY ASSESSMENT TOOLS 2026 ', year: 2026, bgColor: 'rgba(0, 0, 0, 0.2)', textColor: 'rgba(0, 0, 0)', path: "primary", value: "assessment/tools" },
        { name: 'PRIMARY ASSESSMENT TOOLS 2025 ', year: 2025, bgColor: 'rgba(0, 0, 0, 0.1)', textColor: 'rgba(0, 0, 0)', path: "primary", value: "assessment/tools" },
        { name: 'PRIMARY ASSESSMENT TOOLS 2024 ', year: 2024, bgColor: 'rgba(0, 0, 0, 0.2)', textColor: 'rgba(0, 0, 0)', path: "primary", value: "assessment/tools" },
        { name: 'PRIMARY ASSESSMENT TOOLS 2023 ', year: 2023, bgColor: 'rgba(0, 0, 0, 0.1)', textColor: 'rgba(0, 0, 0)', path: "primary", value: "assessment/tools" }
    ];

    return (
        <>
       
        <ExamsList           
            heading="PRIMARY ASSESSMENT TOOLS"
            items={items}
            navigateTo="/primary/assessment/tools/download"
        />
        </>
    );
};

export default PrimaryAssessmentTools;
