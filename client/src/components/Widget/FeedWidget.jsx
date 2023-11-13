import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostWidget from "./PostWidget";
import { setPosts } from "state/auth";
import { getUser } from "utils/utils";

export default function FeedWidget({ isProfile = false }) {
  const { posts, token, user: userId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [user, setuser] = useState(null)

  const getPosts = async () => {
    const response = await fetch("http://localhost:8000/posts", {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
    }
  };
  
 
  useEffect(() => {
    getUser({userId, token, setuser})
    getPosts();
  }, []);

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
