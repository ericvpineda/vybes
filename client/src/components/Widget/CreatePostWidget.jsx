import { useSelector, useDispatch } from "react-redux";
import WidgetWrapper from "./WidgetWrapper";
import { useState, useEffect } from "react";
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
import Dropzone from "react-dropzone";
import { setPosts } from "state/auth";
import { getUser } from "utils/utils";

export default function CreatePostWidget() {
  const [postInfo, setpostInfo] = useState("");
  const {token, user:userId} = useSelector((state) => state.auth);
  const [buttonText, setbuttonText] = useState("Post");
  const [image, setimage] = useState(null);
  const dispatch = useDispatch()
  const [user, setuser] = useState(null)

  const onClickHandler = async () => {
    const values = {
      userId: user._id,
      body: postInfo,
      imageUrl: image ? image : "",
      imageName: image ? image.name : ""
    };
    const form = new FormData();
    for (let key in values) {
      form.append(key, values[key]);
    }
    const response = await fetch(`http://localhost:8000/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    });

    const posts = await response.json()

    if (response.ok) {
      setbuttonText("Done!");
      setTimeout(() => setbuttonText("Post"), 800);
      setimage(null);
      setpostInfo("")
      dispatch(setPosts({posts}))
    } else {
      // TODO: Reply back to user with failed response
    }
  };

  
  useEffect(() => {
    getUser({ userId, token, setuser });
  }, []);

  return (
    <WidgetWrapper>
      <div className="flex w-full">
        <UserImage name={user ? user.imageUrl : ""} />
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
        <Dropzone
          acceptedFiles=".jpg,.jpeg,.png"
          multiple={false}
          onDrop={acceptedFiles => setimage(acceptedFiles[0])}
        >
          {({ getRootProps, getInputProps }) => (
            <div className="create_post_button" {...getRootProps()}>
              <input
                {...getInputProps()}
                id="imageUrl"
                name="imageUrl"
                type="file"
                className="sr-only"
              />
              {!image ? (
                <>
                  {" "}
                  <AddPhotoAlternateIcon />
                  <p className="sm:ml-1 hidden sm:block">Image</p>
                </>
              ) : (
                <div className="flex items-center">
                  <div className="mr-3 create_post_button_action">{image.name}</div>
                  <EditOutlined />
                </div>
              )}
            </div>
          )}
        </Dropzone>
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
        <Button variant="contained" onClick={onClickHandler} disabled={postInfo.length === 0 ? true : false}>
          {buttonText}
        </Button>
      </div>
    </WidgetWrapper>
  );
}
