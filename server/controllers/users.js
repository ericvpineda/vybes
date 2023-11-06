import User from "../models/users";

const getUser = async (req, res) => {
    try {
      const {id} = req.params;
      const user = await User.findById(id);
      res.status(200).json(user)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
} 
const getUserFriends = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        const friends = await Promise.all(user.friends.map(id => User.findById(id)));
        const friendsFormatted = friends.map(({_id, firstname, lastName, location, imageUrl}) => {_id, firstname, lastName, location, imageUrl}) 
        res.status(200).json(friendsFormatted);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}
const addRemoveFriend = async (req, res) => {
    try {
        const {id, friendId} = req.params
        const user = await User.findById(id);
        const friend = await User.findById(id);
        if (user.friends.includes(friend)) {
            user.friends.filter(friend => friend.id != friendId)
            friend.friends.filter(friend => user.id != friend.id)
        } else {
            user.friends.push(friendId)
            friend.friends.push(id)
        }
        await user.save();
        await friend.save();
        const friends = await Promise.all(user.friends.map(id => User.findById(id)));
        const friendsFormatted = friends.map(({_id, firstname, lastName, location, imageUrl}) => {_id, firstname, lastName, location, imageUrl}) 
        res.status(200).json(friendsFormatted)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export {getUser, getUserFriends, addRemoveFriend}