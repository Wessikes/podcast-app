import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PodcastList from '../components/PodcastList';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get('/api/user/profile', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUser(res.data);
      setFavorites(res.data.favorites);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile">
      <h1>{user.name}'s Profile</h1>
      <h2>Favorite Podcasts</h2>
      <PodcastList podcasts={favorites} />
    </div>
  );
}

export default UserProfile;