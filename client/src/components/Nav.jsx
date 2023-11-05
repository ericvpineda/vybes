import React from "react";

export default function Nav() {
  return (
      <nav className="border-solid border-2 border-slate-500 flex flex-col justify-between max-w-[5rem]">
        <div>
          <h2>Navigation</h2>
          <div className="text-blue-500 ">
            <div>
              <a href="">Logo</a>
            </div>
            <div>
              <a href="">Home</a>
            </div>
            <div>
              <a href="">Chat</a>
            </div>
            <div>
              <a href="">Explore</a>
            </div>
            <div>
              <a href="">Settings</a>
            </div>
          </div>
        </div>
        <div className="text-blue-500 ">
          <div>Dark Mode</div>
        </div>
      </nav>
  );
}
