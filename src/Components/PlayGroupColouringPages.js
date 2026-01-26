// src/components/PP2Exams.js
import React from 'react';
import ExamsList from './ExamsListPerYear';


const PlayGroupColouring = ({ isLoggedIn, clearToken }) => {
    const items = [
        { name: 'PLAY GROUP 2026 EXAMS', year: 2026,  textColor: 'rgb(0, 0, 0)', path: "pre/primary", value: "play/group/colouring" },
        { name: 'PLAY GROUP 2025 EXAMS', year: 2025,  textColor: 'rgb(0, 0, 0)', path: "pre/primary", value: "play/group/colouring" }
        
    ];

    return (
        <>
        
        <ExamsList           
            heading="PLAY GROUP EXAMINATIONS"
            items={items}
            navigateTo="/play/group/colouring/downloads"
        />
        </>
    );
};

export default PlayGroupColouring;
