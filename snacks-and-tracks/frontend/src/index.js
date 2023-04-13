import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  // <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  // </React.StrictMode>
);