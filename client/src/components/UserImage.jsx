import { Box } from "@mui/material";
import Face6Icon from "@mui/icons-material/Face6";
import { HOST_BACKEND } from "utils/utils";

export default function UserImage({ name, size = "60px" }) {
  if (name) {
    if (typeof name === "string") {
      name = `${HOST_BACKEND}/assets/${name}`;
    } else {
      name = URL.createObjectURL(name);
    }
  }
  return (
    <Box
      width={size}
      height={size}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      {name && name.length > 0 ? (
        <img
          src={name}
          alt="User."
          className="object-cover rounded-[50%]"
          style={{ minHeight: size, minWidth: size }}
        />
      ) : (
        <Face6Icon
          className="object-cover rounded-[50%] dark:bg-gray-200"
          style={{ minHeight: size, minWidth: size }}
        />
      )}
    </Box>
  );
}
