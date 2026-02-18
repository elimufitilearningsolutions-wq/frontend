// src/components/PP2Exams.js
import React from 'react';
import ExamsList from './ExamsListPerYear';


const JssLessonPlans = ({ isLoggedIn, clearToken }) => {
    const items = [
        { name: 'JSS LESSON PLANS 2026 ', year: 2026, bgColor: 'rgba(0, 0, 0, 0.2)', textColor: '#171717', path: "jss", value: "lesson/plans" },
        { name: 'JSS LESSON PLANS 2025 ', year: 2025, bgColor: 'rgba(0, 0, 0, 0.1)', textColor: 'rgb(0, 0, 0)', path: "jss", value: "lesson/plans" },
        
    ];

    return (
        <>
        
        <ExamsList           
            heading="GRADE 1 EXAMINATIONS"
            items={items}
            navigateTo="/jss/lesson/plan/downloads"
        />
        </>
    );
};

export default JssLessonPlans;
