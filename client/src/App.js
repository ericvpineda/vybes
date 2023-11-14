import React from "react";
import { useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Profile from "./routes/Profile";
import Home from "./routes/Home";
import Register from "./routes/Register";
import Login from "./routes/Login";
import RootLayout from "layout/RootLayout";
import { Navigate } from "react-router-dom";

function App() {
  // Used for dark/light mode
  const colorTheme = useSelector((state) => state.auth.mode);
  const isAuthenticated = Boolean(useSelector((state) => state.auth.token));
  const htmlElem = document.querySelector("html");

  const router = createBrowserRouter([
    {
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "profile/:userId",
          element: isAuthenticated ? <Profile /> : <Navigate to="/login" />,
        },
        {
          path: "register",
          element: isAuthenticated ? <Navigate to="/" /> : <Register />,
        },
        {
          path: "login",
          element: isAuthenticated ? <Navigate to="/" /> : <Login />,
        },
        {
          path: "/",
          element: isAuthenticated ? <Home /> : <Navigate to="/login" />,
        },
      ],
    },
  ]);

  // Note: Do not need useEffect
  if (colorTheme === "dark") {
    htmlElem.classList.remove("light");
    htmlElem.classList.add("dark");
  } else {
    htmlElem.classList.remove("dark");
    htmlElem.classList.add("light");
  }

  return <RouterProvider router={router} />;
}

export default App;
