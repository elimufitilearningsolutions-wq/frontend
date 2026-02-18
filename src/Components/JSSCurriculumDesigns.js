// src/components/PP2Exams.js
import React from 'react';
import ExamsList from './ExamsListPerYear';


const JSSCurriculumDesigns = ({ isLoggedIn, clearToken }) => {
    const items = [
        { name: 'JUNIOR SCHOOL CURRICULUM DESIGN 2026 ', year: 2026, bgColor: 'rgba(0, 0, 0, 0.2)', textColor: 'rgb(0, 0, 0)', path: "jss", value: "curriculum/designs" },
        { name: 'JUNIOR SCHOOL CURRICULUM DESIGN 2025 ', year: 2025, bgColor: 'rgba(0, 0, 0, 0.1)', textColor: 'rgb(0, 0, 0)', path: "jss", value: "curriculum/designs" },

    ];

    return (
        <>
     
        <ExamsList           
            heading="JUNIOR SCHOOL CURRICULUM DESIGN"
            items={items}
            navigateTo="/jss/curriculum/designs/download"
        />
        </>
    );
};

export default JSSCurriculumDesigns;
