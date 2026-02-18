// src/components/PP2Exams.js
import React from 'react';

import ExamsList from './ExamsListPerYear';

const PrimaryRevisionNotes = ({ isLoggedIn, clearToken }) => {
    const items = [
        { name: '2026 PRIMARY HOLIDAY REVISION NOTES', year: 2026, bgColor: 'rgba(0, 0, 0, 0.7)', textColor: '#0d0d0d', path: "primary", value: "revision/notes" },
        { name: '2025 PRIMARY HOLIDAY REVISION NOTES', year: 2025, bgColor: 'rgba(0, 0, 0, 0.3)', textColor: 'rgb(0, 0, 0)', path: "primary", value: "revision/notes" },

    ];

    return (
       <>
      
        <ExamsList
           
            heading="PRIMARY REVISION NOTES"
            items={items}
            navigateTo="/primary/revision/notes/downloads"
        />
       </>
    );
};

export default PrimaryRevisionNotes;
