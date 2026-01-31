
import React from 'react';
import {SchemesDownload} from '../hooks/SchemesOperations';

const SeniorSchoolSchemesDownload = ({ isAdmin, isLoggedIn, clearToken, isSubscribed }) => {
    return (
    
       
        <SchemesDownload
            isAdmin={isAdmin}
            isSubscribed={isSubscribed}
            isLoggedIn={isLoggedIn}
            clearToken={clearToken}
            heading="SENIOR SCHOOL SCHEMES"
        />
        
    );
};

export default SeniorSchoolSchemesDownload;
