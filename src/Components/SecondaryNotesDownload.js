// src/components/PP1ExamsDownload.js
import React from 'react';
import {SchemesDownload} from '../hooks/SchemesOperations';

const  SecondaryNotesDownload= ({ isAdmin, isLoggedIn, clearToken , isSubscribed}) => {
    return (
    
       
        <SchemesDownload
            isAdmin={isAdmin}
            isSubscribed={isSubscribed}
            isLoggedIn={isLoggedIn}
            clearToken={clearToken}
            heading="SECONDARY REVISION NOTES"
        />
        
    );
};

export default SecondaryNotesDownload;
