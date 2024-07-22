const Podcast = require('../models/Podcast');

exports.getAllPodcasts = async (req, res) => {
  try {
    const podcasts = await Podcast.find().sort({ createdAt: -1 });
    res.json(podcasts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getPodcastById = async (req, res) => {
  try {
    const podcast = await Podcast.findById(req.params.id);
    if (!podcast) {
      return res.status(404).json({ message: 'Podcast not found' });
    }
    res.json(podcast);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Podcast not found' });
    }
    res.status(500).send('Server error');
  }
};

exports.searchPodcasts = async (req, res) => {
    try {
      const { query, category, type, speaker } = req.query;
      let searchQuery = {};
  
      if (query) {
        searchQuery.$or = [
          { name: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } }
        ];
      }
  
      if (category) searchQuery.category = category;
      if (type) searchQuery.type = type;
      if (speaker) searchQuery.speaker = { $regex: speaker, $options: 'i' };
  
      const podcasts = await Podcast.find(searchQuery).sort({ popularity: -1 });
      res.json(podcasts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
};