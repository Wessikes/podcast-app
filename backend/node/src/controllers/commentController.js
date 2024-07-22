const Comment = require('../models/Comment');

exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const comment = new Comment({
      user: req.user.id,
      podcast: req.params.podcastId,
      content
    });
    await comment.save();
    res.json(comment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ podcast: req.params.podcastId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};