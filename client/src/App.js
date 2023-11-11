import React, { useMemo } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Nav from "./components/Nav";
import SideBar from "./components/SideBar";

function App() {
  // Used for dark/light mode
  const colorTheme = useSelector((state) => state.auth.mode);
  const htmlElem = document.querySelector("html");

  // Note: Do not need useEffect
  if (colorTheme === "dark") {
    htmlElem.classList.remove("light");
    htmlElem.classList.add("dark");
  } else {
    htmlElem.classList.remove("dark");
    htmlElem.classList.add("light");
  }

  return (
    <div className="min-h-screen w-full bg-lightBackground-900 dark:bg-darkBackground-900">
      <Nav />
      <div className="flex items-center container max-w-7xl mx-auto pt-20 h-screen w-full">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
