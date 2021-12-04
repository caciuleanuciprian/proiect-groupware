const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },

  birthdate: {
    type: Date,
  },

  country: {
    type: String,
  },

  city: {
    type: String,
  },

  secretQuestion: {
    type: String,
  },

  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },

  hobbies: {
    type: String,
    default: null,
  },

  friends: {
    type: String,
    default: null,
  },

  groups: {
    type: String,
    default: null,
  },

  interests: {
    type: String,
    default: null,
  },

  img: {
    data: Buffer,
    contentType: String,
  },

  deletedAt: {
    type: Date,
    default: null,
    timestamps: true,
  },
});

const UsersModule = mongoose.model("users", usersSchema);
module.exports = UsersModule;
