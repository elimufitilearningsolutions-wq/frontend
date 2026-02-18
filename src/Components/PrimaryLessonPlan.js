// src/components/PP2Exams.js
import React from 'react';
import ExamsList from './ExamsListPerYear';


const PrimaryLessonPlans = ({ isLoggedIn, clearToken }) => {
    const items = [
        { name: 'PRIMARY LESSON PLANS 2026 ', year: 2026, bgColor: 'rgba(0, 0, 0, 0.2)', textColor: 'rgb(0, 0, 0)', path: "primary", value: "lesson/plans" },
        { name: 'PRIMARY LESSON PLANS 2025 ', year: 2025, bgColor: 'rgba(0, 0, 0, 0.1)', textColor: 'rgb(0, 0, 0)', path: "primary", value: "lesson/plans" },

    ];

    return (
        <>
        
        <ExamsList           
            heading="PRIMARY LESSON PLANS"
            items={items}
            navigateTo="/primary/lesson/plan/downloads"
        />
        </>
    );
};

export default PrimaryLessonPlans;
