import React from "react";
import logoImage from "../../assets/images/logo.png";

export default function Nav() {
  return (
    <nav className="bg-gray-900 min-h-[3rem] w-full flex justify-between items-center">
      <div className="ml-2">
        <a className="block">
          <img className="h-[80%] w-40" src={logoImage} alt="" />
        </a>
      </div>
      <div className="text-white flex">
        <div className="mr-2">
          <a href="">Home</a>
        </div>
        <div className="mr-2">
          <a href="">Feed</a>
        </div>
        <div className="mr-2">
          <a href="">Search</a>
        </div>
        <div className="mr-2">
          <a href="">Profile</a>
        </div>
      </div>
    </nav>
  );
}
