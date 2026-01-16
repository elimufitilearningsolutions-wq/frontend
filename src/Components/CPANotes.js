// src/components/PP2Exams.js
import React from 'react';
import ExamsList from './ExamsListPerYear';


const CPANotes = ({ isLoggedIn, clearToken }) => {
    const items = [
        { name: 'CPA NOTES 2026 ', year: 2026, bgColor: 'rgba(0, 0, 0, 0.1)', textColor: 'rgb(0, 0, 0)', path: "college", value: "cpa/notes" },//the value corresponds to the download navigations
        { name: 'CPA NOTES 2025 ', year: 2025, bgColor: 'rgba(0, 0, 0, 0.2)', textColor: 'rgb(0, 0, 0)', path: "college", value: "cpa/notes" },      
       
    ];

    return (
        <>
       
        <ExamsList           
            heading="CPA NOTES"
            items={items}
            navigateTo="/cpa/notes/downloads"
        />
        </>
    );
};

export default CPANotes;
