// src/components/PP2Exams.js
import React from 'react';
import ExamsList from './ExamsListPerYear';


const JSSNotes= ({ isLoggedIn, clearToken }) => {
    const items = [
        { name: 'JUNIOR SECONDARY SCHOOL 2026 NOTES ', year: 2026, bgColor: 'rgba(0, 0, 0, 0.2)', textColor: 'rgb(0, 0, 0)', path: "jss", value: "notes" },
        { name: 'JUNIOR SECONDARY SCHOOL NOTES 2025 ', year: 2025, bgColor: 'rgba(0, 0, 0, 0.1)', textColor: 'rgb(0, 0, 0)', path: "jss", value: "notes" },
        
    ];

    return (
        <>
     
        <ExamsList           
            heading="JUNIOR SECONDARY SCHOOL NOTES"
            items={items}
            navigateTo="/jss/notes/download"
        />
        </>
    );
};

export default JSSNotes
