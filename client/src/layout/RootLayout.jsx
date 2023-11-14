import React from "react";
import Nav from "components/Nav";
import { Outlet } from "react-router-dom";
import {Toaster} from "react-hot-toast";

export default function RootLayout() {

  return (
    <div className="min-h-screen w-full bg-lightBackground-900 dark:bg-darkBackground-900">
      <Toaster/>
      <Nav />
      <div className="flex items-center container max-w-8xl mx-auto h-full w-full pt-20">
        <Outlet />
      </div>
    </div>
  );
}
