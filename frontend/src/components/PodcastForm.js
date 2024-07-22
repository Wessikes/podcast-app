import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PodcastForm({ podcast, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    type: 'audio',
    speaker: '',
    file: null,
    thumbnailUrl: ''
  });

  useEffect(() => {
    if (podcast) {
      setFormData(podcast);
    }
  }, [podcast]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      if (podcast) {
        await axios.put(`/api/podcasts/${podcast._id}`, data, {
          headers: { 
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
      } else {
        await axios.post('/api/podcasts', data, {
          headers: { 
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
      }
      onSubmit();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Podcast Name"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
        required
      />
      <select name="type" value={formData.type} onChange={handleChange}>
        <option value="audio">Audio</option>
        <option value="video">Video</option>
      </select>
      <input
        type="text"
        name="speaker"
        value={formData.speaker}
        onChange={handleChange}
        placeholder="Speaker"
        required
      />
      <input
        type="file"
        name="file"
        onChange={handleFileChange}
        required={!podcast}
      />
      <input
        type="text"
        name="thumbnailUrl"
        value={formData.thumbnailUrl}
        onChange={handleChange}
        placeholder="Thumbnail URL"
      />
      <button type="submit">{podcast ? 'Update' : 'Create'} Podcast</button>
    </form>
  );
}

export default PodcastForm;