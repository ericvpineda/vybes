import UserWidget from "components/Widget/UserWidget.jsx";
import { useSelector } from "react-redux";

export default function Home() {
  const user = useSelector(state => state.auth.user)
  return (
    <div className="h-full w-full">
      <UserWidget userId={user._id}/>
    </div>
  );
}
