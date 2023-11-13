import express from "express"
import {getFeedPosts, getUserPosts, likePost} from "../controllers/posts.js"
import { isAuthenticated } from "../middleware/index.js";

const router = express.Router()

router.get("/", getFeedPosts);
router.get("/:userId", isAuthenticated, getUserPosts);
router.patch("/:id", isAuthenticated, likePost)

export default router;