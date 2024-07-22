import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PodcastForm from '../components/PodcastForm';

function AdminDashboard() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPodcast, setEditingPodcast] = useState(null);

  useEffect(() => {
    fetchPodcasts();
  }, []);

  const fetchPodcasts = async () => {
    try {
      const res = await axios.get('/api/podcasts', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setPodcasts(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleEdit = (podcast) => {
    setEditingPodcast(podcast);
  };

  const handleSubmit = () => {
    fetchPodcasts();
    setEditingPodcast(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/podcasts/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchPodcasts();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <h2>Podcasts</h2>
      <ul>
        {podcasts.map(podcast => (
          <li key={podcast._id}>
            {podcast.name} - {podcast.speaker}
            <button onClick={() => handleEdit(podcast)}>Edit</button>
            <button onClick={() => handleDelete(podcast._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>{editingPodcast ? 'Edit' : 'Create'} Podcast</h2>
      <PodcastForm podcast={editingPodcast} onSubmit={handleSubmit} />
    </div>
  );
}

export default AdminDashboard;