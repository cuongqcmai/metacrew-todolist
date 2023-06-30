import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";
import { useAppContext } from "../context/AppProvider";
import useResponsive from "../hook.js/useResponsive";
import { OPTION_PRIORITY, OPTION_STATUS } from "../lib/constants";
import DropDownCustomize from "./DropDownCustomize";

export default function AddNewTaskModal({
  openModal = false,
  closeModal,
  type,
  item = null,
}) {
  const handleClose = () => closeModal();
  const { addTask, updateTask } = useAppContext();
  const { isMobile } = useResponsive();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    pt: 2,
    px: 2,
    pb: 3,
    color: "#000",
  };

  const schemaCreateTask = yup.object({
    title: yup.string().required("Please enter the value"),
    description: yup.string().required("Please enter the value"),
    type: yup.string().required("Please enter the value"),
    priority: yup.string().required("Please enter the value"),
  });

  const addNewTask = (value) => {
    value.id = uuidv4();
    addTask(value);
    reset();
    handleClose();
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      id: item?.id || null,
      title: item?.title || "",
      description: item?.description || "",
      type: item?.type || type || OPTION_STATUS[0],
      priority: item?.priority || OPTION_PRIORITY[0],
      tag: item?.tag || [],
    },
    resolver: yupResolver(schemaCreateTask),
  });

  const onChangeTags = (value) => {
    setValue("tag", value);
  };

  const handleSubmitForm = (value) => {
    if (item) {
      updateTask(value);
      handleClose();
    } else {
      addNewTask(value);
    }
  };

  React.useEffect(() => {
    setValue("priority", item?.priority || OPTION_PRIORITY[0]);
  }, [item?.priority]);
  return (
    <>
      <Modal
        sx={{
          ">.MuiBox-root": {
            width: isMobile ? "100%" : 400,
            bottom: isMobile ? 0 : "auto",
            left: isMobile ? 0 : "50%",
            top: isMobile ? "auto" : "50%",
            transform: isMobile ? "none" : "translate(-50%, -50%)",
            boxSizing: isMobile ? "border-box" : "initial",
          },
        }}
        open={openModal}
        onClose={handleClose}
      >
        <Box
          sx={{
            ...style,
            borderRadius: 2,
            ":focus-visible": { outline: "none" },
            padding: isMobile ? 2 : 2,
          }}
        >
          <Typography variant="h6" component="h2" mb={2}>
            {item ? "Update task" : "Add new task"}
          </Typography>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <Stack spacing={2} sx={{ ".MuiFilledInput-input": { pt: 3 } }}>
              <TextField
                label="Title"
                fullWidth
                type="string"
                defaultValue={item?.title}
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
              <TextField
                defaultValue={item?.description}
                label="Description"
                fullWidth
                type="string"
                {...register("description")}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
              <Box
                sx={{ width: "auto" }}
                display={"flex"}
                alignItems={"center"}
              >
                <InputLabel sx={{ mr: 0.5 }}>Status</InputLabel>

                <Select
                  sx={{ minWidth: isMobile ? 100 : 160 }}
                  {...register("type")}
                  defaultValue={item?.type || type || OPTION_STATUS[0]}
                  error={!!errors.type}
                >
                  {OPTION_STATUS.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>

                <Box
                  sx={{ width: "auto", ml: 1 }}
                  display={"flex"}
                  alignItems={"center"}
                >
                  <InputLabel sx={{ mr: 0.5 }}>Priority</InputLabel>
                  <Select
                    sx={{ minWidth: 120 }}
                    {...register("priority")}
                    defaultValue={item?.priority || OPTION_PRIORITY[0]}
                  >
                    {OPTION_PRIORITY.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </Box>

              <DropDownCustomize
                defaultValue={item?.tag}
                onChangeTags={onChangeTags}
              />

              <Button
                variant="contained"
                size="medium"
                fullWidth
                type="submit"
                sx={{ textTransform: "none" }}
              >
                {item ? "Update" : "Add"}
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    </>
  );
}
