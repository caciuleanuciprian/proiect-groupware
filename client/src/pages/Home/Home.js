import React, { useState, useMemo, Fragment } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import { getDesignTokens } from "../../utils/theme";

import Navigation from "../../components/UI/Navigation";
import { Box } from "@mui/material";

const Home = () => {
  const [mode, setMode] = useState("light");
  const colorMode = () => {
    if (mode === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  console.log(theme);
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            bgcolor: theme.palette.background,
          }}
        >
          <Navigation onClick={colorMode} theme={theme} />
          <h1>Home</h1>
        </Box>
      </ThemeProvider>
    </Fragment>
  );
};

export default Home;
