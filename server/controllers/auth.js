import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/users.js";

// Create user from frontend input form
const createUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      imageUrl,
      location,
      friends,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const user = new User({
      password: passwordHash,
      firstName,
      lastName,
      email,
      imageUrl,
      location,
      profileViews: Math.floor(Math.random() * 1000),
      friends,
      bio: "",
    });

    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      const savedUser = await user.save();
      // Note: Json to allow frontend to recieve response
      res.status(201).json(savedUser);
    } else {
      res.status(500).json({ message : "Please use a different email." });
    }
  } catch (error) {
    res.status(500).json({ message : error.message });
  }
};

// Login by password bcrypt compare and create jwt token
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const accessToken = jwt.sign(
      { id: user._id },
      process.env.JWT_ACCESS_TOKEN
    );
    delete user.password;
    res.status(200).json({ accessToken, user });
  } catch (error) {
    res.status(500).json({ message : error.message });
  }
};

export { createUser, login };
