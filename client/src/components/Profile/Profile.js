import React, { Fragment, useState } from "react";
import Navigation from "../UI/Navigation";
import { ThemeProvider } from "@mui/material/node_modules/@mui/system/node_modules/@mui/private-theming";
import { Box, Container, TextField, Button, Grid } from "@mui/material";
import axios from "axios";

const Profile = (props) => {
  axios.get("/users/cincimii").then((res) => console.log(res));
  return (
    //<ThemeProvider theme={props.theme}>
    <Fragment>
      <Navigation />
      <Container
        minWidth="600px"
        minHeight="600px"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "red",
        }}
      >
        <Box
          width="50%"
          height="50%"
          minHeight="250px"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "blue",
          }}
        >
          <h1>IMAGINE</h1>
        </Box>
        <Box
          width="50%"
          height="50%"
          minHeight="250px"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "blue",
          }}
        >
          <h1>DATE UTILIZATOR</h1>
          <form onSubmit={console.log("form submit")}>
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              margin="dense"
              onInput={console.log("text input")}
              value={1}
              fullWidth
            />
            <br />
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              margin="dense"
              onInput={console.log("pass input")}
              value={2}
              fullWidth
            />
            <br />
            <TextField
              id="country"
              label="Country"
              variant="outlined"
              margin="dense"
              onInput={console.log("pass input")}
              value={2}
              fullWidth
            />
            <br />
            <TextField
              id="city"
              label="City"
              variant="outlined"
              margin="dense"
              onInput={console.log("pass input")}
              value={2}
              fullWidth
            />
            <br />
            <TextField
              id="secretQuestion"
              label="Secret Question"
              variant="outlined"
              margin="dense"
              onInput={console.log("pass input")}
              value={2}
              fullWidth
            />
            <br />
            <TextField
              id="gender"
              label="Gender"
              variant="outlined"
              margin="dense"
              onInput={console.log("pass input")}
              value={2}
              fullWidth
            />
            <br />
            <TextField
              id="hobbies"
              label="Hobbies"
              variant="outlined"
              margin="dense"
              onInput={console.log("pass input")}
              value={2}
              fullWidth
            />
            <br />
            <TextField
              id="friends"
              label="Friends"
              variant="outlined"
              margin="dense"
              onInput={console.log("pass input")}
              value={2}
              fullWidth
            />
            <br />
            <TextField
              id="groups"
              label="Groups"
              variant="outlined"
              margin="dense"
              onInput={console.log("pass input")}
              value={2}
              fullWidth
            />
            <br />
            <TextField
              id="interests"
              label="Interests"
              variant="outlined"
              margin="dense"
              onInput={console.log("pass input")}
              value={2}
              fullWidth
            />
            <br />
            <Grid container sx={{ mt: 1, mb: 3 }}>
              <Button
                variant="contained"
                size="large"
                onClick={console.log("btn1")}
                type="button"
                sx={{ mr: 3 }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                size="large"
                onClick={console.log("btn2")}
                type="button"
              >
                Register
              </Button>
            </Grid>
          </form>
        </Box>
      </Container>
      <Container
        minWidth="600px"
        minHeight="600px"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "red",
        }}
      >
        <Box
          width="100%"
          height="50%"
          minHeight="250px"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "green",
          }}
        >
          <h1>ETC</h1>
        </Box>
      </Container>
    </Fragment>
    //</ThemeProvider>
  );
};

export default Profile;
