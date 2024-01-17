import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

if (window.location.href.includes('tauri.localhost')) {
    document.addEventListener('contextmenu', (e) => e.preventDefault());
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
