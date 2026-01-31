// src/components/PP1ExamsDownload.js
import React from 'react';
import {SchemesDownload} from '../hooks/SchemesOperations';

const  SeniorSchoolNotesDownloads= ({ isAdmin, isLoggedIn, clearToken , isSubscribed}) => {
    return (
    
       
        <SchemesDownload
            isAdmin={isAdmin}
            isSubscribed={isSubscribed}
            isLoggedIn={isLoggedIn}
            clearToken={clearToken}
            heading="SENIOR SCHOOL NOTES"
        />
        
    );
};

export default SeniorSchoolNotesDownloads;
