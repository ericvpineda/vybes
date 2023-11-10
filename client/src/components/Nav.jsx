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

// Note:
// - use MUI elements for components?
export default function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const mode = useSelector((state) => state.auth.mode);
  const userFullName =
    (user && `${user.firstName} ${user.lastName}`) || "Fake Name";
  const backgroundColor = "#616161";
  const [isMobileMenuToggled, setisMobileMenuToggled] = useState(false);
  return (
    <nav className="absolute flex-between py-4 px-[6%] bg-lightNeutral-700 w-full">
      {/* Logo and Search bar  */}
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

        <div className="relative flex-betweeen hidden sm:block">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
            <IconButton>
              <Search />
            </IconButton>
          </div>
          <input
            id="search"
            name="search"
            className="block w-full rounded-md border-0 bg-lightNeutral-0 py-[0.1rem] py-[0.1rem] px-[1.5rem] text-gray-300 placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="Search"
            type="search"
          />
        </div>
      </div>

      {/* Desktop Navigation  */}
      {!isMobileMenuToggled && (
        <div className="sm:block sm:flex-between hidden">
          <IconButton onClick={() => dispatch(setMode())}>
            {mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }}></DarkMode>
            ) : (
              <LightMode sx={{ fontSize: "25px" }}></LightMode>
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" value={userFullName}>
            <Select
              value={userFullName}
              sx={{
                backgroundColor: backgroundColor,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: backgroundColor,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={userFullName}>
                <div>{userFullName}</div>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </div>
      )}

      {/* Mobile Mode */}
      {!isMobileMenuToggled && (
        <div className="sm:hidden">
          <IconButton
            onClick={() => setisMobileMenuToggled(!isMobileMenuToggled)}
          >
            <Menu />
          </IconButton>
        </div>
      )}

      {/* Mobile Navigation */}
      {isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={backgroundColor}
          className="flex flex-col items-center"
        >
          <div className="flex justify-end p-4">
            <IconButton
              onClick={() => setisMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </div>

          {/* Menu Items  */}
          <IconButton onClick={() => dispatch(setMode())}>
            {mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }}></DarkMode>
            ) : (
              <LightMode sx={{ fontSize: "25px" }}></LightMode>
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" value={userFullName}>
            <Select
              value={userFullName}
              sx={{
                backgroundColor: backgroundColor,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: backgroundColor,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={userFullName}>
                <div>{userFullName}</div>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}
    </nav>
  );
}
