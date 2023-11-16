import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  HighlightOff,
} from "@mui/icons-material";
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
import { setUser } from "state/auth";
import { useDispatch } from "react-redux";

export default function UserWidget() {
  const {
    token,
    friends: userFriends,
    mode,
    user,
  } = useSelector(state => state.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const iconColor = mode === "dark" ? "white" : "black";
  const [showUserEdit, setshowUserEdit] = useState(false);

  useEffect(() => {}, [token, userFriends, user]);

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

  const showUserEditPopupHandler = () => {
    setshowUserEdit(!showUserEdit);
  };

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

    const userResonse = await response.json();
    if (response.ok) {
      dispatch(setUser({ user: userResonse.user }))
      setshowUserEdit(!showUserEdit);
      toast.success(`Profile Updated!`);
    } else {
      toast.error(userResonse.message);
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
      <div className="darkmode_text_header px-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <svg
              width="32px"
              height="32px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="dark:bg-lightBackground-900"
            >
              <title>github</title>
              <rect width="24" height="24" fill="none" />
              <path d="M12,2A10,10,0,0,0,8.84,21.5c.5.08.66-.23.66-.5V19.31C6.73,19.91,6.14,18,6.14,18A2.69,2.69,0,0,0,5,16.5c-.91-.62.07-.6.07-.6a2.1,2.1,0,0,1,1.53,1,2.15,2.15,0,0,0,2.91.83,2.16,2.16,0,0,1,.63-1.34C8,16.17,5.62,15.31,5.62,11.5a3.87,3.87,0,0,1,1-2.71,3.58,3.58,0,0,1,.1-2.64s.84-.27,2.75,1a9.63,9.63,0,0,1,5,0c1.91-1.29,2.75-1,2.75-1a3.58,3.58,0,0,1,.1,2.64,3.87,3.87,0,0,1,1,2.71c0,3.82-2.34,4.66-4.57,4.91a2.39,2.39,0,0,1,.69,1.85V21c0,.27.16.59.67.5A10,10,0,0,0,12,2Z" />
            </svg>
            <div className="flex flex-col justify-start">
              <p className="ml-2 border-b-2 border-gray-300 dark:border-gray-700 font-medium">
                GitHub
              </p>
              <p className="ml-2 dark:text-darkNeutral-300">
                https://github.com/{firstName}
                {lastName}
              </p>
            </div>
          </div>
          <IconButton style={{ color: iconColor }}>
            <EditOutlined />
          </IconButton>
        </div>
      </div>

      {showUserEdit && (
        <PopupWrapper togglePopup={showUserEditPopupHandler}>
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
