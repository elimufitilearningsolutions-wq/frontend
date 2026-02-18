// src/components/Grade10Examinations.js
import React from 'react';
import ExamsList from './ExamsListPerYear';

const Grade10Examinations = ({ isLoggedIn, clearToken }) => {
    const items = [
        { name: 'GRADE 10 EXAMINATIONS 2026', year: 2026, bgColor: 'rgba(0, 0, 0, 0.2)', textColor: 'rgb(0, 0, 0)', path: "senior/school", value: "grade10/examinations" },
        { name: 'GRADE 10 EXAMINATIONS 2025', year: 2025, bgColor: 'rgba(0, 0, 0, 0.1)', textColor: 'rgb(0, 0, 0)', path: "senior/school", value: "grade10/examinations" },

    ];

    return (
        <ExamsList           
            heading="GRADE 10"
            items={items}
            navigateTo="/grade10/examinations/downloads"
        />
    );
};

export default Grade10Examinations
