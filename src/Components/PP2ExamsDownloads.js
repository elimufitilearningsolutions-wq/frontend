// src/components/PP1ExamsDownload.js
import React from 'react';
import {SchemesDownload} from '../hooks/SchemesOperations';

const PP2ExamsDownload = ({ isAdmin, isLoggedIn, clearToken , isSubscribed}) => {
    return (
        <SchemesDownload
            isAdmin={isAdmin}
            isSubscribed={isSubscribed}
            isLoggedIn={isLoggedIn}
            clearToken={clearToken}
            heading="PP2 SECTION"
        />
    );
};

export default PP2ExamsDownload;
