import React, { useMemo } from "react";
import Nav from "./components/Nav";
import SideBar from "./components/SideBar";
import { Outlet } from "react-router-dom";
import {useSelector} from "react-redux"
import {CssBaseline, ThemeProvider} from "@mui/material"
import {createTheme} from "@mui/material/styles"
import { muiTheme } from "theme";

function App() {

  return (
    <div className="flex min-h-screen">
      <Nav />
      <div className="container max-w-7xl mx-auto p-0 w-[50rem]">
        <Outlet />
      </div>
      <SideBar />
    </div>
  );
}

export default App;
