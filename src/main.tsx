import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
// import { AuthProvider } from './contexts/AuthContext';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      {/* <AuthProvider> */}
        <App />
        <Toaster position="top-right" />
      {/* </AuthProvider> */}
    </BrowserRouter>
  </StrictMode>
);