// src/components/PP2Exams.js
import React from 'react';
import ExamsList from './ExamsListPerYear';


const PrePrimaryLessonPlans = ({ isLoggedIn, clearToken }) => {
    const items = [
        { name: 'PRE-PRIMARY LESSON PLANS 2026 ', year: 2026, bgColor: 'rgba(0, 0, 0, 0.2)', textColor: '#0a0a0a', path: "pre/primary", value: "lesson/plans" },
        { name: 'PRE-PRIMARY LESSON PLANS 2025 ', year: 2025, bgColor: 'rgba(0, 0, 0, 0.1)', textColor: 'rgb(0, 0, 0)', path: "pre/primary", value: "lesson/plans" },
       
    ];

    return (
        <>
        
        <ExamsList           
            heading="PRE-PRIMARY LESSON PLANS"
            items={items}
            navigateTo="/preprimary/lesson/plan/downloads"
        />
        </>
    );
};

export default PrePrimaryLessonPlans;
