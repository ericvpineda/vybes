import React from "react";
import Nav from "components/Nav";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="min-h-screen w-full bg-lightBackground-900 dark:bg-darkBackground-900">
      <Nav />
      <div className="flex items-center container max-w-7xl mx-auto h-full w-full pt-20">
        <Outlet />
      </div>
    </div>
  );
}
