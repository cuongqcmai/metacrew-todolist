import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Chip,
  Divider,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import useResponsive from "../hook.js/useResponsive";
import AddNewTaskModal from "./AddNewTaskModal";
import ChipCustomize from "./ChipCustomize";

export default function NewTask() {
  const [openModal, setOpenModal] = React.useState(false);
  const { isMobile } = useResponsive();
  return (
    <Accordion
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 9,
        backgroundColor: "#fff",
        boxShadow:
          "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
        "&.MuiAccordion-root": { my: 0 },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Add new task</Typography>
      </AccordionSummary>
      <Divider />
      <AccordionDetails>
        <Stack>
          <ListItem disablePadding color="gray">
            <ListItemText
              primary="Priority"
              primaryTypographyProps={{ color: "gray" }}
              sx={{ flex: "none", minWidth: isMobile ? 100 : 200 }}
            />
            <Stack direction={"row"} spacing={1}>
              {" "}
              <Chip
                label="Low"
                sx={{
                  borderRadius: 2,
                  backgroundColor: "#fff3e0",
                  height: 18,
                  color: "gray",
                }}
              />
              <Chip
                label="Medium"
                sx={{
                  borderRadius: 2,
                  backgroundColor: "#ffcc80",
                  height: 18,
                  color: "gray",
                }}
              />
              <Chip
                label="High"
                sx={{
                  borderRadius: 2,
                  backgroundColor: "#fb8c00",
                  height: 18,
                  color: "gray",
                }}
              />
            </Stack>
          </ListItem>

          <ListItem disablePadding>
            <ListItemText
              primary="Tags"
              primaryTypographyProps={{ color: "gray" }}
              sx={{ flex: "none", minWidth: isMobile ? 100 : 200 }}
            />
            <Stack direction={"row"} rowGap={1} flexWrap={"wrap"}>
              <ChipCustomize title="Meetings" />
              <ChipCustomize title="UI Design" />
              <ChipCustomize title="Development" />
              <ChipCustomize title="UX Research" />
            </Stack>
          </ListItem>
          <ListItem disablePadding sx={{ mt: 1 }}>
            <ListItemText
              primary="Assignees"
              primaryTypographyProps={{ color: "gray" }}
              sx={{ flex: "none", minWidth: isMobile ? 100 : 200 }}
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
              "&.MuiButtonBase-root": { mt: 2 },
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
      </AccordionDetails>
    </Accordion>
  );
}
