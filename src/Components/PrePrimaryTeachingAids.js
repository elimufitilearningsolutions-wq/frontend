// src/components/PP2Exams.js
import React from 'react';
import ExamsList from './ExamsListPerYear';


const PrePrimaryTeachingAids = ({ isLoggedIn, clearToken }) => {
    const items = [
        { name: 'PRE-PRIMARY TEACHING AIDS 2026 ', year: 2026, bgColor: 'rgba(0, 0, 0, 0.2)', textColor: '#1a1a1a', path: "pre/primary", value: "teaching/aids" },
        { name: 'PRE-PRIMARY TEACHING AIDS 2025 ', year: 2025, bgColor: 'rgba(0, 0, 0, 0.1)', textColor: 'rgb(0, 0, 0)', path: "pre/primary", value: "teaching/aids" },
        
    ];

    return (
        <>
        
        <ExamsList           
            heading="PRE-PRIMARY LESSON PLANS"
            items={items}
            navigateTo="/preprimary/teaching/aid/downloads"
        />
        </>
    );
};

export default PrePrimaryTeachingAids;
