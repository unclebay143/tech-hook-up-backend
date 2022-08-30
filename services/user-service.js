const { User, validateUser } = require("../db-models/user.model.js");
const bcryptjs = require("bcryptjs");

exports.getAllUsers = async (req, res) => {
  const users = await User.find({}, { passWord: 0, __v: 0 });

  res.status(200).send({ message: "Success", data: users });
};

exports.isUserNameTaken = async (req, res) => {
  const userName = await User.findOne({ userName: req.params.userName });
  if (userName)
    res.status(409).send({ status: false, message: "Username is taken" });
  else res.status(200).send({ status: true, message: "Username is available" });
};

exports.createUser = async (req, res) => {
  try {
    const { error } = validateUser(req.body); // Validate the user data
    if (error) {
      return res.status(400).send({ message: error.details[0].message }); // If there is an error, return the error message
    }

    // check if username is already taken
    const userName = await User.findOne({ userName: req.body.userName });
    if (userName)
      return res.status(409).send({ message: "Username already taken" });

    // create new user from the user model
    const user = new User({
      name: req.body.name,
      userName: req.body.userName,
      passWord: await bcryptjs.hash(req.body.passWord, 10),
      // ...req.body,
    });

    // save the user to the database
    user.save((error, user) => {
      if (error) res.status(500).send({ message: error });
      return res.status(200).send({ message: "Success", data: user });
    });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const userUpdateResponse = await User.findOneAndUpdate(
      { userName: req.body.userName },
      req.body,
      {
        new: true,
      }
    );
    if (!userUpdateResponse) {
      return res.status(400).send({ message: "Username not found" });
    } else {
      res.status(200).send(userUpdateResponse);
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
