import User from "../models/users.js";
import Post from "../models/posts.js";

// Get user object by given id
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get user friends from given id
const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const friendsFormatted = friends.map(
      ({ _id, firstName, lastName, location, imageUrl }) => ({
        _id,
        firstName,
        lastName,
        location,
        imageUrl,
      })
    );
    res.status(200).json(friendsFormatted);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update user friend by given friendId
const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    if (user.friends.includes(friendId)) {
      // Note: friends is array of strings
      user.friends = user.friends.filter(
        (userFriendId) => userFriendId != friendId
      );
      friend.friends = friend.friends.filter(
        (friendFriendId) => friendFriendId != id
      );
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const friendsFormatted = friends.map(
      ({ _id, firstname, lastName, location, imageUrl }) => ({
        _id,
        firstname,
        lastName,
        location,
        imageUrl,
      })
    );
    delete user.password
    res.status(200).json({friends: friendsFormatted, user});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Note: need to call function from index.js (to save image locally)
const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const { firstName, lastName, occupation, location, imageUrl, bio } =
      req.body;
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      {
        firstName,
        lastName,
        occupation,
        location,
        imageUrl,
        bio,
      },
      { new: true }
    );
    const formattedUpdateUser = [updatedUser].map(
      ({
        firstName,
        lastName,
        location,
        profileViews,
        friends,
        occupation,
        bio,
        imageUrl,
        _id
      }) => ({
        _id,
        firstName,
        lastName,
        location,
        profileViews,
        friends,
        occupation,
        bio,
        imageUrl,
      })
    );

    // Update all posts with given user id with new information
    await Post.updateMany({userId: id}, {$set: {firstName, lastName, userImageUrl: imageUrl}})
    const posts = await Post.find({});


    res.status(200).json({user: formattedUpdateUser[0], posts});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export { getUser, getUserFriends, addRemoveFriend, updateUserProfile };
