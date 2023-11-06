import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import {createUser} from "./controllers/auth.js";
import { fileURLToPath } from "url";
import {GridFsStorage} from 'multer-gridfs-storage';
import Grid from 'gridfs-stream';
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"

dotenv.config();

// Note: need to define due to es6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 8001;
let MONGODB_URL = process.env.MONGODB_PROD;

if (process.env.NODE_ENV === 'development') {
    MONGODB_URL = process.env.MONGODB_DEV;
}

app.use(express.json());
app.use(helmet());
// Prevent other websites from using current website cross-origin
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// Set directory of where keep assets (Note: Production version needs to be stored on cloud)
app.use("/assests", express.static(path.join(__dirname, "public/assets")));

// Local file storage for multi-media
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/assets");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(`Database: ${process.env.NODE_ENV || "production"}.`))
.catch(() => console.log("Error: Database connection failed."))

// Routes 
app.post("/auth/register", upload.single("file-upload"), createUser);
app.use("/auth", authRoutes)
app.use("/user", userRoutes)


app.listen(PORT, () => console.log(`Server port: ${PORT}.`))
