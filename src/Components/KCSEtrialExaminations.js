// src/components/PP2Exams.js
import React from 'react';
import ExamsList from './ExamsListPerYear';


const KCSEtrialExaminations = ({ isLoggedIn, clearToken }) => {
    const items = [
        { name: 'KCSE TRIAL EXAMINATIONS 2026 ', year: 2026, bgColor: 'rgba(0, 0, 0, 0.2)', textColor: 'rgb(0, 0, 0)', path: "secondary", value: "kcse/trial/examinations" },
        { name: 'KCSE TRIAL EXAMINATIONS 2025 ', year: 2025, bgColor: 'rgba(0, 0, 0, 0.1)', textColor: 'rgb(0, 0, 0)', path: "secondary", value: "kcse/trial/examinations" }
       
    ];

    return (
        <>
        
        <ExamsList           
            heading="KCSE TRIAL EXAMINATIONS"
            items={items}
            navigateTo="/kcse/trial/examinations/downloads"
        />
        </>
    );
};

export default KCSEtrialExaminations;
