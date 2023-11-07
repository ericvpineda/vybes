import express from "express"
import {getUser, getUserFriends, addRemoveFriend} from "../controllers/users.js"
import { isAuthenticated } from "../middleware/index.js"

const router = express.Router()

// Query string: id
router.get("/:id", isAuthenticated, getUser);
router.get("/:id/friends", isAuthenticated, getUserFriends);
router.patch("/:id/:friendId", isAuthenticated, addRemoveFriend);

export default router;