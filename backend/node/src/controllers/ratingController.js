const Podcast = require('../models/Podcast');

exports.addRating = async (req, res) => {
  try {
    const { rating } = req.body;
    const podcast = await Podcast.findById(req.params.podcastId);
    
    const ratingIndex = podcast.ratings.findIndex(r => r.user.toString() === req.user.id);
    if (ratingIndex > -1) {
      podcast.ratings[ratingIndex].rating = rating;
    } else {
      podcast.ratings.push({ user: req.user.id, rating });
    }

    podcast.averageRating = podcast.ratings.reduce((acc, curr) => acc + curr.rating, 0) / podcast.ratings.length;
    await podcast.save();

    res.json(podcast);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};