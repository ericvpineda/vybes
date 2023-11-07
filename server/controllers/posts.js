import Post from "../models/posts.js";
import User from "../models/users.js";

const createPost = async (req, res) => {
  try {
    const { userId, body, imageUrl } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      userImageUrl: user.imageUrl,
      body,
      imageUrl,
      location: user.location,
      firstName: user.firstName,
      lastName: user.lastName,
    });

    await newPost.save();
    const allPosts = await Post.find();
    // Note: make sure to update frontend based on new posts
    res.status(201).json(allPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFeedPosts = async (req, res) => {
  try {
    const allPosts = await Post.find({});
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const userPosts = await Post.find({ userId });
    res.status(200).json(userPosts);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);

    if (userId in post.likes && post.likes[userId] == true) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
    const updatedPost = await post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export { getFeedPosts, getUserPosts, likePost, createPost };
