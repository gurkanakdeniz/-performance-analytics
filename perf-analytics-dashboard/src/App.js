import React from "react";

import Dashboard from "./components/Dashboard";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dashboard />
    </LocalizationProvider>
  );
}
