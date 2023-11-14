import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import UserImage from "components/UserImage";
import WidgetWrapper from "./WidgetWrapper";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HorizontalLine from "components/HorizontalLine";
import { getUser } from "utils/utils";

export default function UserWidget({ userId }) {
  const { token, friends: userFriends } = useSelector((state) => state.auth);
  const [user, setuser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUser({ userId, token, setuser });
  }, [token, userId, userFriends]);

  if (!user) {
    return null;
  }

  const { firstName, lastName, location, profileViews, friends } = user;

  return (
    <WidgetWrapper>
      <div className="flex justify-between w-full items-center min-w-[15rem]">
        <div className="flex items-center">
          <div
            className="cursor-pointer flex justify-center items-center mr-2"
            onClick={() => navigate(`/profile/${userId}`)}
          >
            <UserImage name={user ? user.imageUrl : ""} />
          </div>
          <div>
            <h4 className="font-bold text-xl text-lightPrimary-0">
              {firstName} {lastName}
            </h4>
            <div className="text-lightNeutral-200">
              {friends.length} friends
            </div>
          </div>
        </div>
        <div>
          <ManageAccountsOutlined />
        </div>
      </div>
      <HorizontalLine />
      <div className="text-lightNeutral-0 pl-1">
        <div className="flex">
          <LocationOnOutlined />
          <p className="ml-2">{location || "San Francisco, CA"}</p>
        </div>

        <div className="flex">
          <WorkOutlineOutlined />
          <p className="ml-2">{"Software Engineer"}</p>
        </div>
      </div>
      <HorizontalLine />
      <div className="text-lightNeutral-0 px-1">
        <div className="flex justify-between items-center">
          <p>Times profile was viewed:</p>
          <p className="ml-2">{profileViews}</p>
        </div>

        <div className="flex justify-between items-center">
          <p>People following:</p>
          <p className="ml-2">{998}</p>
        </div>
      </div>
      <HorizontalLine />
      <div className="text-lightNeutral-0 px-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <svg
              width="32px"
              height="32px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>github</title>
              <rect width="24" height="24" fill="none" />
              <path d="M12,2A10,10,0,0,0,8.84,21.5c.5.08.66-.23.66-.5V19.31C6.73,19.91,6.14,18,6.14,18A2.69,2.69,0,0,0,5,16.5c-.91-.62.07-.6.07-.6a2.1,2.1,0,0,1,1.53,1,2.15,2.15,0,0,0,2.91.83,2.16,2.16,0,0,1,.63-1.34C8,16.17,5.62,15.31,5.62,11.5a3.87,3.87,0,0,1,1-2.71,3.58,3.58,0,0,1,.1-2.64s.84-.27,2.75,1a9.63,9.63,0,0,1,5,0c1.91-1.29,2.75-1,2.75-1a3.58,3.58,0,0,1,.1,2.64,3.87,3.87,0,0,1,1,2.71c0,3.82-2.34,4.66-4.57,4.91a2.39,2.39,0,0,1,.69,1.85V21c0,.27.16.59.67.5A10,10,0,0,0,12,2Z" />
            </svg>
            <div className="flex flex-col justify-start">
              <p className="ml-2 border-b-2 border-slate-200 font-medium">
                GitHub
              </p>
              <p className="ml-2">
                https://github.com/{firstName}
                {lastName}
              </p>
            </div>
          </div>
          <EditOutlined />
        </div>
      </div>
    </WidgetWrapper>
  );
}
