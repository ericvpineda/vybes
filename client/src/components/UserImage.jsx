import { Box } from "@mui/material";
import Face6Icon from "@mui/icons-material/Face6";

export default function UserImage({ name, size = "60px" }) {
  return (
    <Box width={size} height={size}>
      {name && name.length > 0 ? (
        <img
          src={`http://localhost:8000/assets/${name}`}
          alt="User."
          className="object-cover rounded-[50%] min-h-[60px] min-w-[60px]"
        />
      ) : (
        <Face6Icon className="object-cover rounded-[50%] min-h-[60px] min-w-[60px]"></Face6Icon>
      )}
    </Box>
  );
}
