import { Box } from "@mui/material";

export default function UserImage({ name, size = "60px" }) {
  return (
    <Box width={size} height={size}>
      <img
        src={`http://localhost:8000/assets/${name}`}
        alt="User."
        height={size}
        width={size}
        className="object-cover rounded-[50%]"
      />
    </Box>
  );
}
