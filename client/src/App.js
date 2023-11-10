import React, { useMemo } from "react";
import SideBar from "./components/SideBar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Nav from "./components/Nav";
import { classNames } from "utils/utils";

function App() {
  // Used for dark/light mode
  const colorTheme = useSelector((state) => state.auth.mode);
  const htmlElem = document.querySelector("html");

  // Note:
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
      {/* <div className="container max-w-7xl mx-auto p-0 w-[50rem]">
          <Outlet />
        </div> */}
      {/* <SideBar /> */}
    </div>
  );
}

export default App;
