const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const postSchema = mongoose.Schema(
  {
    userId: { type: Schema.ObjectId, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: false },
    likes: { type: Number, default: 0 },
    usersLiked: { type: [String] },
  },
  {
    timestamps: true
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model('Post', postSchema);