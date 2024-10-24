const express = require("express");
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS"
  );
  next();
});

app.use((req, res, next) => {
  console.log("Server is runnning on port 4000!");
  next();
});

app.use("/api/posts", (req, res, next) => {
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
  res.status(200).json({ message: "Post fteched Successfully!", posts: posts });
});
module.exports = app;
