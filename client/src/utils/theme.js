import { blue, indigo, grey } from "@mui/material/colors";

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          background: blue[200],
          paper: blue[400],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          background: indigo[900],
          paper: blue[900],
          text: {
            primary: "#fff",
            secondary: grey[500],
          },
        }),
  },
});
