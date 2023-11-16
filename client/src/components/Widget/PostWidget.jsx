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
import { useState } from "react";
import { HOST_BACKEND } from "utils/utils";
import toast from "react-hot-toast";

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
  const { token, user, mode } = useSelector((state) => state.auth);
  const iconColor = mode === "dark" ? "white" : "black";
  const dispatch = useDispatch();
  const [isShowingComments, setisShowingComments] = useState(false);

  const toggleLike = async () => {
    const response = await fetch(`${HOST_BACKEND}/posts/${postId}`, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user._id }),
    });
    if (response.ok) {
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    } else {
      toast.error("Unable to perform post action.");
    }
  };

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
      <h3 className="text-sm text-lightNeutral-300 my-3 darkmode_text_header">
        {body}
      </h3>
      {imageUrl && (
        <div className="w-full h-full mb-2">
          <img
            src={`http://localhost:8000/assets/${imageUrl}`}
            alt={`${imageUrl}`}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      )}

      <div className="flex justify-between">
        <div className="flex">
          <div className="flex items-center">
            <IconButton onClick={toggleLike} style={{ color: iconColor }}>
              {user._id in likes ? (
                <FavoriteOutlined />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <p className="ml-1 mr-3 darkmode_text_paragraph">
              {Object.keys(likes).length}
            </p>
          </div>
          <div className="flex items-center">
            <IconButton
              style={{ color: iconColor }}
              onClick={() => setisShowingComments(!isShowingComments)}
            >
              <ChatBubbleOutlined />
            </IconButton>
            <p className="ml-1 darkmode_text_paragraph">
              {comments.length}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <IconButton style={{ color: iconColor }}>
            <ShareOutlined />
          </IconButton>
          <p className="ml-1 darkmode_text_paragraph">
            0
          </p>
        </div>
      </div>
      {isShowingComments && comments && comments.length > 0 && (
        <>
          {comments.map((comment) => (
            <>
              <HorizontalLine />
              <div className="text-sm text-lightNeutral-300">{comment}</div>
            </>
          ))}
        </>
      )}
    </WidgetWrapper>
  );
}
