import { Chip } from "@mui/material";
import { useMemo } from "react";

export default function ChipCustomize({ title, isSmallSize }) {
  const colorStatusIcon = useMemo(() => {
    switch (title) {
      case "Meetings": {
        return "#ffe0b2";
      }
      case "UI Design": {
        return "#e6ee9c";
      }
      case "Development": {
        return "#b2ebf2";
      }
      case "UX Research": {
        return "#a7ffeb";
      }
      default:
        return "";
    }
  }, [title]);
  return (
    <>
      <Chip
        label={title}
        sx={{
          borderRadius: 2,
          backgroundColor: colorStatusIcon,
          mr: 0.5,
          mb: isSmallSize ? 0.5 : 0,
          ml: "0 !important",
          color: "gray",
          fontSize: "12px",
        }}
        size={isSmallSize && "small"}
      />
    </>
  );
}
