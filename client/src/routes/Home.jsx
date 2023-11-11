import React from "react";

export default function Home() {
  return (
    <div className="border-solid border-2 border-slate-500 h-full w-full">
      <h2 className="mb-5">Vybes Feed</h2>
      <div>
        <div>Feed</div>
        <div className="mx-5">
          {/* Post: User Info */}
          <div className="flex justify-between">
            <div>User Image</div>
            <h3>Mark ^mshard</h3>
          </div>
          {/* Post: Post info */}
          <div>
            <p>This post is fyre</p>
            <div className="flex items-center">
              <img src="#" alt="Illenium Image"></img>
              <div>
                <p>Fractures</p>
                <p>Illenium</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
