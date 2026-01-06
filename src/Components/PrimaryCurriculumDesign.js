// src/components/PP2Exams.js
import React from 'react';
import ExamsList from './ExamsListPerYear';


const PrimaryCurriculumDesign = ({ isLoggedIn, clearToken }) => {
    const items = [
        { name: 'PRIMARY CURRICULUM DESIGNS 2026 ', year: 2026, bgColor: 'rgba(0, 0, 0, 0.2)', textColor: 'rgb(0, 0, 0)', path: "primary", value: "curriculum/designs" },
        { name: 'PRIMARY CURRICULUM DESIGNS 2025 ', year: 2025, bgColor: 'rgba(0, 0, 0, 0.1)', textColor: 'rgb(0, 0, 0)', path: "primary", value: "curriculum/designs" },
        { name: 'PRIMARY CURRICULUM DESIGNS 2024 ', year: 2024, bgColor: 'rgba(0, 0, 0, 0.2)', textColor: 'rgb(0, 0, 0)', path: "primary", value: "curriculum/designs" },
        { name: 'PRIMARY CURRICULUM DESIGNS 2023 ', year: 2023, bgColor: 'rgba(0, 0, 0, 0.1)', textColor: 'rgb(0, 0, 0)', path: "primary", value: "curriculum/designs" }
    ];

    return (
        <>
       
        <ExamsList           
            heading="PRIMARY CURRICULUM DESIGNS"
            items={items}
            navigateTo="/primary/curriculum/designs/download"
        />
        </>
    );
};

export default PrimaryCurriculumDesign;
