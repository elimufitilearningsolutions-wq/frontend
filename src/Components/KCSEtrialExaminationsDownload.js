// src/components/PP1ExamsDownload.js
import React from 'react';
import {SchemesDownload} from '../hooks/SchemesOperations';

const KCSEtrialExaminationsDownload = ({ isAdmin, isLoggedIn, clearToken , isSubscribed}) => {
    return (
    
       
        <SchemesDownload
            isAdmin={isAdmin}
            isSubscribed={isSubscribed}
            isLoggedIn={isLoggedIn}
            clearToken={clearToken}
            heading="KCSE TRIAL EXAMINATIONS"
        />
        
    );
};

export default KCSEtrialExaminationsDownload;
