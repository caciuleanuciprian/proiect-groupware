import React, { Fragment, useState, useMemo } from "react";
import Navigation from "../UI/Navigation";
import {
  Box,
  Container,
  TextField,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import FileUpload from "./FileUpload";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import styles from "./Profile.module.css";

import { getDesignTokens } from "../../utils/theme";

const Profile = (props) => {
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
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Box
          sx={{
            width: "100vw",
            minHeight: "100vh",
            bgcolor: theme.palette.background,
          }}
        >
          <Navigation mode={mode} onClick={colorMode} theme={theme} />
          <Container
            minWidth="600px"
            minHeight="600px"
            className={styles.container}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              border: "2px solid",
              borderColor: theme.palette.text.primary,
            }}
          >
            <Box
              padding="10px"
              width="50%"
              height="100%"
              minHeight="250px"
              className={styles.box}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Typography variant="h3" color={theme.palette.text.primary}>
                Profile picture
              </Typography>
              <FileUpload />
            </Box>
            <Box
              className={styles.box}
              padding="10px"
              width="50%"
              height="50%"
              minHeight="250px"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h3" color={theme.palette.text.primary}>
                User data
              </Typography>
              <form>
                {userInfo ? (
                  <Fragment>
                    <TextField
                      id="username"
                      label="Username"
                      variant="outlined"
                      margin="dense"
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
                      value={userInfo ? userInfo.password : ""}
                      fullWidth
                    />
                    <br />
                    <TextField
                      id="country"
                      label="Country"
                      variant="outlined"
                      margin="dense"
                      value={userInfo ? userInfo.country : ""}
                      fullWidth
                    />
                    <br />
                    <TextField
                      id="city"
                      label="City"
                      variant="outlined"
                      margin="dense"
                      value={userInfo ? userInfo.city : ""}
                      fullWidth
                    />
                    <br />
                    <TextField
                      id="secretQuestion"
                      label="Secret Question"
                      variant="outlined"
                      margin="dense"
                      value={userInfo ? userInfo.secretQuestion : ""}
                      fullWidth
                    />
                    <br />
                    <TextField
                      id="gender"
                      label="Gender"
                      variant="outlined"
                      margin="dense"
                      value={userInfo ? userInfo.gender : ""}
                      fullWidth
                    />
                    <br />
                    <TextField
                      id="hobbies"
                      label="Hobbies"
                      variant="outlined"
                      margin="dense"
                      value={userInfo ? userInfo.hobbies : ""}
                      fullWidth
                    />
                    <br />
                    <TextField
                      id="friends"
                      label="Friends"
                      variant="outlined"
                      margin="dense"
                      value={userInfo ? userInfo.friends : ""}
                      fullWidth
                    />
                    <br />
                    <TextField
                      id="groups"
                      label="Groups"
                      variant="outlined"
                      margin="dense"
                      value={userInfo ? userInfo.groups : ""}
                      fullWidth
                    />
                    <br />
                    <TextField
                      id="interests"
                      label="Interests"
                      variant="outlined"
                      margin="dense"
                      value={userInfo ? userInfo.interests : ""}
                      fullWidth
                    />
                    <br />
                    <Grid container sx={{ mt: 1, mb: 3 }}>
                      <Button
                        variant="contained"
                        size="large"
                        type="button"
                        sx={{ mr: 3 }}
                      >
                        Save Changes
                      </Button>
                      <Button variant="contained" size="large" type="button">
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
        </Box>
      </Fragment>
    </ThemeProvider>
  );
};

export default Profile;
