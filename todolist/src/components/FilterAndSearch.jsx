import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useAppContext } from "../context/AppProvider";

export default function FilterAndSearch() {
  const { filterFormData, updateFilterFormData } = useAppContext();
  const handleUpdateFilter = (e) => {
    updateFilterFormData({ ...filterFormData, type: e.target.value });
  };

  const handleUpdateSearch = (e) => {
    updateFilterFormData({ ...filterFormData, searchName: e.target.value });
  };
  return (
    <>
      <FormControl sx={{ mb: 2 }}>
        {/* <RadioGroup
          row
          sx={{ alignItems: "center" }}
          defaultValue="all"
          onChange={handleUpdateFilter}
        >
          <FormLabel sx={{ mr: 2, minWidth: 60, textAlign: "left" }}>
            Filter
          </FormLabel>
          <FormControlLabel value="all" control={<Radio />} label="All" />
          <FormControlLabel value="todo" control={<Radio />} label="Todo" />
          <FormControlLabel
            value="in_progress"
            control={<Radio />}
            label="In Progress"
          />
          <FormControlLabel
            value="completed"
            control={<Radio />}
            label="Completed"
          />
          <FormControlLabel
            value="overdue"
            control={<Radio />}
            label="Overdue"
          />
        </RadioGroup> */}
        <Box display={"flex"} alignItems={"center"} autoComplete="off">
          <FormLabel sx={{ mr: 2, minWidth: 60, textAlign: "left" }}>
            Search
          </FormLabel>
          <TextField
            onChange={handleUpdateSearch}
            sx={{ m: 0, minWidth: 256, backgroundColor: "#fff" }}
            label="Task name"
            variant="outlined"
          />
        </Box>
      </FormControl>
    </>
  );
}
