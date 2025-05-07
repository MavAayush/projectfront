import React, { createContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

export const LoginContext = createContext(null);

const ContextProvider = ({ children }) => {
    const [account, setAccount] = useState("");
    const { user, isSignedIn } = useUser();

    // Sync with Clerk authentication
    useEffect(() => {
        if (isSignedIn && user) {
            // When user signs in with Clerk
            fetchUserData(user.id);
        } else {
            // When user signs out
            setAccount("");
        }
    }, [isSignedIn, user]);

    // Fetch user data from your backend using Clerk ID
    const fetchUserData = async (clerkId) => {
        try {
            // Check if user exists in your database
            const res = await fetch('https://projectbackend-d5qv.onrender.com"/get-user-by-clerk', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'clerkid': clerkId
                }
            });

            if (res.status === 200) {
                const userData = await res.json();
                setAccount(userData);
            } else if (res.status === 404) {
                // User not found, register them
                registerNewUser(clerkId);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    // Register a new user based on Clerk data
    const registerNewUser = async (clerkId) => {
        if (!user) return;

        try {
            const res = await fetch('https://projectbackend-d5qv.onrender.com"/register-clerk-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    clerkId: clerkId
                })
            });

            if (res.status === 201) {
                const userData = await res.json();
                setAccount(userData);
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <LoginContext.Provider value={{ account, setAccount }}>
            {children}
        </LoginContext.Provider>
    );
};

export default ContextProvider;
