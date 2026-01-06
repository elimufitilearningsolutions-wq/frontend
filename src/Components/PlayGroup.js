// src/components/PP2Exams.js
import React from 'react';
import ExamsList from './ExamsListPerYear';


const PlayGroupExaminations = ({ isLoggedIn, clearToken }) => {
    const items = [
        { name: 'PLAY GROUP 2026 EXAMS', year: 2026,  textColor: 'rgb(0, 0, 0)', path: "pre/primary", value: "play/group/exams" },
        { name: 'PLAY GROUP 2025 EXAMS', year: 2025,  textColor: 'rgb(0, 0, 0)', path: "pre/primary", value: "play/group/exams" },
        { name: 'PLAY GROUP 2024 EXAMS', year: 2024,   textColor: 'rgb(0, 0, 0)', path: "pre/primary", value: "play/group/exams" },
        { name: 'PLAY GROUP 2023 EXAMS', year: 2023,  textColor: 'rgb(0, 0, 0)', path: "pre/primary", value: "play/group/exams" }
    ];

    return (
        <>
        
        <ExamsList           
            heading="PLAY GROUP EXAMINATIONS"
            items={items}
            navigateTo="/play/group/exams/download"
        />
        </>
    );
};

export default PlayGroupExaminations;
