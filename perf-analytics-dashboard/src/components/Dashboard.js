import React, { useState, useEffect } from "react";
import DateTimePicker from "@mui/lab/DateTimePicker";

import TextField from "@mui/material/TextField";
import DashboardLineChart from "./DashboardLineChart";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import call from "../api/call";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    dashboardMetrics();
  }, []);

  function dashboardMetrics(start, end) {
    call
      .api({
        endpoint:
          start && end
            ? "/analytic/dashboard?startDate=" + start + "&endDate=" + end
            : "/analytic/dashboard",
        method: "GET",
      })
      .then((response) => {
        setDashboardData(response);
      })
      .catch((error) => {
        setDashboardData({});
        console.log(JSON.stringify(error));
      });
  }

  function search() {
    if (startDate && endDate) {
      dashboardMetrics(startDate.toISOString(), endDate.toISOString());
    }
  }

  const lineCharts = [];

  if (dashboardData) {
    for (const [key, item] of Object.entries(dashboardData)) {
      lineCharts.push(
        <Box
          key={key}
          sx={{
            display: "inline-flex",
            m: 1,
            p: 1,
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#101010" : "#fff",
            color: (theme) =>
              theme.palette.mode === "dark" ? "grey.300" : "grey.800",
            border: "1px solid",
            borderColor: (theme) =>
              theme.palette.mode === "dark" ? "grey.800" : "grey.300",
            borderRadius: 2,
            fontSize: "0.875rem",
            fontWeight: "700",
          }}
        >
          <DashboardLineChart data={item.data} title={item.title} />
        </Box>
      );
    }
  }

  return (
    <div style={{ width: "100%" }}>
      <Box
        sx={{
          display: "inline-flex",
          m: 1,
          p: 1,
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#101010" : "#fff",
          color: (theme) =>
            theme.palette.mode === "dark" ? "grey.300" : "grey.800",
          border: "1px solid",
          borderColor: (theme) =>
            theme.palette.mode === "dark" ? "grey.800" : "grey.300",
          borderRadius: 2,
          fontSize: "0.875rem",
          fontWeight: "700",
        }}
      >
        <Stack spacing={8} direction="row">
          <DateTimePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />

          <DateTimePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => {
              setEndDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />

          <Button
            variant="contained"
            onClick={() => {
              search();
            }}
          >
            SEARCH
          </Button>
        </Stack>
      </Box>
      <Box
        sx={{
          display: "table-row",
          m: 1,
          p: 1,
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#101010" : "#fff",
          color: (theme) =>
            theme.palette.mode === "dark" ? "grey.300" : "grey.800",
          border: "1px solid",
          borderColor: (theme) =>
            theme.palette.mode === "dark" ? "grey.800" : "grey.300",
          borderRadius: 2,
          fontSize: "0.875rem",
          fontWeight: "700",
        }}
      >
        {lineCharts}
      </Box>
    </div>
  );
}
