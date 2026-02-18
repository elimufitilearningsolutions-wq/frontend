// src/components/PP2Exams.js
import React from 'react';
import ExamsList from './ExamsListPerYear';


const Grade1Examinations = ({ isLoggedIn, clearToken }) => {
    const items = [
        { name: 'GRADE 1 EXAMINATIONS 2026 ', year: 2026, bgColor: 'rgba(0, 0, 0, 0.2)', textColor: '#161616', path: "primary", value: "grade1/examinations" },
        { name: 'GRADE 1 EXAMINATIONS 2025 ', year: 2025, bgColor: 'rgba(0, 0, 0, 0.1)', textColor: 'rgb(0, 0, 0)', path: "primary", value: "grade1/examinations" },
      
    ];

    return (
        <>
        
        <ExamsList           
            heading="GRADE 1 EXAMINATIONS"
            items={items}
            navigateTo="/grade1/examinations/downloads"
        />
        </>
    );
};

export default Grade1Examinations;
