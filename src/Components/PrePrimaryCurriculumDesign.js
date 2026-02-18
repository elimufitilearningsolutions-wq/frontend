// src/components/PP2Exams.js
import React from 'react';
import ExamsList from './ExamsListPerYear';


const PrePrimaryCurriculumDesign = ({ isLoggedIn, clearToken }) => {
    const items = [
        { name: 'PRE PRIMARY CURRICULUM DESIGNS 2026 ', year: 2026, bgColor: 'rgba(0, 0, 0, 0.2)', textColor: 'rgb(0, 0, 0)', path: "pre/primary", value: "curriculum/designs" },
        { name: 'PRE PRIMARY CURRICULUM DESIGNS 2025 ', year: 2025, bgColor: 'rgba(0, 0, 0, 0.1)', textColor: 'rgb(0, 0, 0)', path: "pre/primary", value: "curriculum/designs" },

    ];

    return (
        <>
        
        <ExamsList           
            heading="PRE PRIMARY CURRICULUM DESIGNS"
            items={items}
            navigateTo="/pre/primary/curriculum/designs/downloads"
        />
        </>
    );
};

export default PrePrimaryCurriculumDesign;
