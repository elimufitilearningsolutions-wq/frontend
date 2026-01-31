// src/components/PP1ExamsDownload.js
import React from 'react';
import {SchemesDownload} from '../hooks/SchemesOperations';

const JSSCurriculumDesignsDownload = ({ isAdmin, isLoggedIn, clearToken, isSubscribed}) => {
    return (
    
       
        <SchemesDownload
            isAdmin={isAdmin}
            isSubscribed={isSubscribed}
            isLoggedIn={isLoggedIn}
            clearToken={clearToken}
            heading="JUNIOR SCHOOL CURRICULUM DESIGN"
        />
        
    );
};

export default JSSCurriculumDesignsDownload;
