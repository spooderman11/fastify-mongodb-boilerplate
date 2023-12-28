const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
  // add your schema here
});

module.exports = mongoose.model("User", userSchema, "users"); // arg1: name of model, arg2: schema, arg3: collection name
