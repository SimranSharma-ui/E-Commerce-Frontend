import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { ProductProvider } from './Contaxt/ProductProvider.jsx';

import { AuthProvider } from './Contaxt/AuthContaxt.jsx';
import { AdminProvider } from './Contaxt/AdminContaxt.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
    <AuthProvider>
      <AdminProvider>
        <ProductProvider>
          
            <App />
         
        </ProductProvider>
      </AdminProvider>
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
