import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PodcastList from '../components/PodcastList';
import SearchBar from '../components/SearchBar';

function Home() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPodcasts();
  }, []);

  const fetchPodcasts = async () => {
    try {
      const res = await axios.get('/api/podcasts');
      setPodcasts(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    try {
      const res = await axios.get(`/api/podcasts/search?query=${query}`);
      setPodcasts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home">
      <h1>Welcome to PodcastApp</h1>
      <SearchBar onSearch={handleSearch} />
      <PodcastList podcasts={podcasts} />
    </div>
  );
}

export default Home;