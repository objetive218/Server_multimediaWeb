const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  user: String,
  password: String,
  mail: String,
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;