import {
  ChatBubbleOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import WidgetWrapper from "./WidgetWrapper";
import Person from "components/Person";

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
  isFriend=false,
}) {
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
    </WidgetWrapper>
  );
}
