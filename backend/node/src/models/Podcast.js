const PodcastSchema = new mongoose.Schema({
    // ... other fields
    ratings: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      rating: {
        type: Number,
        min: 1,
        max: 5
      }
    }],
    averageRating: {
      type: Number,
      default: 0
    }
  });