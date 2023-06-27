import { Box, Stack } from "@mui/material";
import "./App.css";
import NewTask from "./components/NewTask";
import StatusManagement from "./components/StatusManagement";

import { AppProvider } from "./context/AppProvider";

function App() {
  return (
    <AppProvider>
      <Stack
        direction="column"
        spacing={3}
        sx={{
          backgroundColor: "#fff",
          height: "100vh",
          width: "100%",
        }}
      >
        <NewTask />

        <Box
          sx={{
            backgroundColor: "#EEE",
            mt: "0 !important",
          }}
          display={"flex"}
          flexDirection={"column"}
          p={2}
          height={"calc(100vh - 146px)"}
        >
          <Box
            sx={{
              backgroundColor: "#EEE",
            }}
            display={"flex"}
            direction="column"
          >
            <StatusManagement type="Todo" />
            <StatusManagement type="In Progress" />
            <StatusManagement type="Completed" />
            <StatusManagement type="Overdue" />
          </Box>
        </Box>
      </Stack>
    </AppProvider>
  );
}

export default App;
