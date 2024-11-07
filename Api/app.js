const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const Post = require("./models/post");
const {
  log,
} = require("@angular-devkit/build-angular/src/builders/ssr-dev-server");
const app = express();
app.use(bodyparser.json());

mongoose
  .connect(
    "mongodb+srv://9emdesign:BMnsK6VkRhoKuea6@magblog.bq8v8.mongodb.net/Blog?retryWrites=true&w=majority&appName=MagBlog"
  )
  .then(() => {
    console.log("Connected to MongoDB!!");
  })
  .catch(() => {
    this.console.log("Connection Failed: Could not Connect to MongoDB!");
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,PUT,DELETE,OPTIONS"
  );
  next();
});

app.use((req, res, next) => {
  console.log("Server is runnning on port 4000!");
  next();
});

/* app.post("/api/posts", (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: "Post added succesfully to MongoDB!",
  });
}); */

/* Here i post to the Mongo database  */
app.post("/api/posts", (req, res, next) => {
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
app.get("/api/posts", (req, res, next) => {
  Post.find().then((documents) => {
    res
      .status(200)
      .json({ message: "Post fetched Successfully!", posts: documents });
  });
});

/* Here i delete from the Mongo database */
app.delete("/api/posts/:id", (req, res, next) => {
  /* console.log(req.params.id);
  res.status(200).json({ message: "Post has een deleted!" }); */
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post has een deleted!" });
  });
});

app.put("/api/posts/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });
  Post.updateOne({ _id: req.params.id }, post).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Update Post Successful!" });
  });
});

/* app.get("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "1234509876",
      title: "A Journey into coding",
      content: "The path from the NodeJS Server!!",
    },
    {
      id: "1234590678",
      title: "The Pathway into Node/Angular",
      content: "The path from the NodeJS Server!!",
    },
    {
      id: "1234576098",
      title: "The 1000 line code Challenge",
      content: "The path from the NodeJS Server!!",
    },
  ];
  res.status(200).json({ message: "Post fetched Successfully!", posts: posts });
}); */
module.exports = app;
