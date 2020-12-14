const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, lowercase: true, unique: true },
    phone: { type: String },
    password: { type: String },
    role: {
      type: String,
    },
    isVerified: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  console.log("before saving", user);
  next();
});

const loginValidateSchema = Joi.object({
  email: Joi.string().email().min(5).max(500).required(),
  password: Joi.string().min(8).max(1024).required(),
});

const signupValidateSchema = Joi.object({
  email: Joi.string().email().min(5).max(500).required(),
  password: Joi.string().min(8).max(1024).required(),
  firstName: Joi.string().alphanum().max(1024).required(),
  lastName: Joi.string().alphanum().max(1024).required(),
  phone: Joi.string().min(10).max(10).required(),
  role: Joi.string().valid("user", "admin").required(),
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = { UserModel, loginValidateSchema, signupValidateSchema };
