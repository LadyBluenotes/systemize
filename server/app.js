const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dbConnect = require("./db/conn");
const User = require("./models/user");
const auth = require("./auth");

dbConnect();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.json({ message: "Server is on." });
  next();
});

app.post("/signup", (req, res) => {

  bcrypt.hash(req.body.password, 10).then((hashedPassword) => {
      const user = new User({
        name: req.body.name,
        username: req.body.username,
        password: hashedPassword,
      });

    user.save().then((success) => {
        res.status(201).send({
          res: "User successfully created.",
          success,
        });
      }).catch((err) => {
        res.status(500).send({
          message: "Error creating user.",
          err,
        });
      });
    }).catch((err) => {
      console.log(err)
      res.status(500).send({
        message: {err},
      });
    });
});

app.post("/login", (req, res) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      bcrypt.compare(req.body.password, user.password).then((passwordCheck) => {
          if(!passwordCheck) {
            return res.status(400).send({
              message: "Passwords does not match",
              err,
            });
          }
          const token = jwt.sign(
            {
              userId: user._id,
              userUsername: user.username,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );
          res.status(200).send({
            message: "Login Successful",
            username: user.username,
            token,
          });
        })
        .catch((err) => {
          res.status(400).send({
            message: "Passwords does not match",
            err,
          });
        });
    }).catch((err) => {
      res.status(404).send({
        message: "Email not found",
        err,
      });
    });
});

app.get("/unauth", (req, res) => {
  res.json({ message: "Successful" });
});

app.get("/home", auth, (req, res) => {
  res.send({ message: "You are authorized to access me" });
});

module.exports = app;