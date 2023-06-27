import { yupResolver } from "@hookform/resolvers/yup";
import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import DropDownCustomize from "./DropDownCustomize";

export default function AddNewTaskModal({ openModal = false, closeModal }) {
  const handleClose = () => closeModal();
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

  const optionStatus = ["Todo", "In Progress", "Completed", "Overdue"];

  const schemaCreateFloodPoint = yup.object({
    title: yup.string().required("Vui lòng nhập địa chỉ"),
    description: yup.string().required("Vui lòng nhập mức ngập"),
    type: yup.string(),
  });

  const addNewTask = (value) => {
    console.log("value", value);
  };

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
    setValue,
    reset,
    trigger,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      type: "",
      tag: [],
    },
    resolver: yupResolver(schemaCreateFloodPoint),
  });

  const onChangeTags = (value) => {
    setValue("tag", value);
  };
  return (
    <>
      <Modal open={openModal} onClose={handleClose}>
        <Box sx={{ ...style, borderRadius: 2 }}>
          <Typography variant="h6" component="h2">
            Add new task
          </Typography>
          <form onSubmit={handleSubmit(addNewTask)}>
            <Stack spacing={2} sx={{ ".MuiFilledInput-input": { pt: 3 } }}>
              <TextField
                label="Title"
                required
                fullWidth
                variant="filled"
                type="string"
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title?.message}
              />

              <TextField
                label="Description"
                required
                fullWidth
                variant="filled"
                type="string"
                {...register("description")}
                error={!!errors.description}
                helperText={errors.description?.message}
              />

              <Autocomplete
                variant="filled"
                options={optionStatus}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} {...register("type")} label="Status" />
                )}
              />

              <DropDownCustomize onChangeTags={onChangeTags} />
              {/* <TextField
                required
                sx={{ mt: "0px !important" }}
                fullWidth
                variant="filled"
                type="string"
                InputProps={{ sx: { display: "none" } }}
                {...register("address")}
                error={!!errors.address}
                helperText={errors.address?.message}
              />
              <Divider /> */}
              <Button
                variant="contained"
                size="medium"
                fullWidth
                type="submit"
                disabled={!isValid}
              >
                Gửi thông tin
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    </>
  );
}
