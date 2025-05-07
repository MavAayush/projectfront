import { SignedIn, SignedOut, SignIn, SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/ContextProvider';

// Use either the deployed URL or localhost depending on your environment
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://projectbackend-d5qv.onrender.com' 
  : 'http://localhost:8005'; // Update this port if your local server uses a different port

export default function Clerk() {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();
  const { setAccount } = useContext(LoginContext);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (isSignedIn && user) {
      console.log("Clerk user signed in:", user);
      registerClerkUser(user);
    }
  }, [isSignedIn, user]);

  const registerClerkUser = async (user) => {
    try {
      setStatus('Checking if user exists in database...');
      console.log("Attempting to register Clerk user with ID:", user.id);
      
      // First check if user exists by clerkId
      const checkUserResponse = await fetch(`https://projectbackend-d5qv.onrender.com"/get-user-by-clerk`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'clerkid': user.id
        }
      });

      console.log("Check user response status:", checkUserResponse.status);
      
      if (checkUserResponse.status === 200) {
        // User exists, set account and redirect
        const userData = await checkUserResponse.json();
        console.log("User found in database:", userData);
        setStatus('User found in database, redirecting...');
        setAccount(userData);
        navigate('/');
        return;
      }

      // User doesn't exist, register them
      setStatus('Registering new user...');
      console.log("User not found, registering new user with Clerk ID:", user.id);
      
      const registerResponse = await fetch(`https://projectbackend-d5qv.onrender.com"/register-clerk-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          clerkId: user.id
        })
      });

      console.log("Register response status:", registerResponse.status);
      
      if (registerResponse.status === 201) {
        // Successfully registered
        const userData = await registerResponse.json();
        console.log("Successfully registered user:", userData);
        setStatus('Registration successful, redirecting...');
        setAccount(userData);
        navigate('/');
      } else {
        // Handle error
        const errorData = await registerResponse.json();
        console.error("Registration failed:", errorData);
        setStatus(`Registration failed: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column'}}>
      <SignIn />
      <SignedIn>
        <div style={{marginTop: '20px', textAlign: 'center'}}>
          <p>Successfully signed in with Clerk!</p>
          {status && <p>{status}</p>}
        </div>
      </SignedIn>
    </div>
  );
}