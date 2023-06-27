import { yupResolver } from "@hookform/resolvers/yup";
import {
  Autocomplete,
  Button,
  FormControl,
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
import { OPTION_PRIORITY, OPTION_STATUS } from "../lib/constants";
import DropDownCustomize from "./DropDownCustomize";

export default function AddNewTaskModal({
  openModal = false,
  closeModal,
  type = "",
  item,
}) {
  const handleClose = () => closeModal();
  const { addTask, updateTask } = useAppContext();
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
    reset,
  } = useForm({
    defaultValues: {
      id: item?.id || null,
      title: item?.title || "",
      description: item?.description || "",
      type: item?.type || "",
      priority: item?.type || "",
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
      reset();
      handleClose();
      return;
    }
    addNewTask(value);
  };

  React.useEffect(() => {
    if (!type) {
      setValue("type", OPTION_STATUS[0]);
    }
    setValue("type", type);
  }, [type]);

  React.useEffect(() => {
    setValue("priority", OPTION_PRIORITY[0]);
  }, []);
  return (
    <>
      <Modal open={openModal} onClose={handleClose}>
        <Box
          sx={{
            ...style,
            borderRadius: 2,
            ":focus-visible": { outline: "none" },
          }}
        >
          <Typography variant="h6" component="h2" mb={2}>
            Add new task
          </Typography>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <Stack spacing={2} sx={{ ".MuiFilledInput-input": { pt: 3 } }}>
              <TextField
                label="Title"
                required
                fullWidth
                type="string"
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
              <TextField
                label="Description"
                required
                fullWidth
                type="string"
                {...register("description")}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
              <Box
                flexDirection={"row"}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Autocomplete
                  sx={{ minWidth: 180 }}
                  options={OPTION_STATUS}
                  onChange={(e) => setValue("type", e.target.value)}
                  defaultValue={item?.type || type || OPTION_STATUS[0]}
                  {...register("type")}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      {...register("type")}
                      label="Status"
                    />
                  )}
                />

                <Box
                  sx={{ width: "auto" }}
                  display={"flex"}
                  alignItems={"center"}
                >
                  <InputLabel sx={{ mr: 0.5 }}>Priority</InputLabel>
                  <Select
                    sx={{ minWidth: 120 }}
                    {...register("priority")}
                    defaultValue={item?.priority || "Low"}
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

              <Button variant="contained" size="medium" fullWidth type="submit">
                {item ? "Update" : "Add"}
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    </>
  );
}
