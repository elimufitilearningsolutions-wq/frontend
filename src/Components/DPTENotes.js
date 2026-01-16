// src/components/PP2Exams.js
import React from 'react';
import ExamsList from './ExamsListPerYear';


const DPTENotes = ({ isLoggedIn, clearToken }) => {
    const items = [
        { name: 'DIPLOMA IN PRIMARY EDUCATION 2026 ', 
            year: 2026, 
            bgColor: 'rgba(0, 0, 0, 0.2)', 
            textColor: '#FFFFFF', 
            path: "college", 
            value: "dpte/notes" },
       
    ];

    return (
        <>
        
        <ExamsList           
            heading="DIPLOMA IN PRIMARY EDUCATION"
            items={items}
            navigateTo="/dpte/notes/downloads"
        />
        </>
    );
};

export default DPTENotes;
