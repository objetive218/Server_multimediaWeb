if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const connectDb = require("./config/connectDb");
const Person = require("./models/person");

const app = express();
app.use(cors());

app.use(express.json());

connectDb();

app.get("/people", async (req, res) => {
  const people = await Person.find();
  if (res) {
    res.json({ people: people });
  } else {
    res.status(404).end();
  }
});

app.post("/people", async (req, res) => {
  const user = req.body.user;
  const password = req.body.password;
  const mail = req.body.mail;
  const person = await Person.create({
    user: user,
    password: password,
    mail: mail,
  });
  if (person) {
    res.json({ person: person });
  } else {
    res.status(404).end();
  }
});

app.get("/login", async (req, res) => {
  const userName = req.body.user;
  const password = req.body.password;
  const user = await Person.findOne({
    user: userName,
    password: password,
  }).exec();
  if (user) {
    res.json(true);
  } else {
    res.status(404).end();
  }
});

app.listen(process.env.PORT);
