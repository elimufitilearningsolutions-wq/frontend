
import React from 'react';
import ExamsDownload from '../hooks/ExamsDownload';

const SeniorSchoolSchemesDownload = ({ isAdmin, isLoggedIn, clearToken, isSubscribed }) => {
    return (
    
       
        <ExamsDownload
            isAdmin={isAdmin}
            isSubscribed={isSubscribed}
            isLoggedIn={isLoggedIn}
            clearToken={clearToken}
            heading="SENIOR SCHOOL SCHEMES"
        />
        
    );
};

export default SeniorSchoolSchemesDownload;
