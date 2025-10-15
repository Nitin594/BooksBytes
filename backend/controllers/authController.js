import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

/* ------------------- REGISTER CONTROLLER ------------------- */
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1️⃣ Check if all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // 3️⃣ Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // 5️⃣ Send response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/* ------------------- LOGIN CONTROLLER ------------------- */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // 2️⃣ Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // 3️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // 4️⃣ Generate JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // expires in 1 day
    );

    // 5️⃣ Send token and user data
    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
    console.log(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
