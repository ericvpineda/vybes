import React from "react";
import WidgetWrapper from "./WidgetWrapper";
import { useSelector } from "react-redux";
import Person from "components/Person";

export default function FriendsWidget() {
  const { friends } = useSelector((state) => state.auth);

  return (
    <WidgetWrapper>
      <div className="font-bold text-md mb-2 darkmode_text_header">Friends</div>
      {friends &&
        friends.map(({ firstName, lastName, _id, location, imageUrl }) => (
          <div key={_id} className="w-full mb-2">
              <Person
                firstName={firstName}
                lastName={lastName}
                userId={_id}
                location={location}
                imageUrl={imageUrl}
                isFriend={true}
              />
          </div>
        ))}
    </WidgetWrapper>
  );
}
