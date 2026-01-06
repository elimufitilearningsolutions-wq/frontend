// src/components/PP2Exams.js
import React from 'react';
import ExamsList from './ExamsListPerYear';


const JSSFullSetExaminations = ({ isLoggedIn, clearToken }) => {
    const items = [
        { name: 'JUNIOR SCHOOL EXAMINATIONS 2026 ', year: 2026, bgColor: 'rgba(0, 0, 0, 0.2)', textColor: 'rgb(0, 0, 0)', path: "jss", value: "fullset/examinations" },
        { name: 'JUNIOR SCHOOL EXAMINATIONS 2025 ', year: 2025, bgColor: 'rgba(0, 0, 0, 0.1)', textColor: 'rgb(0, 0, 0)', path: "jss", value: "fullset/examinations" },
        { name: 'JUNIOR SCHOOL EXAMINATIONS 2024 ', year: 2024, bgColor: 'rgba(0, 0, 0, 0.2)', textColor: 'rgb(0, 0, 0)', path: "jss", value: "fullset/examinations" },
        { name: 'JUNIOR SCHOOL EXAMINATIONS 2023 ', year: 2023, bgColor: 'rgba(0, 0, 0, 0.1)', textColor: 'rgb(0, 0, 0)', path: "jss", value: "fullset/examinations" }//value creates part of backend url
    ];

    return (
        <>
       
        <ExamsList           
            heading="JUNIOR SCHOOL FULL SET EXAMINATIONS"
            items={items}
            navigateTo="/jss/fullset/examinations/download"
        />
        </>
    );
};

export default JSSFullSetExaminations;
