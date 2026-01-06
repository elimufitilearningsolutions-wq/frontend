// src/components/PP2Exams.js
import React from 'react';

import ExamsList from './ExamsListPerYear';

const PrimaryRevisionNotes = ({ isLoggedIn, clearToken }) => {
    const items = [
        { name: '2026 PRIMARY HOLIDAY REVISION NOTES', year: 2026, bgColor: 'rgba(0, 0, 0, 0.7)', textColor: '#FFFFFF', path: "primary", value: "revision/notes" },
        { name: '2025 PRIMARY HOLIDAY REVISION NOTES', year: 2025, bgColor: 'rgba(0, 0, 0, 0.3)', textColor: 'rgb(0, 0, 0)', path: "primary", value: "revision/notes" },
        { name: '2024 PRIMARY HOLIDAY REVISION NOTES', year: 2024, bgColor: 'rgba(0, 0, 0, 0.7)', textColor: '#FFFFFF', path: "primary", value: "revision/notes" },
        { name: '2023 PRIMARY HOLIDAY REVISION NOTES', year: 2023, bgColor: 'rgba(0, 0, 0, 0.3)', textColor: 'rgb(0, 0, 0)', path: "primary", value: "revision/notes" }
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
