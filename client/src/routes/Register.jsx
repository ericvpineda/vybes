import { PhotoIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextField } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Dropzone from "react-dropzone";
import { HOST_BACKEND } from "utils/utils";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();
  const formSubmitHandler = async (values, props) => {
    const form = new FormData();
    for (let key in values) {
      form.append(key, values[key]);
    }
    if (values.imageUrl) {
      form.append("imageUrl", values.imageUrl.name);
    }
    const response = await fetch(`${HOST_BACKEND}/auth/register`, {
      method: "POST",
      body: form,
    });

    const registeredUser = await response.json();
    if (response.ok) {
      toast.success(`Welcome ${registeredUser.firstName}!` )
      navigate("/login");
      props.resetForm();
    } else {
      toast.error(registeredUser.message);
    }
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    imageUrl: "",
    location: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().email("Invalid email.").required(),
    password: Yup.string().min(8, "Password atleast 8 characters.").required(),
    imageUrl: Yup.string(),
    location: Yup.string(),
  });

  return (
    <div className="flex justify-center items-center w-full">
      {/* Registration Header  */}
      <div className="w-full max-w-md bg-white p-7">
        <div className="border-b border-gray-900/10 pb-5 flex justify-center">
          <h2 className="text-xl font-semibold leading-7 text-lightPrimary-500 uppercase">
            New Vybe Account
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
              <TextField
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                sx={{
                  width: "100%",
                  m: "0 0 1rem 0",
                }}
              />
              <TextField
                onChange={handleChange}
                label="Last Name"
                onBlur={handleBlur}
                value={values.lastName}
                name="lastName"
                error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                sx={{
                  width: "100%",
                  m: "0 0 1rem 0",
                }}
              />

              <TextField
                onChange={handleChange}
                label="Email"
                onBlur={handleBlur}
                value={values.email}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{
                  width: "100%",
                  m: "0 0 1rem 0",
                }}
              />

              <TextField
                onChange={handleChange}
                type="password"
                label="Password"
                onBlur={handleBlur}
                value={values.password}
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{
                  width: "100%",
                  m: "0 0 1rem 0",
                }}
              />

              <TextField
                onChange={handleChange}
                type="location"
                label="Location"
                onBlur={handleBlur}
                value={values.location}
                name="location"
                error={Boolean(touched.location) && Boolean(errors.location)}
                helperText={touched.location && errors.location}
                sx={{
                  width: "100%",
                  m: "0 0 1rem 0",
                }}
              />

              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) =>
                  setFieldValue("imageUrl", acceptedFiles[0])
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <div
                    className="col-span-full cursor-pointer text-sm relative cursor-pointer rounded-md bg-white font-semibold text-lightPrimary-500 focus-within:outline-none focus-within:ring-2 focus-within:text-lightPrimary-0 focus-within:ring-offset-2 hover:text-lightPrimary-0"
                    {...getRootProps()}
                  >
                    <div className="text-sm mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <input
                        {...getInputProps()}
                        id="imageUrl"
                        name="imageUrl"
                        type="file"
                        className="sr-only"
                      />
                      {!values.imageUrl ? (
                        <div className="text-center">
                          <PhotoIcon
                            className="mx-auto h-12 w-12 text-gray-300"
                            aria-hidden="true"
                          />
                          <div className="mt-4 flex flex-col text-sm leading-6 text-gray-600">
                            <p>Upload a Profile Picture</p>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs leading-5 text-gray-600">
                            PNG, JPG up to 10MB
                          </p>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <div className="mr-3">{values.imageUrl.name}</div>
                          <EditOutlinedIcon />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Dropzone>

              <button
                type="submit"
                className="mt-4 bg-lightPrimary-500 hover:bg-lightPrimary-0 text-white py-4 px-1 rounded-lg mb-4 text-md w-full"
              >
                Sign Up
              </button>
              <div
                onClick={() => {
                  resetForm();
                  navigate("/login");
                }}
                className="cursor-pointer text-blue-800 underline"
              >
                Already have an account? Login here.
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
