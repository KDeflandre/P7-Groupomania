
const User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Creation d'un nouvel utilisateur
exports.signup = (req, res, next) => {
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
        .then(() => res.status(201).json({ message: "Votre compte a été enregistré avec succès!" }))
        .catch((error) => res.status(401).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Connexion d'un utilisateur
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((users) => {
      if (!users) {
        return res.status(404).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt.compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            message: "Utilisateur connecté !",
            userId: users._id,
            role: users.isAdmin,
            userName: users.userName,
            firstName: users.firstName,
            lastName: users.lastName,
            userEmail: users.email,
            avatar: users.avatar,
            token: jwt.sign({ userId: users._id }, process.env.TOKEN, { expiresIn: "24h" })
          });
        })
        .catch((error) => res.status(501).json({ error }));
    })
    .catch((error) => res.status(502).json({ error }));
};