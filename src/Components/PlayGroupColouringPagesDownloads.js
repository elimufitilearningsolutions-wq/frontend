// src/components/PP1ExamsDownload.js
import React from 'react';
import ExamsDownload from '../hooks/ExamsDownload';

const PlayGroupColouringDownloads = ({ isAdmin, isLoggedIn, clearToken, isSubscribed }) => {
    return (
    
       
        <ExamsDownload
            isAdmin={isAdmin}
            isSubscribed={isSubscribed}
            isLoggedIn={isLoggedIn}
            clearToken={clearToken}
            heading="PLAY GROUP COLOURING PAGES"
        />
        
    );
};

export default PlayGroupColouringDownloads;
