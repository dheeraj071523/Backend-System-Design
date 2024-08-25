import { Router } from "express";
const router = Router();
import pkg from "jsonwebtoken";

import User from "../models/user.js";
const { sign } = pkg;

// Register Route
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await findOne({ username });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({ username, password });
    await user.save();

    const token = sign({ _id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = sign({ _id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
