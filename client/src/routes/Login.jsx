import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { setLogin } from "state/auth";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formSubmitHandler = async (values, props) => {
    const response = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const authenticatedUser = await response.json();

    if (response.ok) {
      if (authenticatedUser) {
        dispatch(
          setLogin({
            user: authenticatedUser.user,
            token: authenticatedUser.accessToken,
          })
        );
        props.resetForm();
        navigate("/");
      }
    } else {
      // TODO: Show UI for incorrect login
      console.log(authenticatedUser.message);
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
    <div className="h-full w-full flex justify-center items-center">
      <div className="bg-white p-10 flex flex-col justify-between rounded-md">
        <h1 className="text-slate-500 text-3xl mb-2 font-medium text-center">
          Vybes
        </h1>
        <h2 className="text-slate-500 text-md font-medium mb-4 text-center">
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
                  sx={{ m: "0 0 1rem 0" }}
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
                  sx={{ m: "0 0 1rem 0" }}
                />

                <button
                  type="submit"
                  className="bg-black text-white py-4 px-1 rounded-lg mb-4 text-md"
                >
                  Login
                </button>
                <div
                  onClick={() => {
                    resetForm();
                    navigate("/register");
                  }}
                  className="cursor-pointer text-blue-800 underline"
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
