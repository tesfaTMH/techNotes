import User from "../models/userModel.js";
import Note from "../models/noteModel.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

//@desc Get all users
//@route GET /users
//@access Private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users?.length) {
    return res.status(404).json({ message: "No users found" });
  }
  res.json(users);
});

//@desc create new user
//@route POST /users
//@access Private
const createUser = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body;
  // check if required field are empty
  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    return res.status(400).json({ message: "All fields are required" });
  }
  // check if the user exists
  const existingUser = await User.findOne({ username }).lean().exec();
  if (existingUser) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { username, password: hashedPassword, roles };

  // create and store new user
  const user = await User.create(newUser);

  if (user) {
    res.status(201).json({ message: `New user ${username} created` });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
});

//@desc update user
//@route PACTH /users
//@access Private
const updateUser = asyncHandler(async (req, res) => {
  const { id, username, roles, active, password } = req.body;

  // check validity of the data
  if (
    !id ||
    !username ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== "boolean"
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // check user
  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // check for duplicate user
  const existingUser = await User.findOne({ username }).lean().exec();
  // allow update to the existing user
  if (existingUser && existingUser?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  user.username = username;
  user.roles = roles;
  user.active = active;

  if (password) {
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
  }

  const updatedUser = await user.save();
  res.json({ message: `${updatedUser.username} updated` });
});

//@desc Delete a user
//@route DELETE /users
//@access Private
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "User ID Required" });
  }

  // check if the user has an assigned notes
  const note = await Note.findOne({ user: id }).lean().exec();

  if (note?.length) {
    return res.status(400).json({ message: "User has assigned notes" });
  }

  // check if the user exists
  const existingUser = await User.findById(id).exec();
  if (!existingUser) {
    return res.status(400).json({ message: "User not found" });
  }

  const result = await existingUser.deleteOne();
  const replay = `Username ${result.username} with ID ${result._id} deleted`;
  res.json(replay);
});

export { getAllUsers, createUser, updateUser, deleteUser };
