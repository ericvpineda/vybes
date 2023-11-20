import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  HighlightOff,
} from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import UserImage from "components/UserImage";
import WidgetWrapper from "./WidgetWrapper";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HorizontalLine from "components/HorizontalLine";
import { IconButton } from "@mui/material";
import PopupWrapper from "components/PopupWrapper";
import * as Yup from "yup";
import { Formik } from "formik";
import Dropzone from "react-dropzone";
import { TextField } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { HOST_BACKEND } from "utils/utils";
import toast from "react-hot-toast";
import { setPosts, setUser } from "state/auth";
import { useDispatch } from "react-redux";
import UserLink from "components/UserLink";

export default function UserWidget() {
  // Note: Do not need useEffect since useSelector will force rerender on updated state
  const { token, mode, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const iconColor = mode === "dark" ? "white" : "black";
  const [showUserEdit, setshowUserEdit] = useState(false);
  const [showLinkCreate, setshowLinkCreate] = useState(false);

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    profileViews,
    friends,
    occupation,
    bio,
    imageUrl,
  } = user;

  // Note: imageUrl is set as string
  const initialValues = {
    firstName,
    lastName,
    occupation,
    location,
    imageUrl,
    bio,
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    bio: Yup.string().max(140, "Bio length atmost 140 characters."),
    occupation: Yup.string().max(30, "Occupation length atmost 30 characters."),
    imageUrl: Yup.string(),
    location: Yup.string(),
  });

  // Note: imageUrl is set as string
  const linkInitialValues = {
    imageUrl: "",
    linkTitle: "",
    linkUrl: "",
  };

  const linkValidationSchema = Yup.object({
    linkTitle: Yup.string()
      .max(20, "Link title atmost 20 characters.")
      .required(),
    linkUrl: Yup.string().required(),
    imageUrl: Yup.string(),
  });

  const labelnameColor = "#40916c";

  const formSubmitHandler = async (values, props) => {
    const form = new FormData();
    for (let key in values) {
      form.append(key, values[key]);
    }
    // Note: Only append if new image added (File Object is present)
    if (typeof values.imageUrl !== "string") {
      form.append("imageUrl", values.imageUrl.name);
    }

    const response = await fetch(`${HOST_BACKEND}/user/${user._id}`, {
      headers: { Authorization: "Bearer " + token },
      method: "PATCH",
      body: form,
    });

    const updateUserResponse = await response.json();
    if (response.ok) {
      dispatch(setUser({ user: updateUserResponse.user }));
      dispatch(setPosts({ posts: updateUserResponse.posts }));
      setshowUserEdit(!showUserEdit);
      toast.success(`Profile Updated!`);
    } else {
      toast.error(updateUserResponse.message);
    }
  };

  const userLinkSubmitHandler = async (values, props) => {
    const response = await fetch(
      `${HOST_BACKEND}/user/${user._id}/create-link`,
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(values),
      }
    );

    const updateUserResponse = await response.json();
    if (response.ok) {
      dispatch(setUser({ user: updateUserResponse.user }));
      setshowLinkCreate(!showLinkCreate);
      toast.success(`Added link!`);
    } else {
      toast.error(updateUserResponse.message);
    }
  };

  return (
    <WidgetWrapper>
      <div className="flex justify-between w-full items-center min-w-[15rem]">
        <div className="flex items-center">
          <div
            className="cursor-pointer flex justify-center items-center mr-2"
            onClick={() => navigate(`/profile/${user._id}`)}
          >
            <UserImage name={user ? user.imageUrl : ""} />
          </div>
          <div>
            <h4 className="font-bold text-xl darkmode_text_primary">
              {firstName} {lastName}
            </h4>
            <div className="darkmode_text_paragraph">
              {(friends && friends.length) || 0} friends
            </div>
          </div>
        </div>
        <IconButton onClick={() => setshowUserEdit(!showUserEdit)}>
          <ManageAccountsOutlined
            style={{ color: iconColor }}
            className="cursor-pointer"
          />
        </IconButton>
      </div>
      {bio && bio.length > 0 && (
        <div className="mt-2">
          <p className="text-md darkmode_text_header px-2">{bio}</p>
        </div>
      )}
      <HorizontalLine />
      <div className="darkmode_text_header pl-1">
        <div className="flex">
          <LocationOnOutlined />
          <p className="ml-2">{location || "n/a"}</p>
        </div>

        <div className="flex">
          <WorkOutlineOutlined />
          <p className="ml-2">{occupation || "n/a"}</p>
        </div>
      </div>
      <HorizontalLine />
      <div className="darkmode_text_header px-1">
        <div className="flex justify-between items-center">
          <p>Times profile was viewed:</p>
          <p className="ml-2">{profileViews}</p>
        </div>

        <div className="flex justify-between items-center">
          <p>People following:</p>
          <p className="ml-2">{998}</p>
        </div>
      </div>
      <HorizontalLine />
      {user.links && user.links.length > 0 &&
        user.links.map(({ title, url, imageUrl }) => (
          <UserLink title={title} url={url} imageUrl={imageUrl} />
        ))}
      <div className="flex justify-center items-center pb-0">
        <IconButton onClick={() => setshowLinkCreate(!showLinkCreate)}>
          <AddCircleIcon style={{ fontSize: "2.5rem" }} />
        </IconButton>
      </div>
      {showLinkCreate && (
        <PopupWrapper togglePopup={() => setshowLinkCreate(!showLinkCreate)}>
          <div className="rounded-lg w-full max-w-md bg-white p-7 bg-white dark:bg-darkBackground-0">
            <div className="pb-5 flex justify-center">
              <h2 className="text-xl font-semibold leading-7 text-lightPrimary-500 uppercase">
                Create New Profile Link
              </h2>
            </div>
            {/* Registeration Form  */}
            <Formik
              initialValues={linkInitialValues}
              onSubmit={userLinkSubmitHandler}
              validationSchema={linkValidationSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
              }) => (
                <form
                  method="POST"
                  encType="multipart/form-data"
                  onSubmit={handleSubmit}
                >
                  {/* Field: Update Image */}

                  {/* Field: Link Title */}
                  <TextField
                    label="Link title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.linkTitle}
                    name="linkTitle"
                    error={
                      Boolean(touched.linkTitle) && Boolean(errors.linkTitle)
                    }
                    helperText={touched.linkTitle && errors.linkTitle}
                    sx={{
                      width: "100%",
                      m: "0 0 1rem 0",
                      ...(mode === "dark" && {
                        "& .MuiInputLabel-root": {
                          color: "white",
                        },
                        "& .MuiOutlinedInput-input": {
                          color: "white",
                        },
                        "& .Mui-focused": {
                          color: labelnameColor,
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white",
                          },
                          "&:hover fieldset": {
                            borderColor: "white",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "white",
                          },
                          "&.Mui-focused": {
                            borderColor: "white",
                          },
                        },
                      }),
                    }}
                  />

                  {/* Field: Link Url */}
                  <TextField
                    onChange={handleChange}
                    label="Link url"
                    onBlur={handleBlur}
                    value={values.linkUrl}
                    name="linkUrl"
                    error={Boolean(touched.linkUrl) && Boolean(errors.linkUrl)}
                    helperText={touched.linkUrl && errors.linkUrl}
                    sx={{
                      width: "100%",
                      m: "0 0 1rem 0",
                      ...(mode === "dark" && {
                        "& .MuiInputLabel-root": {
                          color: "white",
                        },
                        "& .MuiOutlinedInput-input": {
                          color: "white",
                        },
                        "& .Mui-focused": {
                          color: labelnameColor,
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white",
                          },
                          "&:hover fieldset": {
                            borderColor: "white",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "white",
                          },
                          "&.Mui-focused": {
                            borderColor: "white",
                          },
                        },
                      }),
                    }}
                  />

                  {/* Field: Link Image */}
                  <TextField
                    onChange={handleChange}
                    label="Link Image"
                    onBlur={handleBlur}
                    value={values.imageUrl}
                    name="imageUrl"
                    error={
                      Boolean(touched.imageUrl) && Boolean(errors.imageUrl)
                    }
                    helperText={touched.imageUrl && errors.imageUrl}
                    sx={{
                      width: "100%",
                      m: "0 0 1rem 0",
                      ...(mode === "dark" && {
                        "& .MuiInputLabel-root": {
                          color: "white",
                        },
                        "& .MuiOutlinedInput-input": {
                          color: "white",
                        },
                        "& .Mui-focused": {
                          color: labelnameColor,
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white",
                          },
                          "&:hover fieldset": {
                            borderColor: "white",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "white",
                          },
                          "&.Mui-focused": {
                            borderColor: "white",
                          },
                        },
                      }),
                    }}
                  />

                  <button
                    type="submit"
                    className="mt-4 bg-lightPrimary-500 hover:bg-lightPrimary-0 text-white py-4 px-1 rounded-lg mb-4 text-md w-full"
                  >
                    Add
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </PopupWrapper>
      )}
      {showUserEdit && (
        <PopupWrapper togglePopup={() => setshowUserEdit(!showUserEdit)}>
          <div className="rounded-lg w-full max-w-md bg-white p-7 bg-white dark:bg-darkBackground-0">
            <div className="pb-5 flex justify-center">
              <h2 className="text-xl font-semibold leading-7 text-lightPrimary-500 uppercase">
                Profile Info
              </h2>
            </div>
            {/* Registeration Form  */}
            <Formik
              initialValues={initialValues}
              onSubmit={formSubmitHandler}
              validationSchema={validationSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
              }) => (
                <form
                  method="POST"
                  encType="multipart/form-data"
                  onSubmit={handleSubmit}
                >
                  {/* Field: Update Image */}
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("imageUrl", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div className="mb-4 text-sm flex flex-col justify-center items-center rounded-md bg-white dark:bg-darkNeutral-900 font-semibold text-lightPrimary-500 focus-within:text-lightPrimary-0 focus-within:ring-offset-2 hover:text-lightPrimary-0 ">
                        <div
                          {...getRootProps()}
                          className="relative cursor-pointer text-sm flex justify-center border border-dashed border-gray-900/25 h-[8rem] w-[8rem] rounded-[50%] mt-2"
                        >
                          <input
                            {...getInputProps()}
                            id="imageUrl"
                            name="imageUrl"
                            type="file"
                            className="sr-only"
                          />

                          <div className="flex items-center justify-center w-full h-full">
                            <UserImage name={values.imageUrl} size="5rem" />
                          </div>
                          {typeof values.imageUrl === "string" ? (
                            <EditOutlinedIcon
                              sx={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                                color: labelnameColor,
                                height: "1.8rem",
                                width: "1.8rem",
                              }}
                            />
                          ) : (
                            <HighlightOff
                              sx={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                                color: "red",
                                height: "1.8rem",
                                width: "1.8rem",
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setFieldValue("imageUrl", imageUrl);
                              }}
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </Dropzone>

                  {/* Field: First Name */}
                  <TextField
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="firstName"
                    error={
                      Boolean(touched.firstName) && Boolean(errors.firstName)
                    }
                    helperText={touched.firstName && errors.firstName}
                    sx={{
                      width: "100%",
                      m: "0 0 1rem 0",
                      ...(mode === "dark" && {
                        "& .MuiInputLabel-root": {
                          color: "white",
                        },
                        "& .MuiOutlinedInput-input": {
                          color: "white",
                        },
                        "& .Mui-focused": {
                          color: labelnameColor,
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white",
                          },
                          "&:hover fieldset": {
                            borderColor: "white",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "white",
                          },
                          "&.Mui-focused": {
                            borderColor: "white",
                          },
                        },
                      }),
                    }}
                  />

                  {/* Field: Last Name */}
                  <TextField
                    onChange={handleChange}
                    label="Last Name"
                    onBlur={handleBlur}
                    value={values.lastName}
                    name="lastName"
                    error={
                      Boolean(touched.lastName) && Boolean(errors.lastName)
                    }
                    helperText={touched.lastName && errors.lastName}
                    sx={{
                      width: "100%",
                      m: "0 0 1rem 0",
                      ...(mode === "dark" && {
                        "& .MuiInputLabel-root": {
                          color: "white",
                        },
                        "& .MuiOutlinedInput-input": {
                          color: "white",
                        },
                        "& .Mui-focused": {
                          color: labelnameColor,
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white",
                          },
                          "&:hover fieldset": {
                            borderColor: "white",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "white",
                          },
                          "&.Mui-focused": {
                            borderColor: "white",
                          },
                        },
                      }),
                    }}
                  />

                  {/* Field: Bio  */}
                  <TextField
                    onChange={handleChange}
                    type="bio"
                    label="Bio"
                    onBlur={handleBlur}
                    value={values.bio}
                    name="bio"
                    error={Boolean(touched.bio) && Boolean(errors.bio)}
                    helperText={touched.bio && errors.bio}
                    sx={{
                      width: "100%",
                      m: "0 0 1rem 0",
                      ...(mode === "dark" && {
                        "& .MuiInputLabel-root": {
                          color: "white",
                        },
                        "& .MuiOutlinedInput-input": {
                          color: "white",
                        },
                        "& .Mui-focused": {
                          color: labelnameColor,
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white",
                          },
                          "&:hover fieldset": {
                            borderColor: "white",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "white",
                          },
                        },
                      }),
                    }}
                  />

                  {/* Field: Location  */}
                  <TextField
                    onChange={handleChange}
                    type="location"
                    label="Location"
                    onBlur={handleBlur}
                    value={values.location}
                    name="location"
                    error={
                      Boolean(touched.location) && Boolean(errors.location)
                    }
                    helperText={touched.location && errors.location}
                    sx={{
                      width: "100%",
                      m: "0 0 1rem 0",
                      ...(mode === "dark" && {
                        "& .MuiInputLabel-root": {
                          color: "white",
                        },
                        "& .MuiOutlinedInput-input": {
                          color: "white",
                        },
                        "& .Mui-focused": {
                          color: labelnameColor,
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white",
                          },
                          "&:hover fieldset": {
                            borderColor: "white",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "white",
                          },
                          "&.Mui-focused": {
                            borderColor: "white",
                          },
                        },
                      }),
                    }}
                  />

                  {/* Field: Occupation  */}
                  <TextField
                    onChange={handleChange}
                    type="occupation"
                    label="Occupation"
                    onBlur={handleBlur}
                    value={values.occupation}
                    name="occupation"
                    error={
                      Boolean(touched.occupation) && Boolean(errors.occupation)
                    }
                    helperText={touched.occupation && errors.occupation}
                    sx={{
                      width: "100%",
                      m: "0 0 1rem 0",
                      ...(mode === "dark" && {
                        "& .MuiInputLabel-root": {
                          color: "white",
                        },
                        "& .MuiOutlinedInput-input": {
                          color: "white",
                        },
                        "& .Mui-focused": {
                          color: labelnameColor,
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white",
                          },
                          "&:hover fieldset": {
                            borderColor: "white",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "white",
                          },
                          "&.Mui-focused": {
                            borderColor: "white",
                          },
                        },
                      }),
                    }}
                  />
                  <button
                    type="submit"
                    className="mt-4 bg-lightPrimary-500 hover:bg-lightPrimary-0 text-white py-4 px-1 rounded-lg mb-4 text-md w-full"
                  >
                    Edit
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </PopupWrapper>
      )}
    </WidgetWrapper>
  );
}
