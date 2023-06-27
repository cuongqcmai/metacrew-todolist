import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box, ListItemButton, Menu, MenuItem, Select } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useDrag } from "react-dnd";
import { OPTION_PRIORITY } from "../lib/constants";
import ChipCustomize from "./ChipCustomize";
import { useAppContext } from "../context/AppProvider";
import AddNewTaskModal from "./AddNewTaskModal";

export default function Task({ item }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { updateData, deleteTaskWithId } = useAppContext();

  const handleChange = (event) => {
    updateData((prev) => {
      const aTask = prev.map((t) => {
        if (t.id === item?.id) {
          return { ...t, priority: event.target.value };
        }
        return t;
      });
      return aTask;
    });
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: item?.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const colorTask = React.useMemo(() => {
    switch (item?.type) {
      case "Todo": {
        return "#1976d2";
      }
      case "In Progress": {
        return "#000";
      }
      case "Completed": {
        return "#2e7d32";
      }
      case "Overdue": {
        return "#d32f2f";
      }
      default:
        return "";
    }
  }, [item?.type]);

  const deleteTask = () => {
    deleteTaskWithId(item?.id);
  };

  const editTask = () => {
    setOpenModal(true);
  };
  return (
    <Card
      ref={drag}
      sx={{
        width: "100%",
        maxWidth: 256,
        borderRadius: 4,
        position: "relative",
        backgroundColor: colorTask,
        color: "#fff",
        opacity: isDragging ? 0.3 : 1,
        overflow: "hidden",
        zIndex: 8,
      }}
    >
      <ListItemButton
        sx={{
          cursor: "pointer",
          position: "absolute",
          right: 16,
          top: 8,
          p: 0,
        }}
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </ListItemButton>

      <Select
        sx={{
          minWidth: 40,
          fontSize: "12px",
          ".MuiSelect-select": { p: 0 },
          backgroundColor:
            item?.priority === "Low"
              ? "#fff3e0"
              : item?.priority === "Medium"
              ? "#ffcc80"
              : "#fb8c00",
          position: "absolute",
          top: 8,
          left: 16,
          px: 1,
          color: "gray",
          borderRadius: 10,
          fontWeight: 700,
          ":focus-visible": { outline: "none" },
          border: "none !important",
        }}
        onChange={handleChange}
        value={item?.priority || "Low"}
      >
        {OPTION_PRIORITY.map((p, index) => (
          <MenuItem
            sx={{
              fontSize: "12px",
              backgroundColor:
                p === "Low"
                  ? "#fff3e0 !important"
                  : p === "Medium"
                  ? "#ffcc80 !important"
                  : "#fb8c00 !important",
            }}
            key={index}
            value={p}
          >
            {p}
          </MenuItem>
        ))}
      </Select>

      <CardContent>
        <Typography variant="h5" component="div" textAlign={"left"} mt={2}>
          {item?.title}
        </Typography>
        <Typography sx={{ my: 1.5 }}>{item?.description}</Typography>
      </CardContent>
      {item?.tag?.length > 0 ? (
        <Box whiteSpace={1} sx={{ textAlign: "left", pl: 2, pb: 1 }}>
          {item?.tag.map((item, index) => (
            <ChipCustomize isSmallSize title={item?.title} key={index} />
          ))}
        </Box>
      ) : null}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={editTask}>Edit</MenuItem>
        <MenuItem sx={{ color: "red" }} onClick={deleteTask}>
          Delete
        </MenuItem>
      </Menu>
      <AddNewTaskModal
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
        item={item}
      />
    </Card>
  );
}
