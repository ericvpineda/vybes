import { Schema, model } from "mongoose";

const linkSchema = new Schema({
  title: { type: String, maxLength: 20 },
  url: String,
  imageUrl: String,
})

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, minLength: 1, maxLength: 50 },
    lastName: { type: String, maxLength: 50, default: "" },
    email: {
      type: String,
      required: true,
      maxLength: 50,
      unqiue: true,
      index: true,
    },
    password: { type: String, required: true, minLength: 8 },
    imageUrl: { type: String, default: "" },
    bio: { type: String, default: "" },
    location: { type: String, default: "" },
    occupation: { type: String, default: "" },
    profileViews: { type: Number, default: 0, min: 0 },
    friends: { type: Array, default: [] },
    links: [linkSchema],
  },
  { timestamps: true }
);

const User = model("User", userSchema);
export default User;
