import AdWidget from "components/Widget/AdWidget";
import CreatePostWidget from "components/Widget/CreatePostWidget";
import FeedWidget from "components/Widget/FeedWidget";
import FriendsWidget from "components/Widget/FriendsWidget";
import UserWidget from "components/Widget/UserWidget.jsx";
import { useSelector } from "react-redux";

export default function Home() {
  const userId = useSelector(state => state.auth.user)
  return (
    <div className="h-full w-full lg:flex block gap-4">
      <div className="basis-[27%]">
        <UserWidget userId={userId}/>
      </div>
      <div className="basis-[48%]">
        <CreatePostWidget userId={userId}/>
        <FeedWidget userId={userId}/>
      </div>
      <div className="basis-[25%]">
        <AdWidget/>
        <FriendsWidget userId={userId}/>
      </div>
    </div>
  );
}
