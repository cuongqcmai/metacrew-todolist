import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function ConfirmDeleteTaskModal({
  open,
  handleClose,
  confirmDelete,
}) {
  return (
    <>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        disableEscapeKeyDown
      >
        <DialogTitle>{"Confirm delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={confirmDelete} sx={{ color: "red" }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
