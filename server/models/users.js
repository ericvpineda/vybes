import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, min: 2, max: 50 },
    lastName: { type: String, min: 2, max: 50 },
    email: { type: String, required: true, max: 50, unqiue: true },
    password: { type: String, required: true, min: 8 },
    imageUrl: { type: String, default: "" },
    bio: { type: String },
    location: { type: String },
    profileViews: { type: Number },
    friends: { type: Array, default: [] },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
export default User;
