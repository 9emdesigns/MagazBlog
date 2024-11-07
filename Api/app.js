const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const postRoutes = require("./routes/postRoutes");
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
app.use(postRoutes);
module.exports = app;
