const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  profile: {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    coverPhoto: {
      type: String,
      required: true,
    },
    secretCode: {
      type: String,
      required: true,
    },
  },
  personalInfo: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: String,
      required: true,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
  },
  notifications: {
    email: {
      comments: {
        type: Boolean,
        default: false,
      },
      candidates: {
        type: Boolean,
        default: false,
      },
      offers: {
        type: Boolean,
        default: false,
      },
    },
    pushNotifications: {
      type: Boolean,
      default: false,
    },
  },
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
