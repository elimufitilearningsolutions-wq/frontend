// src/components/Grade10Examinations.js
import React from 'react';
import ExamsList from './ExamsListPerYear';


const SeniorSchoolCurriculumDesign = ({ isLoggedIn, clearToken }) => {
    const items = [
        { name: 'SENIOR SCHOOLS CURRICUM DESIGNS 2026', year: 2026, bgColor: 'rgba(0, 0, 0, 0.2)', textColor: 'rgb(0, 0, 0)', path: "senior/school", value: "curriculum/designs" },
        { name: 'SENIOR SCHOOLS CURRICUM DESIGNS 2025', year: 2025, bgColor: 'rgba(0, 0, 0, 0.1)', textColor: 'rgb(0, 0, 0)', path: "senior/school", value: "curriculum/designs" },

    ];

    return (
        <ExamsList           
            heading="CURRICULUM DESIGN"
            items={items}
            navigateTo="/senior/school/curriculum/design/downloads"
        />
    );
};

export default SeniorSchoolCurriculumDesign;
