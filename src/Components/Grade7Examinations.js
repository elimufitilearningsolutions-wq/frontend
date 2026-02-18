// src/components/PP2Exams.js
import React from 'react';
import ExamsList from './ExamsListPerYear';


const Grade8Examinations = ({ isLoggedIn, clearToken }) => {
    const items = [
        { name: 'GRADE 7 EXAMINATIONS 2026 ', year: 2026, bgColor: 'rgba(0, 0, 0, 0.2)', textColor: 'rgb(0, 0, 0)', path: "jss", value: "grade7/examinations" },
        { name: 'GRADE 7 EXAMINATIONS 2025 ', year: 2025, bgColor: 'rgba(0, 0, 0, 0.1)', textColor: 'rgb(0, 0, 0)', path: "jss", value: "grade7/examinations" },

    ];

    return (
        <>
        
        <ExamsList           
            heading="GRADE 7"
            items={items}
            navigateTo="/grade7/examinations/download"
        />
        </>
    );
};

export default Grade8Examinations;
