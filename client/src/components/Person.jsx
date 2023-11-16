import React from "react";
import { useNavigate } from "react-router-dom";
import UserImage from "./UserImage";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { setFriends, setUser } from "state/auth";
import { IconButton } from "@mui/material";
import { HOST_BACKEND } from "utils/utils";
import toast from "react-hot-toast";

export default function Person({
  firstName,
  lastName,
  userId,
  location,
  imageUrl,
  isFriend,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user, mode } = useSelector((state) => state.auth);
  const id = (user && user._id) || null;
  const iconColor = mode === "dark" ? "white" : "black";

  const addRemoveHandler = async () => {
    const response = await fetch(`${HOST_BACKEND}/user/${id}/${userId}`, {
      method: "PATCH",
      headers: { Authorization: "Bearer " + token },
    });

    if (response.ok) {
      const { friends, user } = await response.json();
      dispatch(setUser({ user }));
      dispatch(setFriends({ friends }));
    } else {
      toast.error("Unable to add/remove selected friend.");
    }
  };
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <div
          className="flex justify-center items-center mr-2 cursor-pointer"
          onClick={() => navigate(`/profile/${userId}`)}
        >
          <UserImage name={imageUrl} />
        </div>
        <div>
          <h4 className="font-bold text-md darkmode_text_primary">
            {firstName} {lastName}
          </h4>
          <div className="text-lightNeutral-200 dark:text-darkNeutral-500 text-sm">
            {location}
          </div>
        </div>
      </div>
      {id !== userId &&
        (isFriend ? (
          <div className="cursor-pointer" onClick={addRemoveHandler}>
            <IconButton style={{ color: iconColor }}>
              <PersonRemoveOutlined />
            </IconButton>
          </div>
        ) : (
          <div className="cursor-pointer" onClick={addRemoveHandler}>
            <IconButton style={{ color: iconColor }}>
              <PersonAddOutlined />
            </IconButton>
          </div>
        ))}
    </div>
  );
}
