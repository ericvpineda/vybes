import React, { useMemo } from "react";
import SideBar from "./components/SideBar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Nav from "./components/Nav";
import { classNames } from "utils/utils";

function App() {
  // Used for dark/light mode
  const colorTheme = useSelector((state) => state.mode);
  
  return (
    <div className={classNames("min-h-screen w-full", colorTheme)}>
        <Nav />
        {/* <div className="container max-w-7xl mx-auto p-0 w-[50rem]">
          <Outlet />
        </div> */}
        {/* <SideBar /> */}
    </div>
  );
}

export default App;
