// src/components/PP2Exams.js
import React from 'react';
import ExamsList from './ExamsListPerYear';


const SeniorSchoolLessonPlans = ({ isLoggedIn, clearToken }) => {
    const items = [
        { name: 'SENIOR SCHOOL LESSON PLANS 2026 ', year: 2026, bgColor: 'rgba(0, 0, 0, 0.2)', textColor: 'rgb(0, 0, 0)', path: "primary", value: "lesson/plans" },
        { name: 'SENIOR SCHOOL LESSON PLANS 2025 ', year: 2025, bgColor: 'rgba(0, 0, 0, 0.1)', textColor: 'rgb(0, 0, 0)', path: "primary", value: "lesson/plans" },
        { name: 'SENIOR SCHOOL LESSON PLANS 2024 ', year: 2024, bgColor: 'rgba(0, 0, 0, 0.2)', textColor: 'rgb(0, 0, 0)', path: "primary", value: "lesson/plans" },
        { name: 'SENIOR SCHOOL LESSON PLANS 2023 ', year: 2023, bgColor: 'rgba(0, 0, 0, 0.1)', textColor: 'rgb(0, 0, 0)', path: "primary", value: "lesson/plans" }
    ];

    return (
        <>
        
        <ExamsList           
            heading="PRIMARY LESSON PLANS"
            items={items}
            navigateTo="/senior/school/lesson/plan/downloads"
        />
        </>
    );
};

export default SeniorSchoolLessonPlans;
