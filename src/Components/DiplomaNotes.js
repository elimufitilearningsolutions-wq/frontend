// src/components/PP2Exams.js
import React from 'react';
import ExamsList from './ExamsListPerYear';


const DiplomaNotes = ({ isLoggedIn, clearToken }) => {
    const items = [
        { name: 'DIPLOMA NOTES 2026 ', 
            year: 2026, 
            bgColor: 'rgba(0, 0, 0, 0.2)', 
            textColor: '#FFFFFF', 
            path: "college", 
            value: "ecd/notes" },
       
    ];

    return (
        <>
        
        <ExamsList           
            heading="DIPLOMA IN PRIMARY EDUCATION"
            items={items}
            navigateTo="/diploma/notes/downloads"
        />
        </>
    );
};

export default DiplomaNotes;
