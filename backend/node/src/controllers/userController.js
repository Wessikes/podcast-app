const User = require('../models/User');

exports.toggleFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const podcastId = req.params.id;

    const index = user.favorites.indexOf(podcastId);
    if (index > -1) {
      user.favorites.splice(index, 1);
    } else {
      user.favorites.push(podcastId);
    }

    await user.save();

    res.json(user.favorites);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};