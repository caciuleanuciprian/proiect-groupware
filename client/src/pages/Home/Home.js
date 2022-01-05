import React, { useState, useMemo, Fragment } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import { getDesignTokens } from "../../utils/theme";

import Navigation from "../../components/UI/Navigation";
import { Box } from "@mui/material";
import { ChatEngine } from "react-chat-engine";
import axios from "axios";

import "./Home.css";

const Home = () => {
  const [username, setUsername] = useState();
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

  if (isLoggedIn && document.cookie !== "") {
    axios
      .post(
        "https://api.chatengine.io/chats/83088/people/",
        { username: username },
        {
          headers: {
            "Project-ID": "e2e7e8dc-0139-472f-a005-c17efe1f1407",
            "User-Name": "admin",
            "User-Secret": "admin",
          },
        }
      )
      .then((res) => console.log(res));
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
            <ChatEngine
              height="90vh"
              userName={username}
              userSecret={password}
              projectID="e2e7e8dc-0139-472f-a005-c17efe1f1407"
            />
          </div>
        </Box>
      </ThemeProvider>
    </Fragment>
  );
};

export default Home;
