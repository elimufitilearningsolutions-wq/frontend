// src/components/PP1ExamsDownload.js
import React from 'react';
import {SchemesDownload} from '../hooks/SchemesOperations';

const  SeniorSchoolCurriculumDesignDownloads= ({ isAdmin, isLoggedIn, clearToken , isSubscribed}) => {
    return (
    
       
        <SchemesDownload
            isAdmin={isAdmin}
            isSubscribed={isSubscribed}
            isLoggedIn={isLoggedIn}
            clearToken={clearToken}
            heading="SENIOR SCHOOL CURRICULUM DESIGN"
        />
        
    );
};

export default SeniorSchoolCurriculumDesignDownloads;
