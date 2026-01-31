
import React from 'react';
import {SchemesDownload} from '../hooks/SchemesOperations';

const KCSEpastPapersDownload = ({ isAdmin, isLoggedIn, clearToken, isSubscribed }) => {
    return (
    
       
        <SchemesDownload
            isAdmin={isAdmin}
            isSubscribed={isSubscribed}
            isLoggedIn={isLoggedIn}
            clearToken={clearToken}
            heading="KCSE PAST PAPERS"
        />
        
    );
};

export default KCSEpastPapersDownload;
