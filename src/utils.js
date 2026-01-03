import axios from 'axios';
import config from './config';

export const clearToken = async (setIsLoggedIn, setUserId, setIsSubscribed) => {
    const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
    console.log("logged out userId", userId);
    const baseUrl = config.API_BASE_URL; // Ensure the environment variable is correctly spelled
    const accessToken = localStorage.getItem("accessToken");

    try {
        if (userId && accessToken) {
            // Call the logout endpoint
            await axios.post(`${baseUrl}/api/logout/${userId}`, {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}` // Include the token
                }
            });
            console.log("Logout successful");

            // Clear local storage only after a successful API call
            localStorage.removeItem('accessToken');
        } else {
            console.warn("Missing userId or accessToken. Skipping API call.");
        }
    } catch (error) {
        console.error("Error during logout API call:", error.response?.data?.errorMessage || error.message);
    } finally {
        // Clear user ID and reset state regardless of API response
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
        setUserId(null);
        setIsSubscribed(false); // Reset the subscription status on logout

        // Redirect to the home page or login page
       // window.location.href = "/login";
    }
};
