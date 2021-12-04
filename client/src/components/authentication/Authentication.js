import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Grid, TextField, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Authentication = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({ username, password });

  useEffect(() => {
    handleUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, password]);

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleUser = () => {
    setUser({ username: username, password: password });
  };

  const authenticate = async () => {
    console.log(user);
    await axios.post("http://localhost:8080/users/login", user).then((res) => {
      if (res?.data?.token) {
        afterGettingToken(res.data.token);
      } else {
        throw new Error("Something went wrong.");
      }
    });
  };
  const afterGettingToken = async (token) => {
    await axios.get("http://localhost:8080/users/app", {
      headers: { Authorization: `Bearer ` + token },
    });
    document.cookie = `token=${token}`;
    setUsername("");
    setPassword("");
    navigate("/");
  };

  const redirectRegister = () => {
    navigate("/register");
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={authenticate}>
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          margin="dense"
          onInput={handleUsername}
          value={username}
          fullWidth
        />
        <br />
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          margin="dense"
          onInput={handlePassword}
          value={password}
          fullWidth
        />
        <br />
        <Grid container sx={{ mt: 1, mb: 3 }}>
          <Button
            variant="contained"
            size="large"
            onClick={authenticate}
            type="button"
            sx={{ mr: 3 }}
          >
            Login
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={redirectRegister}
            type="button"
          >
            Register
          </Button>
        </Grid>
      </form>
    </Container>
  );
};

export default Authentication;
