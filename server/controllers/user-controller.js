const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = `My kitty says meow...`;

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ error: "User already registered!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res
      .status(200)
      .json({ message: "User registered successfully!", data: newUser });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: `User doesn't exist!` });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: `Incorrect password` });
    }
    const id = user._id;
    const userEmail = user.email;
    const token = jwt.sign({ id, userEmail }, SECRET_KEY, { expiresIn: "1d" });
    res
      .status(200)
      .json({ message: `Login Successful`, user: user, token: token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const resetPwd = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: `User doesn't exists` });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user["password"] = hashedPassword;
    await user.save();
    res
      .status(200)
      .json({ message: "Password reset successfully!", data: user });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      users: users.map((user) => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      }),
      totalUsers: users.length,
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.query;
  try {
    const user = await User.findById(id);
    console.log(user);
    if (!user) {
      return res.status(400).json({ error: `User doesn't exist` });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const updateProfile = async (req, res) => {
  const { name, email } = req.body;
  const userId = req.user.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(401).json({ message: `User doesn't exist` });
    }
    return res
      .status(200)
      .json({ message: "UserProfile updated successfully", data: updatedUser });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports = {
  register,
  login,
  resetPwd,
  getAllUsers,
  getUserById,
  updateProfile,
};
