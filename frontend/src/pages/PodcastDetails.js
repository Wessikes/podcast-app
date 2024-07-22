import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PodcastPlayer from '../components/PodcastPlayer';
import { useAuth } from '../context/AuthContext';

function PodcastDetails() {
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  const fetchPodcast = useCallback(async () => {
    try {
      const res = await axios.get(`/api/podcasts/${id}`);
      setPodcast(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPodcast();
  }, [fetchPodcast]);

  useEffect(() => {
    if (user && podcast) {
      setIsFavorite(user.favorites.includes(podcast._id));
    }
  }, [user, podcast]);

  const handleToggleFavorite = async () => {
    try {
      const res = await axios.post(`/api/podcasts/${podcast._id}/favorite`, null, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setIsFavorite(res.data.includes(podcast._id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!podcast) {
    return <div>Podcast not found</div>;
  }

  return (
    <div className="podcast-details">
      <h1>{podcast.name}</h1>
      <p>Speaker: {podcast.speaker}</p>
      <p>Category: {podcast.category}</p>
      <p>Description: {podcast.description}</p>
      {user && (
        <button onClick={handleToggleFavorite}>
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      )}
      <PodcastPlayer podcast={podcast} />
    </div>
  );
}

export default PodcastDetails;