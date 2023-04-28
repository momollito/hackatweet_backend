const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  image: String,
  firstname: String,
  username: String,
  tweet: String,
  date: Date,
  likes: Number,
  token: String,
});

const Tweet = mongoose.model('tweet', tweetSchema);

module.exports = Tweet;
