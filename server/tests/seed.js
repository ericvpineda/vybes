import mongoose from "mongoose";
import User from "../models/users.js";
import Post from "../models/posts.js";
import dotenv from "dotenv";
import path from "path"
import { fileURLToPath } from "url";
import { posts } from "./posts.js";
import { people } from "./people.js";
import bcrypt from "bcrypt"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({path: path.resolve(__dirname, '../.env')})

const MONGODB_URL = process.env.MONGODB_DEV;

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection;
db.once("open", () => console.log("Database: development"))
db.on("error", console.error.bind(console, "Error: Database connection failed."))

const run = async () => {

    await User.deleteMany({});
    await Post.deleteMany({});

    const salt = await bcrypt.genSalt();
    
    for (let i=0; i < people.length; i++) {
      const person = people[i];
      const passwordHash = await bcrypt.hash(person.password, salt);
      person.password = passwordHash;
      const body = posts[i].body;

      const user = new User(person)
      const post = new Post({
        body: body,
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName
      })
      await user.save()
      await post.save()
    }
}

run().then(() => mongoose.connection.close())