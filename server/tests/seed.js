import mongoose from "mongoose";
import User from "../models/users.js";
import Post from "../models/posts.js";
import dotenv from "dotenv";
import path from "path"
import { fileURLToPath } from "url";

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

}

// run().then(() => mongoose.connection.close())