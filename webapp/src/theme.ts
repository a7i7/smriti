"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2a9461",
    },
  },
  typography: {
    fontFamily: "var(--font-roboto)",
  },
});

export default theme;
