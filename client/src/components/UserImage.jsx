import { Box } from "@mui/material";
import Face6Icon from "@mui/icons-material/Face6";
import { HOST_BACKEND } from "utils/utils";

export default function UserImage({ name, size = "60px" }) {
  return (
    <Box width={size} height={size}>
      {name && name.length > 0 ? (
        <img
          src={`${HOST_BACKEND}/assets/${name}`}
          alt="User."
          className="object-cover rounded-[50%] min-h-[60px] min-w-[60px]"
        />
      ) : (
        <Face6Icon className="object-cover rounded-[50%] min-h-[60px] min-w-[60px] dark:bg-gray-2300"></Face6Icon>
      )}
    </Box>
  );
}
