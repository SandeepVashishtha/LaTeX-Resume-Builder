const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }  // Automatically set to current date
});

// Hash the password before saving the user
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error); // Pass any errors to the next middleware
  }
});

// Export the model
module.exports = mongoose.model('User', UserSchema);
