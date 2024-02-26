const mongoose = require('mongoose');

const medicamentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: [
    {
      type: String,
      required: true
    }
  ],
  price: {
    type: Number,
    required: true,
    min: 0
  }
});

const Medicament = mongoose.model('Medicament', medicamentSchema);

module.exports = Medicament;
