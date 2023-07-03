import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box, ListItemButton, Menu, MenuItem, Select } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useDrag, useDrop } from "react-dnd";
import { OPTION_PRIORITY, typeToListType } from "../lib/constants";
import ChipCustomize from "./ChipCustomize";
import { useAppContext } from "../context/AppProvider";
import AddNewTaskModal from "./AddNewTaskModal";
import ConfirmDeleteTaskModal from "./ConfirmDeleteTaskModal";

export default function Task({ item, index, moveTask }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [isModalConfirm, setIsModalConfirm] = React.useState(false);
  const open = Boolean(anchorEl);
  const ref = React.useRef(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { updateData, deleteTaskWithId, data } = useAppContext();

  const handleChange = (event) => {
    const itemType = typeToListType(item.type);
    // const dataClone = { ...data };
    // const dataListHandle = dataClone[`${itemType}`];
    // const dataListHandleUpdate = dataListHandle.map((t) => {
    //   if (t.id === item?.id) {
    //     return { ...t, priority: event.target.value };
    //   }
    //   return t;
    // });
    // dataClone[`${itemType}`] = dataListHandleUpdate;
    updateData((prevData) => {
      const dataListHandle = prevData[`${itemType}`];
      const dataListHandleUpdate = dataListHandle.map((t) => {
        if (t.id === item?.id) {
          return { ...t, priority: event.target.value };
        }
        return t;
      });
      prevData[`${itemType}`] = dataListHandleUpdate;
      return { ...prevData };
    });
  };

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "task",
      item: { id: item?.id, index: index, item: item },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [item]
  );

  const [{ handlerId }, drop] = useDrop({
    accept: "task",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveTask(dragIndex, hoverIndex, item.item.type);

      item.index = hoverIndex;
    },
  });

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
    setIsModalConfirm(true);
    handleClose();
  };

  const confirmDelete = () => {
    deleteTaskWithId(item?.id, item.type);
  };

  const editTask = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    handleClose();
  };

  drag(drop(ref));

  return (
    <Card
      ref={ref}
      sx={{
        width: "100%",
        borderRadius: 4,
        position: "relative",
        backgroundColor: colorTask,
        color: "#fff",
        opacity: isDragging ? 0 : 1,
        overflow: "hidden",
        zIndex: 8,
      }}
      data-handler-id={handlerId}
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
        value={item?.priority || OPTION_PRIORITY[0]}
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
        closeModal={handleCloseModal}
        item={item}
      />
      <ConfirmDeleteTaskModal
        open={isModalConfirm}
        handleClose={() => setIsModalConfirm(false)}
        confirmDelete={confirmDelete}
      />
    </Card>
  );
}
