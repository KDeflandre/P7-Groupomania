const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  userName: {type: String, required:true},
  firstName: { type: String, required: true }, 
  lastName: { type: String, required:true },
  email: { type: String, trim: true, lowercase: true, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, allowNull: false, defaultValue: "img" },
  isAdmin: { type: Boolean, allowNull: false, defaultValue: false },
  isActive: { type: Boolean, allowNull: false, defaultValue: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);