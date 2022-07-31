
const User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Creation d'un nouvel utilisateur
exports.signup = (req, res, next) => {
  if (!req.body.password || !req.body.email || !req.body.firstName || !req.body.lastName) 
  return res.status(500).json({ message: "Champs manquants" })
  if (!req.body.password.match(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{5,16})\S$/g))
  return res.status(500).json({ message: "Le mot de passe doit contenir au minimum 5 caractères, une lettre minuscule, une lettre en majuscule et un chiffre" })
  if (!req.body.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g)) 
  return res.status(500).json({ message: "Format de l'email incorrect" })

  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash
      });
      user.save()
      .then((user) => res.status(200).json({
        message: "Utilisateur connecté !",
        user: {
          userId: user._id,
          role: user.isAdmin,
          userName: user.userName,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
        token: jwt.sign({ userId: user._id }, process.env.TOKEN, { expiresIn: "24h" })
      }))
      .catch((error) => res.status(401).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Connexion d'un utilisateur
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt.compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            message: "Utilisateur connecté !",
            user: {
              userId: user._id,
              role: user.isAdmin,
              userName: user.userName,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
            },
            token: jwt.sign({ userId: user._id }, process.env.TOKEN, { expiresIn: "24h" })
          });
        })
        .catch((error) => res.status(501).json({ error }));
    })
    .catch((error) => {
      console.log(error)
      res.status(502).json({ error })
    });
};