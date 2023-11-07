import React, { useState, useEffect } from "react";
import Nav from "./components/Nav";
import SideBar from "./components/SideBar";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "state/index.js";

function App() {
  // const [message, setmessage] = useState("")

  // useEffect(() => {
  //   fetch("/message")
  //     .then(res => res.json())
  //     .then(data => setmessage(data.message))
  //     // .catch(err => console.log(err))
  // }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* App component */}
        <div className="flex min-h-screen">
          <Nav />
          <div className="container max-w-7xl mx-auto p-0 w-[50rem]">
            <Outlet />
          </div>
          <SideBar />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
