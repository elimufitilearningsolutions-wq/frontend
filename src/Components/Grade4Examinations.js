// src/components/PP2Exams.js
import React from 'react';
import ExamsList from './ExamsListPerYear';


const Grade4Examinations = ({ isLoggedIn, clearToken }) => {
    const items = [
        { name: 'GRADE 4 EXAMINATIONS 2026 ', year: 2026, bgColor: 'rgba(0, 0, 0, 0.2)', textColor: 'rgb(0, 0, 0)', path: "primary", value: "grade4/examinations" },
        { name: 'GRADE 4 EXAMINATIONS 2025 ', year: 2025, bgColor: 'rgba(0, 0, 0, 0.1)', textColor: 'rgb(0, 0, 0)', path: "primary", value: "grade4/examinations" },
        { name: 'GRADE 4 EXAMINATIONS 2024 ', year: 2024, bgColor: 'rgba(0, 0, 0, 0.2)', textColor: 'rgb(0, 0, 0)', path: "primary", value: "grade4/examinations" },
        { name: 'GRADE 4 EXAMINATIONS 2023 ', year: 2023, bgColor: 'rgba(0, 0, 0, 0.1)', textColor: 'rgb(0, 0, 0)', path: "primary", value: "grade4/examinations" }
    ];

    return (
        <>

        <ExamsList           
            heading="GRADE 4 EXAMINATIONS"
            items={items}
            navigateTo="/grade4/examinations/downloads"
        />
        </>
    );
};

export default Grade4Examinations;
