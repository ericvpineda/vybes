import {
  ChatBubbleOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import WidgetWrapper from "./WidgetWrapper";
import Person from "components/Person";
import HorizontalLine from "components/HorizontalLine";
import { IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setLogout, setPost } from "state/auth";

export default function PostWidget({
  firstName,
  lastName,
  userId,
  body,
  location,
  imageUrl,
  userImageUrl,
  likes,
  comments,
  postId,
  isFriend = false,
}) {

  const {token, user: currUser } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const toggleLike = async () => {
    const response = await fetch(`http://localhost:8000/posts/${postId}`, {
      method: "PATCH",
      headers: {Authorization: "Bearer " + token, "Content-Type": "application/json"},
      body: JSON.stringify({userId: currUser})
    })
    if (response.ok) {
      const updatedPost = await response.json()
      dispatch(setPost({post: updatedPost}))
    }
  }

  console.log("DEBUG: userid in likes", typeof likes)
  return (
    <WidgetWrapper>
      <Person
        firstName={firstName}
        lastName={lastName}
        userId={userId}
        location={location}
        imageUrl={userImageUrl}
        isFriend={isFriend}
      />
      <h3 className="text-sm text-lightNeutral-300 mb-3">{body}</h3>
      {imageUrl && (
        <div className="w-full h-full">
          <img
            src={`http://localhost:8000/assets/${imageUrl}`}
            alt={`${imageUrl}`}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      )}
      <HorizontalLine />

      <div className="flex justify-between">
        <div className="flex">
          <div className="flex items-center">
            <IconButton onClick={toggleLike}>
              {currUser in likes ? (
                <FavoriteOutlined />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <p className="ml-1 mr-3">{Object.keys(likes).length}</p>
          </div>
          <div className="flex items-center">
            <IconButton>
              <ChatBubbleOutlined />
            </IconButton>
            <p className="ml-1">{comments.length}</p>
          </div>
        </div>
        <div className="flex items-center">
          <IconButton>
            <ShareOutlined />
          </IconButton>
          <p className="ml-1">0</p>
        </div>
      </div>
    </WidgetWrapper>
  );
}
