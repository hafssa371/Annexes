import React from 'react';
import './NotFound.css'; 

function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Page non trouvée</p>
      <a href="/">Retour à l'accueil</a>
    </div>
  );
}

export default NotFound;