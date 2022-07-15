const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  userName: {type: String, required:true},
  firstName: { type: String, required: true }, 
  lastName: { type: String, required:true },
  email: { type: String, trim: true, lowercase: true, required: true, unique: true, 
    validate: {
      validator: function(v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      description : 'Merci de rentrer une adresse email valide'
    }},
  password: { type: String, required: true,
    validate: {
      validator: function(v) {
      // return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{5,}$/.test(v);
      return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/.test(v);
    },
    message : 'Votre mot de passe doit contenir 5 caractères au minimum dont un en majuscule, 1 chiffre et un charactère spécial'
  }},
  avatar: { type: String, allowNull: false, defaultValue: "img" },
  isAdmin: { type: Boolean, allowNull: false, defaultValue: false },
  isActive: { type: Boolean, allowNull: false, defaultValue: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);