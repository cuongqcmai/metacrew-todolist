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
import { typeToListType } from "../lib/constants";
import useResponsive from "../hook.js/useResponsive";
import { MyPreview } from "../main";
import { usePreview } from "react-dnd-preview";

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
    filterFormData,
    notifySuccess,
  } = useAppContext();
  const [listTask, setListTask] = useState();
  const [openModal, setOpenModal] = React.useState(false);
  const { isMobile } = useResponsive();
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
    drop: (item) => {
      if (item.item.type === type) {
        return;
      }
      addTaskToList(item.item, type);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const preview = usePreview();

  const { item } = preview;

  const addTaskToList = (item, typeDrop) => {
    const itemDropType = typeToListType(typeDrop);
    const itemType = typeToListType(item.type);

    updateData((prevData) => {
      const existId =
        prevData[`${itemDropType}`].length > 0 &&
        prevData[`${itemDropType}`].filter((i) => i?.id === item.id);
      if (!existId || existId.length < 1) {
        prevData[`${itemDropType}`].push({ ...item, type: typeDrop });
      }
      const listRemoved = removeTaskById(prevData[`${itemType}`], item.id);
      prevData[`${itemType}`] =
        listRemoved.length > 0 && listRemoved[0] ? listRemoved : [];
      return { ...prevData };
    });
  };

  const removeTaskById = (arr, id) => {
    const arrCopy = Array.from(arr);

    const taskWithIdIndex = arrCopy.findIndex((obj) => obj?.id === id);
    arrCopy.splice(taskWithIdIndex, 1);
    return arrCopy;
  };
  const moveTask = React.useCallback((dragIndex, hoverIndex, type) => {
    let itemType = "";
    switch (type) {
      case "Todo": {
        itemType = "listTodo";
        break;
      }
      case "In Progress": {
        itemType = "listInProgress";
        break;
      }
      case "Completed": {
        itemType = "listCompleted";
        break;
      }
      case "Overdue": {
        itemType = "listOverdue";
        break;
      }
    }
    updateData((prevData) => {
      const updatedList = [...prevData[itemType]];
      const [removedItem] = updatedList.splice(dragIndex, 1);
      updatedList.splice(hoverIndex, 0, removedItem);

      return {
        ...prevData,
        [itemType]: updatedList,
      };
    });
  }, []);
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
  }, [data, filterFormData]);

  const renderCard = React.useCallback((item, index) => {
    return (
      <Task
        key={item.id}
        index={index}
        id={item.id}
        item={item}
        moveTask={moveTask}
      />
    );
  }, []);

  return (
    <Stack
      ref={drop}
      spacing={1}
      padding={1}
      minHeight={isMobile ? "auto" : 150}
    >
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
          sx={{ py: 1 }}
        />
        <ListItemIcon
          sx={{ minWidth: "auto" }}
          onClick={() => setOpenModal(true)}
        >
          <AddBoxRoundedIcon sx={{ cursor: "pointer" }} />
        </ListItemIcon>
      </ListItem>
      {listTask && listTask.map((item, index) => renderCard(item, index))}

      {isOver && !isMobile && item.item.type !== type ? (
        <Box
          width={"100%"}
          height={164}
          border={"1px dotted #000"}
          borderRadius={4}
        ></Box>
      ) : null}
      {isOver && isMobile && item.item.type !== type ? <MyPreview /> : null}
      <AddNewTaskModal
        type={type}
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
      />
    </Stack>
  );
}
