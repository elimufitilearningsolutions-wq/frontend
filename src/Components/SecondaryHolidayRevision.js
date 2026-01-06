// src/components/PP2Exams.js
import React from 'react';
import ExamsList from './ExamsListPerYear';


const SecondaryHolidayRevision = ({ isLoggedIn, clearToken }) => {
    const items = [
        { name: 'SECONDARY HOLIDAY REVISION 2026 ', year: 2026, bgColor: 'rgba(0, 0, 0, 0.2)', textColor: 'rgb(0, 0, 0)', path: "secondary", value: "holiday/revisions" },
        { name: 'SECONDARY HOLIDAY REVISION 2025 ', year: 2025, bgColor: 'rgba(0, 0, 0, 0.1)', textColor: 'rgb(0, 0, 0)', path: "secondary", value: "holiday/revisions" },
        { name: 'SECONDARY HOLIDAY REVISION 2024 ', year: 2024, bgColor: 'rgba(0, 0, 0, 0.2)', textColor: 'rgb(0, 0, 0)', path: "secondary", value: "holiday/revisions" },
        { name: 'SECONDARY HOLIDAY REVISION 2023 ', year: 2023, bgColor: 'rgba(0, 0, 0, 0.1)', textColor: 'rgb(0, 0, 0)', path: "secondary", value: "holiday/revisions" }
    ];

    return (
        <>
        
        <ExamsList           
            heading="SECONDARY HOLIDAY REVISION"
            items={items}
            navigateTo="/secondary/holiday/revision/downloads"
        />
        </>
    );
};

export default SecondaryHolidayRevision;
