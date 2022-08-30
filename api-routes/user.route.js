const {
  getAllUsers,
  createUser,
  isUserNameTaken,
  updateUserProfile,
} = require("../services/user-service.js");

const router = require("express").Router(); // Create an instance of express router

router.get("/", getAllUsers);
router.post("/", createUser);
router.post("/check/:userName", isUserNameTaken);
router.post("/save-profile", updateUserProfile);

module.exports = router;
