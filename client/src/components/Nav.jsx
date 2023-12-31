import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Select,
  MenuItem,
  FormControl,
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
import { getUser } from "utils/utils";
import { setUser } from "state/auth.js";

// Note:
// - use MUI elements for components?
export default function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, mode, token } = useSelector((state) => state.auth);
  const userId = (user && user._id) || null;
  const [isMobileMenuToggled, setisMobileMenuToggled] = useState(false);
  const iconColor = mode === "dark" ? "white" : "black";
  const userFullName = (user && `${user.firstName} ${user.lastName}`) || "";

  // DEBUG:
  // dispatch(setLogout())

  useEffect(() => {
    if (userId) {
      getUser({ token, userId }).then((updatedUser) =>
        dispatch(setUser({ user: updatedUser }))
      );
    }
  }, []);

  return (
    <nav className="fixed t-0 py-4 px-[6%] bg-lightNeutral-900 dark:bg-darkBackground-0 w-full z-10">
      <div
        className={classNames(
          "w-full max-w-[84rem] mx-auto",
          `${user ? "flex-between" : "flex justify-center"}`
        )}
      >
        {/* Logo and Search bar  */}
        <div className="flex-between">
          <div
            onClick={() => navigate("/")}
            className={classNames(
              "cursor-pointer font-bold text-lg darkmode_text_primary",
              "hover:text-lightPrimary-500 font-roboto uppercase"
            )}
          >
            Vybes
          </div>
          {!user && (
            <IconButton onClick={() => dispatch(setMode())}>
              {mode === "dark" ? (
                <DarkMode
                  sx={{ fontSize: "25px" }}
                  style={{ color: "white" }}
                />
              ) : (
                <LightMode
                  sx={{ fontSize: "25px" }}
                  style={{ color: "black" }}
                />
              )}
            </IconButton>
          )}
          {user && (
            <div className="relative flex-betweeen hidden sm:block sm:ml-5">
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                <IconButton style={{ color: iconColor }}>
                  <Search />
                </IconButton>
              </div>
              <input
                id="search"
                name="search"
                className="block w-full rounded-md border-0 darkmode_input_bg py-[0.5rem] px-[1.5rem] text-gray-300 dark:text-darkNeutral-200 placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Search"
                type="search"
              />
            </div>
          )}
        </div>
        {/* Desktop Navigation  */}
        {user && !isMobileMenuToggled && (
          <div className="sm:block sm:flex sm:items-center sm:justify-between hidden sm:w-[20rem]">
            <IconButton onClick={() => dispatch(setMode())}>
              {mode === "dark" ? (
                <DarkMode
                  sx={{ fontSize: "25px" }}
                  style={{ color: "white" }}
                />
              ) : (
                <LightMode
                  sx={{ fontSize: "25px" }}
                  style={{ color: "black" }}
                />
              )}
            </IconButton>
            <IconButton>
              <Message sx={{ fontSize: "25px" }} style={{ color: iconColor }} />
            </IconButton>
            <IconButton>
              <Notifications
                sx={{ fontSize: "25px" }}
                style={{ color: iconColor }}
              />
            </IconButton>
            <IconButton>
              <Help sx={{ fontSize: "25px" }} style={{ color: iconColor }} />
            </IconButton>
            <FormControl variant="standard" value={userFullName}>
              <Select
                className="darkmode_input_bg dark:text-gray-300"
                value={userFullName}
                input={
                  <InputBase
                    sx={{
                      width: "150px",
                      borderRadius: "0.25rem",
                      p: "0.25rem 1rem",
                      "& .MuiSvgIcon-root": {
                        pr: "0.25rem",
                        width: "3rem",
                        color: iconColor,
                      },
                    }}
                  />
                }
              >
                <MenuItem value={userFullName}>
                  <div>{userFullName}</div>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    dispatch(setLogout());
                    navigate("/login");
                  }}
                >
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        )}
        {/* Mobile Mode */}
        {user && !isMobileMenuToggled && (
          <div className="sm:hidden">
            <IconButton
              onClick={() => setisMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Menu style={{ color: iconColor }} />
            </IconButton>
          </div>
        )}
        {/* Mobile Navigation */}
        {user && isMobileMenuToggled && (
          <Box
            position="fixed"
            right="0"
            bottom="0"
            height="100%"
            zIndex="10"
            maxWidth="500px"
            minWidth="300px"
            // backgroundColor={backgroundColor}
            className="flex flex-col items-center darkmode_input_bg"
          >
            <div className="flex justify-end p-4">
              <IconButton
                onClick={() => setisMobileMenuToggled(!isMobileMenuToggled)}
              >
                <Close style={{ color: iconColor }} />
              </IconButton>
            </div>
            {/* Menu Items  */}
            <IconButton onClick={() => dispatch(setMode())}>
              {mode === "dark" ? (
                <DarkMode
                  sx={{ fontSize: "25px" }}
                  style={{ color: "white" }}
                />
              ) : (
                <LightMode
                  sx={{ fontSize: "25px" }}
                  style={{ color: "black" }}
                />
              )}
            </IconButton>
            <IconButton>
              <Message sx={{ fontSize: "25px" }} style={{ color: iconColor }} />
            </IconButton>
            <IconButton>
              <Notifications
                sx={{ fontSize: "25px" }}
                style={{ color: iconColor }}
              />
            </IconButton>
            <IconButton>
              <Help sx={{ fontSize: "25px" }} style={{ color: iconColor }} />
            </IconButton>
            <FormControl variant="standard" value={userFullName}>
              <Select
                className="darkmode_input_bg dark:text-gray-300"
                value={userFullName}
                sx={{
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                    color: iconColor,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={userFullName}>
                  <div>{userFullName}</div>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    dispatch(setLogout());
                    navigate("/login");
                  }}
                >
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}
      </div>
    </nav>
  );
}
