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
  Post.findOne({ _id: req.params.id })
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }));
};

// Créer un post 
exports.createPost = (req, res, next) => {
  const postObject = req.body;
if (postObject.content.trim()=== "") return res.status(400).json({error: "Rien à publier"})
  let newPost = {
    userId: req.auth.userId,
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

// Modifier un post
exports.modifyPost = async (req, res, next) => {
  let post = await Post.findOne({ _id: req.params.id })
  if (req.auth.userId != post.userId) {
    let user = await User.findOne({ where: { _id: req.auth.userId } })
    if (!user.role) return res.status(401).json({ error: 'Utilisateur non autorisé à modifier ce post' })
  }
  if(req.body.content.trim() === "") return res.status(400).json({error: "Rien à publier"})

  const postObject = req.file ?
    {
      ...req.body.post,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    : { ...req.body };
  Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Post modifié' }))
    .catch(error => res.status(400).json({ error }));
};

// Supprimer un post
exports.deletePost = async (req, res, next) => {
  let post = await Post.findOne({ _id: req.params.id })
  if (req.auth.userId != post.userId) {
    let user = await User.findOne({ where: { _id: req.auth.userId } })
    if (!user.role) return res.status(401).json({ error: 'Utilisateur non autorisé à modifier ce post' })
  }
  if (req.file) {
  const filename = post.imageUrl.split('/images/')[1];
  fs.unlink(`images/${filename}`, () => {
    Post.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Post supprimé' }))
      .catch(error => res.status(400).json({ error }));
  }); 
} else {
  Post.deleteOne({ _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Post supprimé' }))
  .catch(error => res.status(400).json({ error }));
}
};

// Like un post
exports.likePost = async (req, res, next) => {
  let post = await Post.findOne({ _id: req.params.id })

  //Recup du post avec params.id
  if (!post.usersLiked.includes(req.auth.userId)) {
    // MAJ BDD
    Post.updateOne(
      { _id: req.params.id },
      {
        $inc: { likes: 1 },
        $push: { usersLiked: req.auth.userId },
      }
    )
      .then(() => res.status(201).json({ message: "Post liké ! " }))
      .catch((error) => {
        console.log(error)
        res.status(400).json({ error })
      });
  } else {
    // MAJ BDD
    Post.updateOne(
      { _id: req.params.id },
      {
        $inc: { likes: -1 },
        $pull: { usersLiked: req.auth.userId },
      }
    )
      .then(() => res.status(201).json({ message: "Post pas liké ! " }))
      .catch((error) => res.status(400).json({ error }));
  }
}