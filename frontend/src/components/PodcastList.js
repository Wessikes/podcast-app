import React from 'react';
import { Link } from 'react-router-dom';

function PodcastList({ podcasts }) {
  return (
    <div className="podcast-list">
      {podcasts.map((podcast) => (
        <div key={podcast._id} className="podcast-item">
          <img src={podcast.thumbnailUrl} alt={podcast.name} />
          <h3>{podcast.name}</h3>
          <p>{podcast.speaker}</p>
          <Link to={`/podcast/${podcast._id}`}>Listen Now</Link>
        </div>
      ))}
    </div>
  );
}

export default PodcastList;