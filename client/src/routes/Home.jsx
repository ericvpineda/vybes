import CreatePostWidget from "components/Widget/CreatePostWidget";
import UserWidget from "components/Widget/UserWidget.jsx";
import { useSelector } from "react-redux";

export default function Home({imageName}) {
  const user = useSelector(state => state.auth.user)
  return (
    <div className="h-full w-full lg:flex block gap-4">
      
      <div className="basis-[28%]">
        <UserWidget userId={user._id} imageName={user.imageUrl}/>
      </div>
      <div className="basis-[44%]">
        <CreatePostWidget imageName={user.imageUrl}/>
      </div>
      <div className="basis-[28%]">
        {/* <UserWidget userId={user._id} imageName={user.imageUrl}/> */}
      </div>
    </div>
  );
}
