import React, { useState, Fragment, useEffect } from "react";
import axios from "axios";
import { Button, Grid, TextField, Container } from "@mui/material";

const Register = () => {
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

  const createAccount = () => {
    axios.post("http://localhost:8080/users/create", user).then((res) => {
      setUsername("");
      setPassword("");
      //redirect after register
    });
  };

  return (
    <Fragment>
      <Container maxWidth="sm">
        <form onSubmit={createAccount}>
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
            variant="outlined"
            margin="dense"
            onInput={handlePassword}
            value={password}
            fullWidth
            type="password"
          />
          <br />
          <Grid justifyContent="space-between" container sx={{ mt: 1, mb: 3 }}>
            <Button
              variant="contained"
              size="large"
              onClick={createAccount}
              type="button"
              sx={{ mr: 3 }}
            >
              Register
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                console.log("add redirect to login");
              }}
              type="button"
            >
              Already have an account?
            </Button>
          </Grid>
        </form>
      </Container>
    </Fragment>
  );
};

export default Register;
