// src/components/PP1ExamsDownload.js
import React from 'react';
import ExamsDownload from '../hooks/ExamsDownload';

const JssLessonPlanDownloads = ({ isAdmin, isLoggedIn, clearToken, isSubscribed }) => {
    return (
    
       
        <ExamsDownload
            isAdmin={isAdmin}
            isSubscribed={isSubscribed}
            isLoggedIn={isLoggedIn}
            clearToken={clearToken}
            heading="JSS LESSON PLANS"
        />
        
    );
};

export default JssLessonPlanDownloads;
