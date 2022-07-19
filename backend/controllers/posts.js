const Post = require('../models/Post');
const User = require('../models/User');
const fs = require('fs');

// /***  Afficher les posts ***/
// exports.findAllPosts = (req, res, next) => {
//   /*** on récupère tous les posts ***/
//   Post.findAll({
//           include: [{
//               model: User,
//               attributes: ["userName", "avatar", "isActive", "firstName", "lastName"]
//           }],
//       })
//       /*** si tout est ok ***/
//       .then(publicationList => res.status(200).json({
//           publicationList
//       }))
//       /*** sinon on envoie une erreur ***/
//       .catch(error => res.status(400).json({
//           error
//       }))

// };

//Tous les messages
exports.findAllPosts = (req, res, next) => {
  Post.findAll({
    include: {
      model: User,
      required: true, 
      attributes: ["userName", "avatar", "isActive", "firstName", "lastName"],
    },
    order: [["id", "DESC"]],
  })
    .then((posts) => {
      const ListePosts = posts.map((post) => {
        return Object.assign(
          {},
          {
            id: post.id,
            createdAt: post.createdAt,
            content: post.content,
            imageUrl: post.imageUrl,
            userId: post.UserId,
            userName: post.User.userName,
            avatar: post.User.avatar,
            isActive: post.User.isActive,
            firstName: post.User.firstName,
            lastName: post.User.lastName,
          }
        );
      });
      res.status(200).json({ ListePosts });
    })
    .catch((error) => res.status(400).json({ error }));
};

// Un seul message
exports.findOnePost = (req, res, next) => {
  Post.findOne({_id: req.params.id})
  .then(posts => res.status(200).json(posts))
  .catch(error => res.status(400).json({error}));  
};

exports.createPost = (req, res, next) => {
  const postObject = req.body;
  let newPost = {
    userId: postObject.userId,
    post: postObject.post
  }
  if (req.file) {
    newPost.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }

  const post = new Post(newPost);
  post.save()
    .then(() => res.status(201).json({ message: "Post ajouté" }))
    .catch(error => res.status(400).json({ error }));
};


// Modifier un message
exports.modifyPost = (req, res ,next) => {
  const postObject = req.file ?
  {
      ...JSON.parse(req.body.post),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : {...req.body};
  Post.updateOne({_id: req.params.id}, {...postObject, _id: req.params.id})
  .then(() => res.status(200).json({message: 'Post modifié'}))
  .catch(error => res.status(400).json({error}));  
};

// Supprimer un message
exports.deletePost = (req, res, next) => {
  Post.findOne({_id: req.params.id})
  .then(post => {
      const filename = post.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
          Post.deleteOne({_id: req.params.id})
          .then(() => res.status(200).json({message: 'Post supprimé'}))
          .catch(error => res.status(400).json({error}));  
      });
  })
  .catch(error => res.status(500).json({error}));
};

// Like un post
exports.likePost = (req, res, next) => {

  //Recup du post avec params.id
  Post.findOne({ _id: req.params.id })
    .then((post) => {

switch(req.body.like){
  case 1: 
      if (post.usersLiked.includes(req.body.userId)) return
     
      // MAJ BDD
      Post.updateOne(
          { _id: req.params.id },
          {
          $inc: { likes: 1 },
          $push: { usersLiked : req.body.userId },
          }
      )
      .then(() => res.status(201).json({ message: "Post liké ! " }))
      .catch((error) => res.status(400).json({ error }));
      break;
  // case -1: 
  //     if (sauce.usersDisliked.includes(req.body.userId)) return
      
  //     // MAJ BDD
  //     Post.updateOne(
  //         { _id: req.params.id },
  //         {
  //         $inc: { dislikes: 1 },
  //         $push: { usersDisliked : req.body.userId },
  //         }
  //     )
  //     .then(() => res.status(201).json({ message: "Vous n'appréciez pas cette sauce ?" }))
  //     .catch((error) => res.status(400).json({ error }));
  //     break;
  case 0:
      if (post.usersLiked.includes(req.body.userId)) {
          
        // MAJ BDD
          Post.updateOne(
          { _id: req.params.id },
          {
              $inc: { likes: -1 },
              $pull: { usersLiked: req.body.userId },
          }
          )
          .then(() => res.status(201).json({ message: "Pas encore testé cette?" }))
          .catch((error) => res.status(400).json({ error }));
          
      // } else if (sauce.usersDisliked.includes(req.body.userId)) {
          
      //   // MAJ BDD
      //     Sauce.updateOne(
      //     { _id: req.params.id },
      //     {
      //         $inc: { dislikes: -1 },
      //         $pull: { usersDisliked: req.body.userId },
      //     }
      //     ).then(() => res.status(201).json({ message: "Pas encore testé cette sauce ?" }))
      //     .catch((error) => res.status(400).json({ error }));
      // }
      break;
}}}
)}





// exports.findAllPosts = (req, res, next) => {
//   Post.findAll({
//     include: {
//       model: User,
//       required: true,
//       attributes: ["userName", "avatar", "isActive", "firstName", "lastName"],
//     },
//     order: [["id", "DESC"]],
//   })
//     .then((posts) => {
//       const ListePosts = posts.map((post) => {
//         return Object.assign(
//           {},
//           {
//             id: post.id,
//             createdAt: post.createdAt,
//             post: post.post,
//             postUrl: post.postUrl,
//             UserId: post.UserId,
//             userName: post.User.userName,
//             avatar: post.User.avatar,
//             isActive: post.User.isActive,
//             firstName: post.User.firstName,
//             lastName: post.User.lastName,
//           }
//         );
//       });
//       res.status(200).json({ ListePosts });
//     })
//     .catch((error) => res.status(400).json({ error }));
// };

// Tous les messages d'un utilisateur
// exports.findAllPostsForOne = (req, res, next) => {
//   Post.findAll({
//     where: { UserId: req.params.id },
//     include: {
//       model: User,
//       required: true,
//       attributes: ["userName", "avatar", "isActive", "firstName", "lastName"],
//     },
//     order: [["id", "DESC"]],
//   })
//     .then((posts) => {
//       const ListePosts = posts.map((post) => {
//         return Object.assign(
//           {},
//           {
//             id: post.id,
//             createdAt: post.createdAt,
//             post: post.post,
//             postUrl: post.postUrl,
//             UserId: post.UserId,
//             userName: post.User.userName,
//             firstName: post.User.firstName,
//             lastName: post.User.lastName,
//             avatar: post.User.avatar,
//             isActive: post.User.isActive,
//           }
//         );
//       });
//       res.status(200).json({ ListePosts });
//     })
//     .catch((error) => res.status(400).json({ error }));
// };

// // Un seul message
// exports.findOnePost = (req, res, next) => {
//   const onePost = {};
//   Post.findOne({
//     where: { id: req.params.id },
//     include: {
//       model: User,
//       required: true,
//       attributes: ["userName", "avatar", "isActive", "firstName", "lastName"],
//     },
//   })
//     .then((post) => {
//       onePost.id = post.id;
//       onePost.userId = post.UserId;
//       onePost.avatar = post.User.avatar;
//       onePost.userName = post.User.userName;
//       onePost.firstName = post.User.firstName;
//       onePost.lastName = post.User.lastName;
//       onePost.isActive = post.User.isActive;
//       onePost.createdAt = post.createdAt;
//       onePost.post = post.post;
//       onePost.postUrl = post.postUrl;
//     })
//     .catch((error) => res.status(404).json({ error }));
// };

// // Créer un message
// exports.createPost = (req, res, next) => {
//   let varImage = "";
//   if (req.file) {
//     varImage = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
//   }
//   const post = new Post({
//     UserId: req.body.UserId,
//     post: req.body.post,
//     postUrl: varImage,
//   });
//   post
//     .save()
//     .then((retour) => res.status(201).json({ message: "Message créé !" }))
//     .catch((error) => res.status(400).json({ error }));
// };

// // Modifier un message
// exports.modifyPost = (req, res, next) => {
//   const postObject = req.file
//     ? {
//         ...req.body.post,
//         postUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
//       }
//     : { ...req.body };

//   Post.update({ ...postObject, id: req.params.id }, { where: { id: req.params.id } })
//     .then(() => res.status(200).json({ message: "Post modifiée !" }))
//     .catch((error) => res.status(400).json({ error }));
// };

// // Supprimer un message
// exports.deletePost = (req, res, next) => {
//   post.destroy({ where: { id: req.params.id } })
//     .then(() => res.status(200).json({ message: "Message supprimé !" }))
//     .catch((error) => res.status(400).json({ error }));
// };
