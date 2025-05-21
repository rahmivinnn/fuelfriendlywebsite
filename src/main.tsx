<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { registerServiceWorker } from './utils/serviceWorkerRegistration';
import './index.css';

// Register service worker for PWA support
registerServiceWorker();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
=======
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
