import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

// Note: need to define due to es6 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

dotenv.config()

app.use(cors());
app.use(express.json())
app.use(helmet());
// Prevent other websites from using current website cross-origin 
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
// Set directory of where keep assets (Note: Production version needs to be stored on cloud)
app.use("/assests", express.static(path.join(__dirname, "public/assets")))

// Local file storage for multi-media
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "public/assets")
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
})

const upload = multer({storage})

// Test route
app.get('/message', (req, res) => {
    res.json({message: "Hello from server!"})
})

const port = 8000
app.listen(port, () => console.log(`Server is running on port ${port}.`))