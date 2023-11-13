import CreatePostWidget from "components/Widget/CreatePostWidget";
import FeedWidget from "components/Widget/FeedWidget";
import FriendsWidget from "components/Widget/FriendsWidget";
import UserWidget from "components/Widget/UserWidget.jsx";

export default function Profile() {
  return (
    <div className="h-full w-full lg:flex block gap-4 lg:justify-center">
      <div className="basis-[32%]">
        <UserWidget />
        <FriendsWidget/>
      </div>
      <div className="basis-[50%]">
        <CreatePostWidget />
        <FeedWidget isProfile={true}/>
      </div>
    </div>
  )
}
