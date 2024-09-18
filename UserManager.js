import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './UserManager.css';

const UserManager = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({ nom: '', email: '', mdp: '', role: '' });
    const [editing, setEditing] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axios.get(`/api/users/${id}`)
                .then(({ data }) => setUser(data))
                .catch(error => {
                    console.error('Erreur de chargement de l\'utilisateur:', error);
                    alert('Erreur de chargement de l\'utilisateur');
                });
            setEditing(true);
        } else {
            axios.get('/api/users') // Vérifiez cette URL
                .then(response => {
                    setUsers(response.data);
                })
                .catch(error => {
                    console.error('Erreur de chargement des utilisateurs:', error);
                    alert('Erreur de chargement des utilisateurs');
                });
        }
    }, [id]);

    const handleChange = ({ target: { name, value } }) => {
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        const request = editing 
            ? axios.put(`/api/users/${id}`, user)
            : axios.post('/api/users', user);
        request
            .then(() => {
                alert(`Utilisateur ${editing ? 'modifié' : 'ajouté'}`);
                navigate('/users');
            })
            .catch(error => {
                console.error('Erreur lors de la soumission de l\'utilisateur:', error);
                alert('Erreur lors de la soumission de l\'utilisateur');
            });
    };

    const handleDelete = () => {
        axios.delete(`/api/users/${id}`)
            .then(() => {
                alert('Utilisateur supprimé');
                navigate('/users');
            })
            .catch(error => {
                console.error('Erreur lors de la suppression de l\'utilisateur:', error);
                alert('Erreur lors de la suppression de l\'utilisateur');
            });
    };

    return (
        <div>
            <h2>{editing ? 'Éditer' : 'Ajouter'} un Utilisateur</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom:</label>
                    <input
                        type="text"
                        name="nom"
                        value={user.nom}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Mot de passe:</label>
                    <input
                        type="password"
                        name="mdp"
                        value={user.mdp}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Rôle:</label>
                    <input
                        type="text"
                        name="role"
                        value={user.role}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">{editing ? 'Modifier' : 'Ajouter'}</button>
            </form>
            {editing && <button onClick={handleDelete}>Supprimer</button>}
            {!editing && (
                <div>
                    <h2>Liste des Utilisateurs</h2>
                    <ul>
                        {users.map(({ idUser, nom, email }) => (
                            <li key={idUser}>
                                {nom} ({email})
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserManager;