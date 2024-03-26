const {
  register,
  login,
  resetPwd,
  getAllUsers,
  updateProfile,
  getUserById,
} = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/authMiddleware");

const express = require("express");
const router = express.Router();

router.route("/register").post(register);
router.route("/getAllUsers").get(getAllUsers);
router.route("/user?:id").get(getUserById);
router.route("/login").post(login);
router.route("/resetPwd").post(resetPwd);
router.route("/updateProfile").put(authMiddleware, updateProfile);

module.exports = router;
