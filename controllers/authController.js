import jwt from "jsonwebtoken";
import * as authServices from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import dotenv from "dotenv/config";
import gravatar from "gravatar";
import Jimp from "jimp";

const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  const { email } = req.body;
  const user = await authServices.findUser({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const avatar = gravatar.url(email, { s: "200", r: "pg", d: "404" });
  const newUser = await authServices.signup({ ...req.body, avatarURL: avatar });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const comparePassword = await authServices.validatePassword(
    password,
    user.password
  );
  if (!comparePassword) {
    throw HttpError(401, "Email or password invalid");
  }

  const { _id: id } = user;

  const payload = {
    id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await authServices.updateUser({ _id: id }, { token });
  res.json({
    token,
    user: {
      email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

const signout = async (req, res) => {
  const { _id } = req.user;
  await authServices.updateUser({ _id }, { token: "" });
  res.status(204).send();
};

const updateAvatars = async (req, res) => {
  const { path: oldPath, filename } = req.file;
  const { _id } = req.user;
  const newPath = path.join(avatarPath, filename);

  const resizedAvatar = await Jimp.read(oldPath);
  await resizedAvatar.resize(250, 250).write(oldPath);

  await fs.rename(oldPath, newPath);
  const avatar = path.join("avatars", filename);
  await userServices.updateUser({ _id }, { avatarURL: avatar });
  res.json({
    avatarURL: avatar,
  });
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  signout: ctrlWrapper(signout),
  updateAvatars: ctrlWrapper(updateAvatars),
};
