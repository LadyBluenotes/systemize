const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dbConnect = require("./db/conn");
const User = require("./models/user");
const Task = require("./models/task");

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

app.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      username: req.body.username,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).send({
      res: "User successfully created."
    });
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: "Error creating user."
    });
  }
});

app.post("/login", async (req, res) => {
  try {

    const user = await User.findOne({ username: req.body.username });

    if(!user) {
      return res.status(404).send({
        message: "Email not found"
      });
    }
    const passwordCheck = await bcrypt.compare(req.body.password, user.password);

    if(!passwordCheck) {
      return res.status(400).send({
        message: "Passwords does not match"
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
      userId: user._id,
      token,
    });

  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: "Error logging in",
    });
  }
});

app.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) throw err;
    res.json({ user });
})

});

app.post('/addtask', async (req, res) => {

  try {
    const task = new Task({
      taskName: req.body.task.taskName,
      description: req.body.task.description,
      priority: req.body.task.priority,
      dueDate: req.body.task.dueDate,
      completed: req.body.task.completed,
      userId: req.body.task.userId,
    });
    const newTask = await task.save();
    await User.findOneAndUpdate({ _id: req.body.task.userId }, { 
      $push: { tasks: newTask._id } 
    })
    res.status(201).send({
      message: "Task successfully created."
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Error creating task."
    });
  }
});

app.get('/:id/tasks', (req, res) => {
  Task.find({ userId: req.params.id }, (err, tasks) => {
    if (err) throw err;
    res.json({ tasks });
  })
});


module.exports = app;