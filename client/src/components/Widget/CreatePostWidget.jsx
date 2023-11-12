import { useSelector, useDispatch } from "react-redux";
import WidgetWrapper from "./WidgetWrapper";
import { useState } from "react";
import UserImage from "components/UserImage";
import { InputBase } from "@mui/material";
import HorizontalLine from "components/HorizontalLine";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import Button from "@mui/material/Button";
import {
  EditOutlined,
  DeleteOutlined,
  GifBoxOutlined,
  MicOutlined,
  MoreHoizontalOutlined,
} from "@mui/icons-material";

export default function CreatePostWidget({ userId, imageName }) {
  const [postInfo, setpostInfo] = useState("");
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const [buttonText, setbuttonText] = useState("Post");

  const onClickHandler = async () => {
    const values = {
      userId: user._id,
      body: postInfo,
      imageUrl: "",
    };
    const form = new FormData();
    for (let key in values) {
      form.append(key, values[key])
    }
    const response = await fetch(`http://localhost:8000/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    });

    if (response.ok) {
      setbuttonText("Done!");
      setTimeout(() => setbuttonText("Post"), 800);
    } else {
      // TODO: Reply back to user with failed response
    }
  };

  return (
    <WidgetWrapper>
      <div className="flex w-full">
        <UserImage name={imageName} />
        <InputBase
          placeholder="Tell me some good news..."
          sx={{
            width: "100%",
            m: "0 0 0 1rem",
            backgroundColor: "#eee",
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
          onChange={(e) => setpostInfo(e.target.value)}
        />
      </div>
      <HorizontalLine />
      <div className="flex w-full justify-center">
        <div className="create_post_button">
          <AddPhotoAlternateIcon />
          <p className="sm:ml-1 hidden sm:block">Image</p>
        </div>
        <div className="create_post_button">
          <AttachFileIcon />
          <p className="sm:ml-1 hidden sm:block">Attachment</p>
        </div>
        <div className="create_post_button">
          <MicOutlined />
          <p className="sm:ml-1 hidden sm:block">Record</p>
        </div>
        <div className="create_post_button">
          <VideoCameraBackIcon />
          <p className="sm:ml-1 hidden sm:block">Video</p>
        </div>
        <Button variant="contained" onClick={onClickHandler}>
          {buttonText}
        </Button>
      </div>
    </WidgetWrapper>
  );
}
