import React from 'react';
import ReactDOM from 'react-dom/client';
// Le nouveau chemin vers notre composant App !
import App from './components/App/App'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);