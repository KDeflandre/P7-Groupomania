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


// Trouver un utilisateur
// exports.findOneUser = (req, res, next) => {
//   const userInfo = {};
//   User.findOne({ where: { id: req.params.id } })
//     .then((user) => {
//       userInfo.userName = user.userName;
//       userInfo.email = user.email;
//       userInfo.firstName = user.firstName;
//       userInfo.lastName = user.lastName;
//       if (user.isAdmin == false) {
//         userInfo.role = "Utilisateur";
//       } else {
//         userInfo.role = "Administrateur";
//       }
//       userInfo.createdAt = user.createdAt;
//       userInfo.avatar = user.avatar;
//     })
    
//     .then(() => {
//       Message.count({ where: { userId: req.params.id } }).then((msgcount) => {
//         userInfo.messagesCount = msgcount;
//         res.status(200).json(userInfo);
//       });
//     })
//     .catch((error) => res.status(404).json({ error }));
// };

// Modifier un utilisateur
// exports.modifyUser = (req, res, next) => {
//   const userObject = req.file
//     ? {
//         ...req.body.userId,
//         avatar: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
//       }
//     : { ...req.body };
//   User.update({ ...userObject, id: req.params.id }, { where: { id: req.params.id } })
//     .then(() => res.status(200).json({ ...userObject }))
//     .catch((error) => res.status(400).json({ error }));
// };

//Supprimer un utilisateur
// exports.deleteUser = (req, res, next) => {
//   User.destroy({ where: { id: req.params.id } })
//     .then(() => res.status(200).json({ message: "Le compte a bien été supprimé !" }))
//     .catch((error) => res.status(400).json({ error }));
// };