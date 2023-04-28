const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  image: String,
  firstname: String,
  username: String,
  tweet: String,
  date: Date,
  isLiked: Boolean,
});

const Tweet = mongoose.model('tweet', tweetSchema);

module.exports = Tweet;
