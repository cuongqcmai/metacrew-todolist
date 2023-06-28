import TabContext from "@mui/lab/TabContext";
import { Box, Grid, Tab } from "@mui/material";
import * as React from "react";

import { TabPanel } from "@mui/lab";
import TabList from "@mui/lab/TabList";
import StatusManagement from "./StatusManagement";
import { useAppContext } from "../context/AppProvider";
import useResponsive from "../hook.js/useResponsive";

export default function TabStatus(params) {
  const { filterFormData, updateFilterFormData } = useAppContext();
  const { isMobile } = useResponsive();

  const [value, setValue] = React.useState("1");

  const handleUpdateFilter = (event, newValue) => {
    setValue(newValue);
    updateFilterFormData({ ...filterFormData, newValue });
  };
  return (
    <Box
      sx={{
        backgroundColor: "#EEE",
      }}
    >
      <TabContext value={value}>
        <Box
          sx={{ borderBottom: 1, borderColor: "divider" }}
          display={"flex"}
          direction="column"
        >
          <TabList
            onChange={handleUpdateFilter}
            sx={{
              ".MuiTabs-scroller": { overflow: "auto !important", pb: 1.5 },
            }}
          >
            <Tab
              sx={{
                borderRadius: "20px 0 0 0",
                backgroundColor: "#fff",
                minWidth: isMobile ? 80 : 136,
                mr: 1,
                textTransform: "none",
                ":focus": { outline: "none" },
                minHeight: "auto",
                py: 0,
              }}
              label="All"
              value="1"
            />
            <Tab
              sx={{
                borderRadius: "20px 0 0 0",
                backgroundColor: "#fff",
                minWidth: isMobile ? 80 : 136,
                mr: 1,
                textTransform: "none",
                ":focus": { outline: "none" },
              }}
              label="Todo"
              value="2"
            />
            <Tab
              sx={{
                borderRadius: "20px 0 0 0",
                backgroundColor: "#fff",
                minWidth: isMobile ? 80 : 136,
                mr: 1,
                textTransform: "none",
                ":focus": { outline: "none" },
              }}
              label="In Progress"
              value="3"
            />
            <Tab
              sx={{
                borderRadius: "20px 0 0 0",
                backgroundColor: "#fff",
                minWidth: isMobile ? 80 : 136,
                mr: 1,
                textTransform: "none",
                ":focus": { outline: "none" },
              }}
              label="Completed"
              value="4"
            />
            <Tab
              sx={{
                borderRadius: "20px 0 0 0",
                backgroundColor: "#fff",
                minWidth: isMobile ? 80 : 136,
                mr: 1,
                textTransform: "none",
                ":focus": { outline: "none" },
              }}
              label="Overdue"
              value="5"
            />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ px: 0 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <StatusManagement type="Todo" />
            </Grid>
            <Grid item xs={12} md={3}>
              <StatusManagement type="In Progress" />
            </Grid>
            <Grid item xs={12} md={3}>
              <StatusManagement type="Completed" />
            </Grid>
            <Grid item xs={12} md={3}>
              <StatusManagement type="Overdue" />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value="2" sx={{ px: 0 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <StatusManagement type="Todo" />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value="3" sx={{ px: 0 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <StatusManagement type="In Progress" />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value="4" sx={{ px: 0 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <StatusManagement type="Completed" />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value="5" sx={{ px: 0 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <StatusManagement type="Overdue" />
            </Grid>
          </Grid>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
