import React, { useState } from 'react';

function AdvancedSearch({ onSearch }) {
  const [searchParams, setSearchParams] = useState({
    query: '',
    category: '',
    type: '',
    speaker: ''
  });

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="query"
        value={searchParams.query}
        onChange={handleChange}
        placeholder="Search podcasts"
      />
      <input
        type="text"
        name="category"
        value={searchParams.category}
        onChange={handleChange}
        placeholder="Category"
      />
      <select name="type" value={searchParams.type} onChange={handleChange}>
        <option value="">All Types</option>
        <option value="audio">Audio</option>
        <option value="video">Video</option>
      </select>
      <input
        type="text"
        name="speaker"
        value={searchParams.speaker}
        onChange={handleChange}
        placeholder="Speaker"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default AdvancedSearch;