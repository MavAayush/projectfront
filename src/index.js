import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import ContextProvider from './components/context/ContextProvider';
import { ClerkProvider } from '@clerk/clerk-react';

const PUBLISHABLE_KEY = "pk_test_dG91Y2hlZC1wYW5nb2xpbi00Mi5jbGVyay5hY2NvdW50cy5kZXYk";

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk Publishable Key');
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <Provider store={store}>
        <ContextProvider>
          <BrowserRouter>
            <ThemeProvider theme={createTheme()}>
              <App />
            </ThemeProvider>
          </BrowserRouter>
        </ContextProvider>
      </Provider>
    </ClerkProvider>
  </React.StrictMode>
);

reportWebVitals();
