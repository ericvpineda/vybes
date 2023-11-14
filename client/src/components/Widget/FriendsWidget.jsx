import React from "react";
import WidgetWrapper from "./WidgetWrapper";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getFriends } from "utils/utils";
import Person from "components/Person";

export default function FriendsWidget({userId}) {
  const { token, friends:userFriends } = useSelector((state) => state.auth);
  const [friends, setfriends] = useState(null);

  useEffect(() => {
    getFriends({ token, userId, setfriends });
  }, [token, userId, userFriends]);

  return (
    <WidgetWrapper>
      <div className="font-bold text-md mb-2">Friends</div>
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
