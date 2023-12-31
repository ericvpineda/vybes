import React from "react";
import { EditOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function UserLink({ iconColor, title, url, imageUrl }) {
  const testImage = () => {
    return (
      <svg
        width="32px"
        height="32px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="dark:bg-lightBackground-900"
      >
        <title>github</title>
        <rect width="24" height="24" fill="none" />
        <path d="M12,2A10,10,0,0,0,8.84,21.5c.5.08.66-.23.66-.5V19.31C6.73,19.91,6.14,18,6.14,18A2.69,2.69,0,0,0,5,16.5c-.91-.62.07-.6.07-.6a2.1,2.1,0,0,1,1.53,1,2.15,2.15,0,0,0,2.91.83,2.16,2.16,0,0,1,.63-1.34C8,16.17,5.62,15.31,5.62,11.5a3.87,3.87,0,0,1,1-2.71,3.58,3.58,0,0,1,.1-2.64s.84-.27,2.75,1a9.63,9.63,0,0,1,5,0c1.91-1.29,2.75-1,2.75-1a3.58,3.58,0,0,1,.1,2.64,3.87,3.87,0,0,1,1,2.71c0,3.82-2.34,4.66-4.57,4.91a2.39,2.39,0,0,1,.69,1.85V21c0,.27.16.59.67.5A10,10,0,0,0,12,2Z" />
      </svg>
    );
  };

  return (
    <div className="darkmode_text_header px-1 mt-4 mb-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {testImage()}
          <div className="flex flex-col justify-start">
            <p className="ml-2 border-b-2 border-gray-300 dark:border-gray-700 font-medium">
              {title}
            </p>
            <p className="ml-2 dark:text-darkNeutral-300">{url}</p>
          </div>
        </div>
        <IconButton style={{ color: iconColor }}>
          <EditOutlined />
        </IconButton>
      </div>
    </div>
  );
}
