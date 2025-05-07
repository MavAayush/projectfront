import { SignedIn, SignedOut, SignIn, SignInButton, UserButton } from '@clerk/clerk-react';

export default function Clerk() {
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
     {/* <SignInButton /> */}
     <SignIn></SignIn>
    </div>
  );
}