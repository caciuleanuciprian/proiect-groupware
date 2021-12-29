import React, { useState, useMemo, useEffect, useRef, Fragment } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import { getDesignTokens } from "../../utils/theme";

import Navigation from "../../components/UI/Navigation";
import { Box, TextField } from "@mui/material";
import io from "socket.io-client";

const Home = () => {
  const socket = io.connect("http://localhost:8080");

  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:8080");
    socketRef.current.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
    return () => socketRef.current.disconnect();
  }, [chat]);

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    const { name, message } = state;
    socketRef.current.emit("message", { name, message });
    e.preventDefault();
    setState({ message: "", name });
  };

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ));
  };

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
          <div className="card">
            <form onSubmit={onMessageSubmit}>
              <h1>Messenger</h1>
              <div className="name-field">
                <TextField
                  name="name"
                  onChange={(e) => onTextChange(e)}
                  value={state.name}
                  label="Name"
                />
              </div>
              <div>
                <TextField
                  name="message"
                  onChange={(e) => onTextChange(e)}
                  value={state.message}
                  id="outlined-multiline-static"
                  variant="outlined"
                  label="Message"
                />
              </div>
              <button>Send Message</button>
            </form>
            <div className="render-chat">
              <h1>Chat Log</h1>
              {renderChat()}
            </div>
          </div>
        </Box>
      </ThemeProvider>
    </Fragment>
  );
};

export default Home;
