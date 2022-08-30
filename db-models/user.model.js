const mongoose = require("mongoose");
const Joi = require("joi"); // Import Joi for validation

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 50,
    },
    userName: {
      type: String,
      minlength: 4,
      maxlength: 50,
      required: true,
      unique: true,
    },
    passWord: {
      type: String,
      minLength: 8,
      required: true,
    },
    socialMedia: {
      github: String,
      linkedin: String,
      facebook: String,
      twitter: String,
      portfolio: String,
      blog: String,
    },
    isOnboardingDone: Boolean,
    isAdmin: Boolean,
    isActive: Boolean,
    isDeleted: Boolean,
    isVerified: Boolean,
    isBlocked: Boolean,
    isBanned: Boolean,
    focus: [String],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.passWord;
      },
    },
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema); // Create a model from the schema

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50),
    userName: Joi.string().min(4).max(50).required().label("username"),
    passWord: Joi.string().min(8).max(255).label("password").required(),
    // confirm password
    confirmPassWord: Joi.string()
      .valid(Joi.ref("passWord"))
      .label("confirm password"),
  });

  return schema.validate(user);
};

module.exports = { User, validateUser }; // Export the model to be used in other files i.e service/controller
