import express from "express"
import {getUser, getUserFriends, addRemoveFriend, createLink} from "../controllers/users.js"
import { isAuthenticated } from "../middleware/index.js"

const router = express.Router()

// Query string: id
router.post("/:id/create-link", isAuthenticated, createLink);
router.get("/:id/friends", isAuthenticated, getUserFriends);
router.patch("/:id/:friendId", isAuthenticated, addRemoveFriend);
router.get("/:id", isAuthenticated, getUser);

export default router;