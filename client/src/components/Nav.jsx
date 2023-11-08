import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state/auth.js";
import { useNavigate } from "react-router-dom";
import { classNames } from "utils/utils";

export default function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const userFullName =
    (user && `${user.firstName} ${user.lastName}`) || "Fake Name";

  return (
    <nav className="absolute flex-between py-4 px-[6%] bg-lightNeutral-700">
      <div className="flex-between">
        <div
          onClick={() => navigate("/")}
          className={classNames(
            "cursor-pointer font-bold text-lg text-lightPrimary-500",
            "hover:text-lightPrimary-0 font-roboto"
          )}
        >
          Vybes
        </div>
      </div>
    </nav>
  );
}
