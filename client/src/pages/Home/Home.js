import React, { useState, useMemo, Fragment } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import { getDesignTokens } from "../../utils/theme";

import Navigation from "../../components/UI/Navigation";
import { Box } from "@mui/material";
import { ChatEngine } from "react-chat-engine";

const Home = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState();
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
  if (!isLoggedIn && document.cookie != "") {
    setUsername(
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("username="))
        .split("=")[1]
    );
    setPassword(
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("password="))
        .split("=")[1]
    );
    setIsLoggedIn(true);
  }
  console.log(username, password);
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
          <ChatEngine
            height="90vh"
            userName={username}
            userSecret={password}
            projectID="e2e7e8dc-0139-472f-a005-c17efe1f1407"
          />
        </Box>
      </ThemeProvider>
    </Fragment>
  );
};

export default Home;
