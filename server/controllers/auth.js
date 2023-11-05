import bcrypt from "bcrypt";
import jwt from "jwt";
import User from "../models/users";

export const createUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      imageUrl,
      bio,
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
        bio,
        location,
        profileViews: Math.floor(Math.random() * 1000),
        friends,
    })

    const savedUser = await user.save();
    // Note: Json to allow frontend to recieve response  
    res.status(201).json(savedUser); 

  } catch (error) {
    res.status(500).json({error: error.message});
  }
};
