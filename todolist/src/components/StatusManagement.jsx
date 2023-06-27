import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";
import { useMemo } from "react";
import Task from "./Task";

function StatusIcon(props) {
  return (
    <SvgIcon {...props} sx={{ "&.MuiSvgIcon-root": { height: 10, width: 10 } }}>
      <Brightness1Icon />
    </SvgIcon>
  );
}

export default function StatusManagement({ type }) {
  const colorStatusIcon = useMemo(() => {
    switch (type) {
      case "Todo": {
        return "primary";
      }
      case "In Progress": {
        return "red";
      }
      case "Completed": {
        return "success";
      }
      case "Overdue": {
        return "error";
      }
      default:
        return "";
    }
  }, [type]);

  return (
    <Stack spacing={1} padding={1}>
      <ListItem
        sx={{
          backgroundColor: "#fff",
          borderRadius: 2,
          py: 0,
          mb: 1,
        }}
      >
        <ListItemText
          primary={
            <>
              {type}
              {colorStatusIcon.length > 0 ? (
                <Box
                  padding={0.5}
                  borderRadius={50}
                  display={"inline-flex"}
                  ml={1}
                  sx={{ boxShadow: 3 }}
                  height={2}
                  width={2}
                  justifyContent={"center"}
                  alignItems={"center"}
                  border={"1px solid gray"}
                >
                  <StatusIcon color={colorStatusIcon} />
                </Box>
              ) : null}
            </>
          }
          sx={{ minWidth: 200, py: 1 }}
        />
        <ListItemIcon sx={{ minWidth: "auto" }}>
          <AddBoxRoundedIcon sx={{ cursor: "pointer" }} />
        </ListItemIcon>
      </ListItem>
      <Task />
      <Task />
      <Task />
    </Stack>
  );
}
