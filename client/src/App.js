import React, { useState, useEffect } from "react";
import Nav from "./components/Nav/Nav";
import "./App.css";
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
    <div className="App">
      <Nav/>
      <Outlet/>
    </div>
  );
}

export default App;
