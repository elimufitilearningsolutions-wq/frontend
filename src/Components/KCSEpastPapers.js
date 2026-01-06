// src/components/PP2Exams.js
import React from 'react';
import ExamsList from './ExamsListPerYear';


const KCSEpastPapers = ({ isLoggedIn, clearToken }) => {
    const items = [
        
        { name: 'KCSE PAST PAPERS 2026 ', year: 2026, bgColor: 'rgba(0, 0, 0, 0.1)', textColor: 'rgb(0, 0, 0)', path: "secondary", value: "kcse/past/papers" },
        { name: 'KCSE PAST PAPERS 2025 ', year: 2025, bgColor: 'rgba(0, 0, 0, 0.2)', textColor: 'rgb(0, 0, 0)', path: "secondary", value: "kcse/past/papers" },
        { name: 'KCSE PAST PAPERS 2024 ', year: 2024, bgColor: 'rgba(0, 0, 0, 0.1)', textColor: 'rgb(0, 0, 0)', path: "secondary", value: "kcse/past/papers" }
    ];

    return (
        <>
       
        <ExamsList           
            heading="KNEC/KCSE PAST PAPERS"
            items={items}
            navigateTo="/kcse/past/papers/downloads"
        />
        </>
    );
};

export default KCSEpastPapers;
