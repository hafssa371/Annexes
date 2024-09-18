import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faClipboard } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png';



const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul>
        <li>
          <Link to="/">
            <FontAwesomeIcon icon={faHome} /> Accueil
          </Link>
        </li>
        <li>
          <Link to="/users">
            <FontAwesomeIcon icon={faUsers} /> Gestion des Utilisateurs
          </Link>
        </li>
        <li>
          <Link to="/posts">
            <FontAwesomeIcon icon={faClipboard} /> Gestion des Posts
          </Link>
        </li>
      </ul>
      <div className="sidebar-footer">
      <button className="btn">Paramètres</button>
      <button className="btn btn-danger">Déconnexion</button>
      </div>
    </div>
  );
}

export default Sidebar;