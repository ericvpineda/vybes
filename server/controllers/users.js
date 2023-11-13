import User from "../models/users.js";

// Get user object by given id
const getUser = async (req, res) => {
    try {
      const {id} = req.params;
      const user = await User.findById(id);
      res.status(200).json(user)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
} 

// Get user friends from given idf
const getUserFriends = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        const friends = await Promise.all(user.friends.map(id => User.findById(id)));
        const friendsFormatted = friends.map(({_id, firstname, lastName, location, imageUrl}) => ({_id, firstname, lastName, location, imageUrl})) 
        res.status(200).json(friendsFormatted);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

// Update user friend by given friendId
const addRemoveFriend = async (req, res) => {
    try {
        const {id, friendId} = req.params
        const user = await User.findById(id);
        const friend = await User.findById(friendId);
        if (user.friends.includes(friendId)) {
            // Note: friends is array of strings
            user.friends = user.friends.filter(userFriendId => userFriendId != friendId)
            friend.friends = friend.friends.filter(friendFriendId => friendFriendId != id)
        } else {
            user.friends.push(friendId)
            friend.friends.push(id)
        }
        await user.save();
        await friend.save();
        const friends = await Promise.all(user.friends.map(id => User.findById(id)));
        const friendsFormatted = friends.map(({_id, firstname, lastName, location, imageUrl}) => ({_id, firstname, lastName, location, imageUrl})) 
        res.status(200).json(friendsFormatted)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export {getUser, getUserFriends, addRemoveFriend}