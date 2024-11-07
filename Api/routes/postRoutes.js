const express = require("express");
const router = express.Router();
const Post = require("../models/post");

/* Here i post to the Mongo database  */
router.post("", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then((createdPost) => {
    //console.log(result);
    res.status(201).json({
      message: "Post added succesfully to MongoDB!",
      postId: createdPost._id,
    });
  });
  //console.log(post);
});
/* Here i fetch frrom the Mongo database  */
router.get("", (req, res, next) => {
  Post.find().then((documents) => {
    res
      .status(200)
      .json({ message: "Post fetched Successfully!", posts: documents });
  });
});

/* Here i delete from the Mongo database */
router.delete("/:id", (req, res, next) => {
  /* console.log(req.params.id);
  res.status(200).json({ message: "Post has een deleted!" }); */
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post has een deleted!" });
  });
});

router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });
  Post.updateOne({ _id: req.params.id }, post).then((result) => {
    // console.log(result);
    res.status(200).json({ message: "Update Post Successful!" });
  });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not Found!" });
    }
  });
});

module.exports = router;
