import {
  Avatar,
  Button,
  Chip,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import AddNewTaskModal from "./AddNewTaskModal";
import * as React from "react";

export default function NewTask() {
  const [openModal, setOpenModal] = React.useState(false);
  return (
    <Stack spacing={1} p={3} pb={0}>
      <ListItem disablePadding color="gray">
        <ListItemText
          primary="Priority"
          primaryTypographyProps={{ color: "gray" }}
          sx={{ flex: "none", minWidth: 200 }}
        />
        <Chip label="Medium" sx={{ borderRadius: 2 }} />
      </ListItem>
      <ListItem disablePadding>
        <ListItemText
          primary="Due date"
          primaryTypographyProps={{ color: "gray" }}
          sx={{ flex: "none", minWidth: 200 }}
        />
        <Typography color={"#000"}> 28 Feb 2023</Typography>
      </ListItem>
      <ListItem disablePadding>
        <ListItemText
          primary="Tags"
          primaryTypographyProps={{ color: "gray" }}
          sx={{ flex: "none", minWidth: 200 }}
        />
        <Stack direction={"row"} spacing={1}>
          <Chip
            label="Meetings"
            sx={{ borderRadius: 2, backgroundColor: "#ffe0b2" }}
          />
          <Chip
            label="UI Design"
            sx={{ borderRadius: 2, backgroundColor: "#e6ee9c" }}
          />
          <Chip
            label="Development"
            sx={{ borderRadius: 2, backgroundColor: "#b2ebf2" }}
          />
          <Chip
            label="UX Research"
            sx={{ borderRadius: 2, backgroundColor: "#a7ffeb" }}
          />
        </Stack>
      </ListItem>
      <ListItem disablePadding>
        <ListItemText
          primary="Assignees"
          primaryTypographyProps={{ color: "gray" }}
          sx={{ flex: "none", minWidth: 200 }}
        />
        <Chip avatar={<Avatar>M</Avatar>} label="Avatar" />
      </ListItem>
      <Button
        size="small"
        onClick={() => setOpenModal(true)}
        sx={{
          width: 120,
          backgroundColor: "#ffab40",
          color: "#fff",
          boxShadow: "none",
          p: 1,
          textTransform: "none",
          ":focus-visible": {
            outline: "none",
          },
          ":focus": {
            outline: "none",
          },
        }}
        variant="contained"
      >
        New task
      </Button>

      <AddNewTaskModal
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
      />
    </Stack>
  );
}
