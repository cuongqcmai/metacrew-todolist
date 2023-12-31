import { Box, Stack } from "@mui/material";
import * as React from "react";
import "./App.css";
import NewTask from "./components/NewTask";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FilterAndSearch from "./components/FilterAndSearch";
import TabStatus from "./components/TabStatus";
import backgroundImage from "./assets/images/background-image.avif";

function App() {
  return (
    <Stack
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <ToastContainer />
      <Stack
        direction="column"
        spacing={3}
        sx={{
          backgroundColor: "#fff",
          height: "100vh",
          width: "100%",
          maxWidth: 1280,
          margin: "auto",
        }}
      >
        <NewTask />

        <Box
          sx={{
            backgroundColor: "#EEE",
            mt: "0 !important",
            overflow: "auto",
          }}
          display={"flex"}
          flexDirection={"column"}
          p={2}
          height={"100%"}
        >
          <FilterAndSearch />
          <TabStatus />
        </Box>
      </Stack>
    </Stack>
  );
}

export default App;
