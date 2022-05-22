import React, { useState, useMemo, Fragment } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import { getDesignTokens } from "../../utils/theme";

import UsersList from "../../components/Users/UsersList";

import Navigation from "../../components/UI/Navigation";
import { Box } from "@mui/material";

import "./Home.css";

const Home = () => {
  // eslint-disable-next-line no-unused-vars
  const [username, setUsername] = useState();
  // eslint-disable-next-line no-unused-vars
  const [password, setPassword] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [mode, setMode] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const colorMode = () => {
    if (mode === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };
  localStorage.setItem("theme", mode);
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  if (!isLoggedIn && document.cookie !== "") {
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

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            bgcolor: theme.palette.background,
            overflow: "hidden",
          }}
        >
          <Navigation mode={mode} onClick={colorMode} theme={theme} />
          <div
            className="chat"
            style={
              mode === "light"
                ? {
                    "--bg-color": "rgb(144, 202, 249)",
                    "--font-color": "black",
                  }
                : { "--bg-color": "rgb(26,35,126)", "--font-color": "white" }
            }
          >
            Aici era un chat dar nu mai este.
          </div>
          <UsersList />
        </Box>
      </ThemeProvider>
    </Fragment>
  );
};

export default Home;
