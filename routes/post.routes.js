const express = require("express");
const PostModel = require("../model/post.model");
const postRouter = express.Router();

//post
postRouter.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const post = new PostModel(payload);
    await post.save();
    res.status(200).send({ msg: "A new post has been added" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

//get
postRouter.get("/", async (req, res) => {
  const { device, no_of_comments, max, min } = req.query;
  try {
    const filter = {};
    if (device) filter.device = { $regex: device, $options: "1" };
    if (no_of_comments) {
      filter.no_of_comments = {
        no_of_comments:  { $lt: parseInt(max), $gt: parseInt(min) },
      };
    }
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page || 1);
    const skip = (page - 1) * limit;
    const posts = await PostModel.find(filter).skip(skip).limit(limit);
    res.status(200).send(posts);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

postRouter.get("/top", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page || 1);
    const skip = (page - 1) * limit;
    const posts = await PostModel.find()
      .sort({ no_of_comments: -1 })
      .skip(skip)
      .limit(limit);
    res.status(200).send(posts);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

//patch
postRouter.patch("/update/:postId", async (req, res) => {
  const payload = req.body;
  const postId = req.params;
  try {
    await PostModel.findByIdAndUpdate({ _id: postId }, payload);
    res.status(200).send({ msg: "A post has been updated" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

//delete
postRouter.delete("/delete/:postId", async (req, res) => {
  const postId = req.params;
  try {
    await PostModel.findByIdAndDelete({ _id: postId });
    res.status(200).send({ msg: "A post has been deleted" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = { postRouter };
