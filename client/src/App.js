import React, { useState, useEffect } from "react";
import Nav from "./components/Nav";
import SideBar from "./components/SideBar";
import { Outlet } from "react-router-dom";

function App() {
  // const [message, setmessage] = useState("")

  // useEffect(() => {
  //   fetch("/message")
  //     .then(res => res.json())
  //     .then(data => setmessage(data.message))
  //     // .catch(err => console.log(err))
  // }, [])

  return (
    <div className="flex min-h-screen">
      <Nav/>
      <div className="container max-w-7xl mx-auto p-0 w-[50rem]">
        <Outlet/>
      </div>
      <SideBar/>
    </div>
  );
}

export default App;
