const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  medicament: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medicament',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
