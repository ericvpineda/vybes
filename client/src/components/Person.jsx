import React from "react";
import { useNavigate } from "react-router-dom";
import UserImage from "./UserImage";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { setFriends } from "state/auth";

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
  const { token, user: id } = useSelector((state) => state.auth);

  const addRemoveHandler = async () => {
    const response = await fetch(`http://localhost:8000/user/${id}/${userId}`, {
      method: "PATCH",
      headers: { Authorization: "Bearer " + token },
    });

    if (response.ok) {
      const friends = await response.json();
      dispatch(setFriends({ friends }));
    }
  };
  console.log("DEBUG: userid, id=", userId, id);
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
          <h4 className="font-bold text-md text-lightPrimary-0">
            {firstName} {lastName}
          </h4>
          <div className="text-lightNeutral-200 text-sm">
            {location || "Seattle, Washington"}
          </div>
        </div>
      </div>
      {id !== userId &&
        (isFriend ? (
          <div className="cursor-pointer" onClick={addRemoveHandler}>
            <PersonRemoveOutlined />
          </div>
        ) : (
          <div className="cursor-pointer" onClick={addRemoveHandler}>
            <PersonAddOutlined />
          </div>
        ))}
    </div>
  );
}
