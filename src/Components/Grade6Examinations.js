// src/components/PP2Exams.js
import React from 'react';
import ExamsList from './ExamsListPerYear';


const Grade6Examinations = ({ isLoggedIn, clearToken }) => {
    const items = [
        { name: 'GRADE 6 EXAMINATIONS 2026 ', year: 2026, bgColor: 'rgba(0, 0, 0, 0.2)', textColor: 'rgb(0, 0, 0)', path: "primary", value: "grade6/examinations" },
        { name: 'GRADE 6 EXAMINATIONS 2025 ', year: 2025, bgColor: 'rgba(0, 0, 0, 0.1)', textColor: 'rgb(0, 0, 0)', path: "primary", value: "grade6/examinations" },
        { name: 'GRADE 6 EXAMINATIONS 2024 ', year: 2024, bgColor: 'rgba(0, 0, 0, 0.2)', textColor: 'rgb(0, 0, 0)', path: "primary", value: "grade6/examinations" },
        { name: 'GRADE 6 EXAMINATIONS 2023 ', year: 2023, bgColor: 'rgba(0, 0, 0, 0.1)', textColor: 'rgb(0, 0, 0)', path: "primary", value: "grade6/examinations" }
    ];

    return (
        <>

        <ExamsList           
            heading="GRADE 6 EXAMINATIONS"
            items={items}
            navigateTo="/grade6/examinations/downloads"
        />
        </>
    );
};

export default Grade6Examinations;
