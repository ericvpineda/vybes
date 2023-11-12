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

export default function UserWidget({ userId, imageUrl }) {

  const token = useSelector(state => state.auth.token)
  const [user, setuser] = useState(null)
  const navigate = useNavigate();

  const getUser = async () => {
    const response = await fetch(`http://localhost:3000/user/${userId}`, {
      method: "GET",
      headers: {Authorization: `Bearer ${token}`}
    });

    const user = await response.json();
    if (response.ok) {
      setuser(user);
    }
  };

  useEffect(() => {getUser()}, [])

  // TODO: Add loading component
  if (!user) {return null;}

  const {firstName, lastName, location, profileViews, friends} = user;

  return (<WidgetWrapper>
    <div className="pb-[1.1rem]" onClick={() => navigate(`/profile/${userId}`)}>
      <UserImage name="morty.jpg"/>
    </div>
  </WidgetWrapper>)
}
