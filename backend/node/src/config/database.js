const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Define schemas
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  avatar: { type: String, default: null },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Podcast' }]
}, { timestamps: true });

const podcastSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  type: { type: String, enum: ['audio', 'video'], required: true },
  speaker: { type: String, required: true },
  fileUrl: { type: String, required: true },
  duration: { type: Number, required: true },
  thumbnailUrl: { type: String, default: null },
  popularity: { type: Number, default: 0 }
}, { timestamps: true });

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String }
}, { timestamps: true });

const userProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  podcastId: { type: mongoose.Schema.Types.ObjectId, ref: 'Podcast', required: true },
  timestamp: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
});

const ratingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  podcastId: { type: mongoose.Schema.Types.ObjectId, ref: 'Podcast', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  review: { type: String }
}, { timestamps: true });

// Create models
const User = mongoose.model('User', userSchema);
const Podcast = mongoose.model('Podcast', podcastSchema);
const Category = mongoose.model('Category', categorySchema);
const UserProgress = mongoose.model('UserProgress', userProgressSchema);
const Rating = mongoose.model('Rating', ratingSchema);

// Create indexes
User.createIndexes();
Podcast.createIndexes();
Category.createIndexes();
UserProgress.createIndexes();
Rating.createIndexes();

module.exports = {
  User,
  Podcast,
  Category,
  UserProgress,
  Rating
};