const Joi = require("joi");
const express = require("express");
const UsersModule = require("../modules/users");
const { authMiddleware } = require("./middlewares");
const jwt = require("jsonwebtoken");

const route = express.Router();

const userCreationSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  birthdate: Joi.string().required(),
  country: Joi.string().required(),
  city: Joi.string().required(),
  secretQuestion: Joi.string().required(),
  gender: Joi.string().required(),
});

//CREATE USER ROUTE

route.post("/create", async (req, res) => {
  try {
    const {
      username,
      password,
      birthdate,
      country,
      city,
      secretQuestion,
      gender,
    } = await userCreationSchema.validateAsync(req.body).catch(() => {
      throw new Error({ status: 400, message: "Invalid Data" });
    });
    const data = await UsersModule.create([
      { username, password, birthdate, country, city, secretQuestion, gender },
    ]);
    res.json(data[0]);
  } catch ({ status, message }) {
    console.log(`ERROR status: ${status} message: ${message}`);
    res.status(status || 500).json({ message });
  }
});

const userLoginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

// LOGIN ROUTE

route.post("/login", async (req, res) => {
  try {
    const { username, password } = await userLoginSchema
      .validateAsync(req.body)
      .catch(() => {
        throw new Error({ status: 400, message: "Invalid Data" });
      });

    const user = await UsersModule.findOne({ username, password });
    if (!user) throw new Error({ status: 403, message: "Invalid Credentials" });

    var token = jwt.sign({ id: user._id }, "shhhhh");
    console.log(token);
    res.json({ token });
  } catch ({ status, message }) {
    console.log(`ERROR status: ${status} message: ${message}`);
    res.status(status || 500).json({ message });
  }
});

route.get(
  "/app",
  authMiddleware(async (req, res) => {
    console.log(req.headers.userId);
    res.json({});
  })
);

const getByUsernameSchema = Joi.object({
  username: Joi.string().required(),
});

//FIND BY USERNAME ROUTE
route.get("/:username", async (req, res) => {
  const { username } = await getByUsernameSchema.validateAsync(req.params);
  const user = await UsersModule.find({ username });
  res.json(user.deletedAt ? null : user);
});

const updateByUsernameSchema = Joi.object({
  hobbies: Joi.string().optional(),
  friends: Joi.string().optional(),
  groups: Joi.string().optional(),
  interests: Joi.string().optional(),
});

//UPDATE BY USERNAME ROUTE
route.post("/update/:username", async (req, res) => {
  try {
    const { username } = await getByUsernameSchema.validateAsync(req.params);
    const { hobbies, friends, groups, interests } =
      await updateByUsernameSchema.validateAsync(req.body);
    const updatedUser = await UsersModule.findOneAndUpdate(
      { username: username },
      { hobbies, friends, groups, interests },
      { new: true }
    );

    res.json(updatedUser[0]);
  } catch (e) {
    console.log(e);
    res.status(415).json({});
  }
});

//DELETE USER ROUTE

route.delete("/delete/:userId", async (req, res) => {
  const { userId } = req.params;
  const deletedUser = await UsersModule.findByIdAndUpdate(userId, {
    deletedAt: new Date(),
  });
  res.json(deletedUser);
});

module.exports = route;
