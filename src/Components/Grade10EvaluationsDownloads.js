// src/components/PP1ExamsDownload.js
import React from 'react';
import {SchemesDownload} from '../hooks/SchemesOperations';

const Grade10EvaluationsDownload = ({ isAdmin, isLoggedIn, clearToken, isSubscribed }) => {
    return (
    
       
        <SchemesDownload
            isAdmin={isAdmin}
            isSubscribed={isSubscribed}
            isLoggedIn={isLoggedIn}
            clearToken={clearToken}
            heading="GRADE 10 EVALUATIONS"
        />
        
    );
};

export default Grade10EvaluationsDownload;
