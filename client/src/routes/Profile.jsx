import CreatePostWidget from "components/Widget/CreatePostWidget";
import FeedWidget from "components/Widget/FeedWidget";
import FriendsWidget from "components/Widget/FriendsWidget";
import UserWidget from "components/Widget/UserWidget.jsx";
import { useParams } from "react-router-dom";
import { useSelector } from "../../node_modules/react-redux/es/exports";

export default function Profile() {
  const {userId} = useParams() 
  const user = useSelector(state => state.auth.user)
  return (
    <div className="h-full w-full lg:flex block gap-4 lg:justify-center">
      <div className="basis-[32%]">
        <UserWidget/>
        <FriendsWidget/>
      </div>
      <div className="basis-[50%]">
        {user._id === userId && <CreatePostWidget />}
        <FeedWidget isProfile={true}/>
      </div>
    </div>
  )
}
