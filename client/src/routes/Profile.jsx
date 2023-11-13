import CreatePostWidget from "components/Widget/CreatePostWidget";
import FeedWidget from "components/Widget/FeedWidget";
import FriendsWidget from "components/Widget/FriendsWidget";
import UserWidget from "components/Widget/UserWidget.jsx";
import { useParams } from "react-router-dom";
import { useSelector } from "../../node_modules/react-redux/es/exports";

export default function Profile() {
  const {userId} = useParams() 
  const currUser = useSelector(state => state.auth.user)
  return (
    <div className="h-full w-full lg:flex block gap-4 lg:justify-center">
      <div className="basis-[32%]">
        <UserWidget userId={userId}/>
        <FriendsWidget userId={userId}/>
      </div>
      <div className="basis-[50%]">
        {currUser === userId && <CreatePostWidget />}
        <FeedWidget isProfile={true} userId={userId}/>
      </div>
    </div>
  )
}
