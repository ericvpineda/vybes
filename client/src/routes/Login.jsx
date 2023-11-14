import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { setLogin } from "state/auth";
import { useSelector } from "react-redux";
import { HOST_BACKEND } from "utils/utils";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.auth.mode);
  const labelnameColor = "green" || "#40916c";

  const formSubmitHandler = async (values, props) => {
    const response = await fetch(`${HOST_BACKEND}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const authenticatedUser = await response.json();

    if (response.ok) {
      dispatch(
        setLogin({
          user: authenticatedUser.user._id,
          token: authenticatedUser.accessToken,
        })
      );
      props.resetForm();
      navigate("/");
    } else {
      toast.error(authenticatedUser.message);
    }
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const loginValidationSchema = Yup.object({
    email: Yup.string("Invalid email.").email().required(),
    password: Yup.string().required(),
  });

  return (
    <div className="h-full w-full flex justify-center items-center ">
      <div className="max-w-lg bg-white dark:bg-darkBackground-0 p-7 flex flex-col justify-between rounded-md">
        <h1 className="uppercase text-lightPrimary-500 text-3xl mb-2 font-medium text-center">
          Vybes
        </h1>
        <h2 className="text-slate-500 dark:text-gray-100 text-md font-medium mb-4 text-center">
          The music social media hub for electronic music.
        </h2>
        <div className="mb-2">
          <Formik
            initialValues={initialValues}
            onSubmit={formSubmitHandler}
            validationSchema={loginValidationSchema}
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
                onSubmit={handleSubmit}
                method="POST"
                className="flex flex-col"
              >
                <TextField
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{
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
                <TextField
                  label="Password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{
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

                <button
                  type="submit"
                  className="bg-lightPrimary-500 hover:bg-lightPrimary-0 text-white py-4 px-1 rounded-lg mb-4 text-md"
                >
                  Login
                </button>
                <div
                  onClick={() => {
                    resetForm();
                    navigate("/register");
                  }}
                  className="cursor-pointer text-blue-800 underline dark:text-gray-100"
                >
                  Don't have an account? Sign up here.
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
