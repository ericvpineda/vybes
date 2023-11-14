import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostWidget from "./PostWidget";
import { setPosts } from "state/auth";
import { HOST_BACKEND, getUser } from "utils/utils";
import toast from "react-hot-toast";

export default function FeedWidget({ isProfile = false, userId }) {
  const {
    posts,
    token,
    friends,
  } = useSelector((state) => state.auth);
  
  const dispatch = useDispatch();
  const [user, setuser] = useState(null);

  const getPosts = async () => {
    const response = await fetch(`${HOST_BACKEND}/posts`, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
    } else {
      toast.error("Unable to fetch feed posts.")
    }
  };

  // Note: friends needed to update isFriend boolean
  useEffect(() => {
    getUser({ userId, token, setuser});
    getPosts();
  }, [friends, token, userId]);

  return (
    <>
      {isProfile
        ? posts &&
          posts
            .filter((post) => post.userId === userId)
            .map(
              ({
                _id,
                firstName,
                lastName,
                userId,
                body,
                location,
                imageUrl,
                userImageUrl,
                likes,
                comments,
              }) => (
                <PostWidget
                  key={_id}
                  postId={_id}
                  firstName={firstName}
                  lastName={lastName}
                  userId={userId}
                  body={body}
                  location={location}
                  imageUrl={imageUrl}
                  userImageUrl={userImageUrl}
                  likes={likes}
                  comments={comments}
                />
              )
            )
        : posts &&
          posts.map(
            ({
              firstName,
              lastName,
              userId,
              body,
              location,
              imageUrl,
              userImageUrl,
              likes,
              comments,
              _id,
            }) => (
              <PostWidget
                key={_id}
                postId={_id}
                firstName={firstName}
                lastName={lastName}
                userId={userId}
                body={body}
                location={location}
                imageUrl={imageUrl}
                userImageUrl={userImageUrl}
                likes={likes}
                comments={comments}
                isFriend={user && user.friends.includes(userId)}
              />
            )
          )}
    </>
  );
}
