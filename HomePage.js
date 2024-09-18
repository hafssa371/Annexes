import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
      axios.get('/api/dashboard-data')
          .then(response => setData(response.data))
          .catch(error => console.error('Erreur de chargement des données:', error));
  }, []);

  const handleSearch = (e) => {
      setSearchTerm(e.target.value);
  };

  const filteredData = data.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <div className="home-page">
          <h1>Bienvenue sur votre espace GesApp</h1>
          <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={handleSearch}
          />
          <div className="dashboard">
              <h2>Statistiques Récentes</h2>
              <ul>
                  {filteredData.map(item => (
                      <li key={item.id}>{item.name} - {item.value}</li>
                  ))}
              </ul>
          </div>
      </div>
  );
};


export default HomePage;