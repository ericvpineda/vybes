import AdWidget from "components/Widget/AdWidget";
import CreatePostWidget from "components/Widget/CreatePostWidget";
import FeedWidget from "components/Widget/FeedWidget";
import FriendsWidget from "components/Widget/FriendsWidget";
import UserWidget from "components/Widget/UserWidget.jsx";

export default function Home() {
  return (
    <div className="h-full w-full lg:flex block gap-4">
      <div className="basis-[27%]">
        <UserWidget/>
      </div>
      <div className="basis-[48%]">
        <CreatePostWidget />
        <FeedWidget/>
      </div>
      <div className="basis-[25%]">
        <AdWidget/>
        <FriendsWidget />
      </div>
    </div>
  );
}
