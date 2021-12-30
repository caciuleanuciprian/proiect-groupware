import React, { Fragment, useState } from "react";
import Navigation from "../UI/Navigation";
import { ThemeProvider } from "@mui/material/node_modules/@mui/system/node_modules/@mui/private-theming";
import { Box, Container, TextField, Button, Grid } from "@mui/material";
import axios from "axios";
import FileUpload from "./FileUpload";

const Profile = (props) => {
  const [userInfo, setUserInfo] = useState();
  if (userInfo === undefined) {
    if (
      document.cookie
        ?.split("; ")
        ?.find((row) => row.startsWith("username="))
        ?.split("=")[1] === undefined
    ) {
      return <h1>In order to view this page you must be authenticated.</h1>;
    } else
      axios
        .get(
          `http://localhost:8080/users/${
            document.cookie
              .split("; ")
              .find((row) => row.startsWith("username="))
              .split("=")[1]
          }`
        )
        .then((res) => setUserInfo(res.data[0]));
  }
  console.log(userInfo);
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
          <FileUpload />
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
            {userInfo ? (
              <Fragment>
                <TextField
                  id="username"
                  label="Username"
                  variant="outlined"
                  margin="dense"
                  onInput={console.log("text input")}
                  value={userInfo ? userInfo.username : ""}
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
                  value={userInfo ? userInfo.password : ""}
                  fullWidth
                />
                <br />
                <TextField
                  id="country"
                  label="Country"
                  variant="outlined"
                  margin="dense"
                  onInput={console.log("pass input")}
                  value={userInfo ? userInfo.country : ""}
                  fullWidth
                />
                <br />
                <TextField
                  id="city"
                  label="City"
                  variant="outlined"
                  margin="dense"
                  onInput={console.log("pass input")}
                  value={userInfo ? userInfo.city : ""}
                  fullWidth
                />
                <br />
                <TextField
                  id="secretQuestion"
                  label="Secret Question"
                  variant="outlined"
                  margin="dense"
                  onInput={console.log("pass input")}
                  value={userInfo ? userInfo.secretQuestion : ""}
                  fullWidth
                />
                <br />
                <TextField
                  id="gender"
                  label="Gender"
                  variant="outlined"
                  margin="dense"
                  onInput={console.log("pass input")}
                  value={userInfo ? userInfo.gender : ""}
                  fullWidth
                />
                <br />
                <TextField
                  id="hobbies"
                  label="Hobbies"
                  variant="outlined"
                  margin="dense"
                  onInput={console.log("pass input")}
                  value={userInfo ? userInfo.hobbies : ""}
                  fullWidth
                />
                <br />
                <TextField
                  id="friends"
                  label="Friends"
                  variant="outlined"
                  margin="dense"
                  onInput={console.log("pass input")}
                  value={userInfo ? userInfo.friends : ""}
                  fullWidth
                />
                <br />
                <TextField
                  id="groups"
                  label="Groups"
                  variant="outlined"
                  margin="dense"
                  onInput={console.log("pass input")}
                  value={userInfo ? userInfo.groups : ""}
                  fullWidth
                />
                <br />
                <TextField
                  id="interests"
                  label="Interests"
                  variant="outlined"
                  margin="dense"
                  onInput={console.log("pass input")}
                  value={userInfo ? userInfo.interests : ""}
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
                    Save Changes
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={console.log("btn2")}
                    type="button"
                  >
                    Delete Profile
                  </Button>
                </Grid>
              </Fragment>
            ) : (
              "Loading..."
            )}
          </form>
        </Box>
      </Container>
    </Fragment>
    //</ThemeProvider>
  );
};

export default Profile;
