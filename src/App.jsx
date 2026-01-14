import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import {jwtDecode} from 'jwt-decode'; // Correct import
import { clearToken } from './utils';
import config from './config';

const App = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);

    // Check authentication and decode JWT token
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
       // console.log("app.js token",token)
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const [userId, isAdmin] = decodedToken.payload; // Destructure userId and isAdmin
                //console.log("payload", decodedToken.payload);
    
                setUserId(userId);
                setIsLoggedIn(true); // User is logged in
    
                // Check if isAdmin is truthy (e.g., "1", true, or any other truthy value)
                if (isAdmin === "1" || isAdmin === true) {
                    setIsAdmin(true); // Set admin status
                } else {
                    setIsAdmin(false); // Set non-admin status
                }
            } catch (error) {
                console.error('Error decoding token:', error);
                clearToken(setIsLoggedIn, setUserId, setIsSubscribed);
            }
        } else {
            // No token, user is not logged in
            setIsLoggedIn(false);
        }
    }, []);
    

    // Fetch subscription status when userId is set (if not included in the token)  

    useEffect(() => {
        const fetchAdministrationStatus = async () => {
            if (userId) { // Only fetch if userId is available
                try {
                    const apiUrl = config.API_BASE_URL;
                    const url = `${apiUrl}/api/subscriptions/admin/status/${userId}`;
                   // console.log('Fetching admins status from URL:', url);

                    const response = await fetch(url);
                    const data = await response.json();

                    if (response.ok) {
                        const adminStatus = data.isAdmin > 0; // Assuming Amount indicates subscription
                        setIsAdmin(adminStatus);
                        
                    } else {
                        console.error('Admin fetch error:', data.message);
                    }
                } catch (error) {
                    console.error('Error fetching admin:', error);
                }
            }
        };

        fetchAdministrationStatus();
    }, [userId]);  
    


    return (
        <BrowserRouter>
            <AppRoutes
                isSubscribed={isSubscribed}
                isLoggedIn={isLoggedIn}
                userId={userId}
                isAdmin={isAdmin}
                clearToken={() => clearToken(setIsLoggedIn, setUserId, setIsSubscribed)}
            />
        </BrowserRouter>
    );
};

export default App;
