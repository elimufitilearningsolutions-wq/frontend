
import React from 'react';
import ExamsList from './ExamsListPerYear';

const Grade9Examinations = ({ isLoggedIn, clearToken }) => {
    const items = [
        { name: 'GRADE 9 EXAMINATIONS 2026', year: 2026, bgColor: 'rgba(0, 0, 0, 0.2)', textColor: 'rgb(0, 0, 0)', path: "jss", value: "grade9/examinations" },
        { name: 'GRADE 9 EXAMINATIONS 2025', year: 2025, bgColor: 'rgba(0, 0, 0, 0.1)', textColor: 'rgb(0, 0, 0)', path: "jss", value: "grade9/examinations" },

    ];

    return (
        <ExamsList           
            heading="GRADE 9"
            items={items}
            navigateTo="/grade9/examinations/downloads"
        />
    );
};

export default Grade9Examinations
