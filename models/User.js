const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
  },
  user_lastName: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    required: true,
    unique: true,
  },
  user_password: {
    type: String,
    required: true,
  },
  user_tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }],

  is_active: {
    type: Boolean,
    default: true,
  },
});

// We create the model Product which will allow us to
// intereact with colecction Producs

const User = mongoose.model('User', UserSchema);

module.exports = User;
