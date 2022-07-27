const Post = require('../models/Post');
const User = require('../models/User');
const fs = require('fs');


// Tous les messages
exports.findAllPosts = (req, res, next) => {
  Post.aggregate(
    [
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user"
        }
      },
      { $sort: { createdAt: -1, posts: 1 } },
    ]
  ).exec(function (err, posts) {
    res.status(200).json({ posts });
  });
};

// Un seul message
exports.findOnePost = (req, res, next) => {
  Post.findOne({_id: req.params.id})
  .then(posts => res.status(200).json(posts))
  .catch(error => res.status(400).json({error}));  
};
// Créer un post 
exports.createPost = (req, res, next) => {
  const postObject = req.body;
  let newPost = {
    userId: postObject.userId,
    content: postObject.content,
  }
  if (req.file) {
    newPost.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }
  const post = new Post(newPost);
  post.save()
    .then(() => res.status(201).json({ message: "Post ajouté" }))
    .catch(error => res.status(400).json({ error: "Rien à publier" }));
};

// Modifier un message
exports.modifyPost = (req, res ,next) => {
 const userId = User.userId;
 const isAdmin = User.isAdmin;

  if (userId == Post.userId || isAdmin ) {
    const postObject = req.file ?
  {
    ...req.body.post,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }
  : {...req.body};

  Post.updateOne({_id: req.params.id}, {...postObject, _id: req.params.id})
  .then(() => res.status(200).json({message: 'Post modifié'}))
  .catch(error => res.status(400).json({error}));    
  } else {
    res.status(401).json({ error: 'Utilisateur non autorisé à modifier ce post' })
}};



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

      if (post.usersLiked.includes(req.body.userId)) {
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
        // Supprimer le user de la list des user likeds
        // décrementer de 1 le nombre de like
      } else {
        // MAJ BDD
        Post.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: -1 },
            $push: { usersLiked: req.body.userId },
          }
        )
          .then(() => res.status(201).json({ message: "Post pas liké ! " }))
          .catch((error) => res.status(400).json({ error }));
      }
    })
}