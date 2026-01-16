// src/components/PP1ExamsDownload.js
import React from 'react';
import {SchemesDownload} from '../hooks/SchemesOperations';

const DPTENotesDownloads = ({ isAdmin, isLoggedIn, clearToken ,isSubscribed}) => {
    return (
    
       
        <SchemesDownload
            isAdmin={isAdmin}
            isSubscribed={isSubscribed}
            isLoggedIn={isLoggedIn}
            clearToken={clearToken}
            heading="Diploma in Primary Teacher Education (DPTE) Notes"
        />
        
    );
};

export default DPTENotesDownloads ;
