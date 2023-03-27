const mongoose = require("mongoose");

//schema
const postSchema = mongoose.Schema({
  title: String,
  body: String,
  device: String,
  no_of_comments: Number,
  userId:String
});

// model
const PostModel = mongoose.model("post",postSchema);

module.exports = PostModel