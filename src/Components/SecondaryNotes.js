// src/components/PP2Exams.js
import React from 'react';
import ExamsList from './ExamsListPerYear';


const SecondaryNotes = ({ isLoggedIn, clearToken }) => {
    const items = [
        { name: 'SECONDARY NOTES 2026 ', year: 2026, bgColor: 'rgba(0, 0, 0, 0.2)', textColor: 'rgb(0, 0, 0)', path: "secondary", value: "notes" },
        { name: 'SECONDARY NOTES 2025 ', year: 2025, bgColor: 'rgba(0, 0, 0, 0.1)', textColor: 'rgb(0, 0, 0)', path: "secondary", value: "notes" },
        { name: 'SECONDARY NOTES 2024 ', year: 2024, bgColor: 'rgba(0, 0, 0, 0.2)', textColor: 'rgb(0, 0, 0)', path: "secondary", value: "notes" },
        { name: 'SECONDARY NOTES 2023 ', year: 2023, bgColor: 'rgba(0, 0, 0, 0.1)', textColor: 'rgb(0, 0, 0)', path: "secondary", value: "notes" }
    ];

    return (
        <>
        
        <ExamsList           
            heading="SECONDARY SECTION"
            items={items}
            navigateTo="/secondary/notes/downloads"
        />
        </>
    );
};

export default SecondaryNotes;
