const { UserModel } = require("../model/user");
const AppError = require("../util/AppError");

const login = async (req, res) => {};

const register = async (req, res, next) => {
  const user = new UserModel(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    next(e);
  }
};

module.exports = { login, register };
