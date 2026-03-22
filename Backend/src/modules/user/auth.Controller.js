import bcrypt from "bcrypt"; 
import db from "../../models/index.js";
const {User,Portfolio} = db;

import { generateToken } from "../../utils/token.js";



export const register = async (req, res) => {
  try {
    const { name, email, password, username } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      username,
    });

    // 🔥 Sample Portfolio create
    await Portfolio.create({
      userId: user.id,
      // default values auto aa jayenge migration se
    });

    const token = generateToken(user.id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    });

    res.json({ message: "Registered + Sample Portfolio Ready 🚀" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Wrong password" });

    const token = generateToken(user.id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ message: "Login success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0), // cookie expire
    });

    res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getMyPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({
      where: { userId: req.user.id },
    });

    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getPortfolioByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const portfolio = await Portfolio.findOne({
      where: { userId: user.id },
    });

    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};