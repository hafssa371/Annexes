import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './PostManager.css';

const PostManager = () => {
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState({ titre: '', contenu: '', user_id: '' });
    const [users, setUsers] = useState([]);
    const [editing, setEditing] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axios.get(`/api/posts/${id}`)
                .then(({ data }) => setPost(data))
                .catch(error => console.error('Erreur de chargement du post:', error));
            setEditing(true);
        } else {
            axios.get('/api/posts')
                .then(({ data }) => setPosts(data))
                .catch(error => console.error('Erreur de chargement des posts:', error));
        }

        axios.get('/api/users')
            .then(({ data }) => setUsers(data))
            .catch(error => console.error('Erreur de chargement des utilisateurs:', error));
    }, [id]);

    const handleChange = ({ target: { name, value } }) => {
        setPost(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        const request = editing 
            ? axios.put(`/api/posts/${id}`, post)
            : axios.post('/api/posts', post);
        request
            .then(() => {
                alert(`Post ${editing ? 'modifié' : 'ajouté'}`);
                navigate('/posts');
            })
            .catch(error => {
                console.error('Erreur lors de la soumission du post:', error);
                alert('Erreur lors de la soumission du post');
            });
    };

    const handleDelete = () => {
        axios.delete(`/api/posts/${id}`)
            .then(() => {
                alert('Post supprimé');
                navigate('/posts');
            })
            .catch(error => {
                console.error('Erreur lors de la suppression du post:', error);
                alert('Erreur lors de la suppression du post');
            });
    };

    return (
        <div>
            <h2>{editing ? 'Éditer' : 'Ajouter'} un Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Titre:</label>
                    <input type="text" name="titre" value={post.titre} onChange={handleChange} required />
                </div>
                <div>
                    <label>Contenu:</label>
                    <textarea name="contenu" value={post.contenu} onChange={handleChange} required />
                </div>
                <div>
                    <label>Utilisateur:</label>
                    <select name="user_id" value={post.user_id} onChange={handleChange} required>
                        <option value="">Sélectionner un utilisateur</option>
                        {users.map(({ idUser, nom }) => (
                            <option key={idUser} value={idUser}>{nom}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">{editing ? 'Modifier' : 'Ajouter'}</button>
            </form>
            {editing && <button onClick={handleDelete}>Supprimer</button>}
            {!editing && (
                <div>
                    <h2>Liste des Posts</h2>
                    <ul>
                        {posts.map(({ idPost, titre, contenu, date_creation }) => (
                            <li key={idPost}>
                                <h3>{titre}</h3>
                                <p>{contenu}</p>
                                <small>Créé le {new Date(date_creation).toLocaleString()}</small>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PostManager;