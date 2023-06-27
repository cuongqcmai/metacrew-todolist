import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { useDrop } from "react-dnd";
import { useAppContext } from "../context/AppProvider";
import AddNewTaskModal from "./AddNewTaskModal";
import Task from "./Task";

function StatusIcon(props) {
  return (
    <SvgIcon {...props} sx={{ "&.MuiSvgIcon-root": { height: 10, width: 10 } }}>
      <Brightness1Icon />
    </SvgIcon>
  );
}

export default function StatusManagement({ type }) {
  const {
    listTodo,
    data,
    listOverdue,
    listCompleted,
    listInProgress,
    updateData,
  } = useAppContext();
  const [listTask, setListTask] = useState();
  const [openModal, setOpenModal] = React.useState(false);
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

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addTaskToList(item?.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addTaskToList = (id) => {
    updateData((prev) => {
      const aTask = prev.map((t) => {
        if (t.id === id) {
          return { ...t, type: type };
        }
        return t;
      });
      return aTask;
    });
  };

  useEffect(() => {
    switch (type) {
      case "Todo": {
        setListTask(listTodo);
        break;
      }
      case "In Progress": {
        setListTask(listInProgress);
        break;
      }
      case "Completed": {
        setListTask(listCompleted);
        break;
      }
      case "Overdue": {
        setListTask(listOverdue);
        break;
      }
      default:
        return "";
    }
  }, [data]);

  return (
    <Stack ref={drop} spacing={1} padding={1}>
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
        <ListItemIcon
          sx={{ minWidth: "auto" }}
          onClick={() => setOpenModal(true)}
        >
          <AddBoxRoundedIcon sx={{ cursor: "pointer" }} />
        </ListItemIcon>
      </ListItem>
      {listTask && listTask.map((item) => <Task key={item?.id} item={item} />)}
      {isOver ? (
        <Box
          width={254}
          height={164}
          border={"1px dotted #000"}
          borderRadius={4}
        ></Box>
      ) : null}
      <AddNewTaskModal
        type={type}
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
      />
    </Stack>
  );
}
