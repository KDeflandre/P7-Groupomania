const User = require("../models/User");
const Post = User.posts;

// Trouver un utilisateur
exports.findOneUser = (req, res, next) => {
  User.findOne({_id: req.params.id})
  .then(users => res.status(200).json(users))
  .catch(error => res.status(400).json({error}));  
};

// Modifier un utilisateur
exports.modifyUser = (req, res ,next) => {
  const userObject = req.file ?
  {
      ...JSON.parse(req.body.user),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : {...req.body};
  User.updateOne({_id: req.params.id}, {...userObject, _id: req.params.id})
  .then(() => res.status(200).json({message: 'Utilisateur modifié'}))
  .catch(error => res.status(400).json({error}));  
};

//Supprimer un utilisateur
exports.deleteUser = (req, res, next) => {
  User.findOne({_id: req.params.id})
  .then(User => {
      const filename = user.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
          User.deleteOne({_id: req.params.id})
          .then(() => res.status(200).json({message: 'Le compte a bien été supprimé'}))
          .catch(error => res.status(400).json({error}));  
      });
  })
  .catch(error => res.status(500).json({error}));
};