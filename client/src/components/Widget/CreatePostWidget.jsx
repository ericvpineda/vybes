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
import { setLogout, setPosts } from "state/auth";
import { HOST_BACKEND, getUser } from "utils/utils";
import toast from "react-hot-toast";
import { IconButton } from "@mui/material";

export default function CreatePostWidget() {
  const [postInfo, setpostInfo] = useState("");
  const { token, user: userId, mode } = useSelector((state) => state.auth);
  const [buttonText, setbuttonText] = useState("Post");
  const [image, setimage] = useState(null);
  const dispatch = useDispatch();
  const [user, setuser] = useState(null);
  const iconColor = mode === "dark" ? "white" : "black";
  const onClickHandler = async () => {
    const values = {
      userId: user._id,
      body: postInfo,
      imageUrl: image ? image : "",
      imageName: image ? image.name : "",
    };
    const form = new FormData();
    for (let key in values) {
      form.append(key, values[key]);
    }
    const response = await fetch(`${HOST_BACKEND}/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    });

    const posts = await response.json();

    if (response.ok) {
      setbuttonText("Done!");
      setTimeout(() => setbuttonText("Post"), 800);
      setimage(null);
      setpostInfo("");
      dispatch(setPosts({ posts }));
    } else {
      // TODO: Reply back to user with failed response
      toast.error("Unable to create post.");
    }
  };

  useEffect(() => {
    getUser({ userId, token, setuser });
  }, [token, userId]);

  return (
    <WidgetWrapper>
      <div className="flex w-full">
        <UserImage name={user ? user.imageUrl : ""} />
        <InputBase
          placeholder="Tell me some good news..."
          sx={{
            width: "100%",
            m: "0 0 0 1rem",
            backgroundColor: mode === "dark" ? "#333" : "#eee",
            color: mode === "dark" ? "white" : "#gray",
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
          onChange={(e) => setpostInfo(e.target.value)}
          value={postInfo}
        />
      </div>
      <HorizontalLine />
      <div className="flex w-full justify-center">
        <Dropzone
          acceptedFiles=".jpg,.jpeg,.png"
          multiple={false}
          onDrop={(acceptedFiles) => setimage(acceptedFiles[0])}
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
                  <IconButton style={{ color: iconColor }}>
                    <AddPhotoAlternateIcon />
                  </IconButton>
                  <p className="sm:ml-1 hidden sm:block darkmode_create_button_text">
                    Image
                  </p>
                </>
              ) : (
                <div className="flex items-center">
                  <div className="mr-3 button_text_nowrap darkmode_text_header">
                    {image.name}
                  </div>
                  <IconButton style={{ color: iconColor }}>
                    <EditOutlined />
                  </IconButton>
                </div>
              )}
            </div>
          )}
        </Dropzone>
        <div className="create_post_button">
          <IconButton style={{ color: iconColor }}>
            <AttachFileIcon />
          </IconButton>
          <p className="sm:ml-1 hidden sm:block darkmode_create_button_text">
            Attachment
          </p>
        </div>
        <div className="create_post_button">
          <IconButton style={{ color: iconColor }}>
            <MicOutlined />
          </IconButton>
          <p className="sm:ml-1 hidden sm:block darkmode_create_button_text">
            Record
          </p>
        </div>
        <div className="create_post_button">
          <IconButton style={{ color: iconColor }}>
            <VideoCameraBackIcon />
          </IconButton>
          <p className="sm:ml-1 hidden sm:block darkmode_create_button_text">
            Video
          </p>
        </div>

        <Button
          variant="contained"
          onClick={onClickHandler}
          disabled={postInfo.length === 0 ? true : false}
          style={{
            cursor: "pointer",
          }}
          sx={{
            p: "0.25rem 1rem 0 1rem",
            m: "0 0 0 1rem",
            backgroundColor: mode === "dark" ? "#40916c" : "#309a4f",
            "&:hover": {
              backgroundColor: mode === "dark" ? "#2d6a4f" : "#40916c",
            },
          }}
        >
          <span className="text-darkNeutral-200">
            {buttonText}
          </span>
        </Button>
      </div>
    </WidgetWrapper>
  );
}
