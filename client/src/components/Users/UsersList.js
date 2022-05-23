import User from "./User";

import styles from "./User.module.css";

import { Fragment, useEffect, useState } from "react";

import Spinner from "../UI/Spinner";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { getDesignTokens } from "../../utils/theme";

import axios from "axios";

const UsersList = (props) => {
  const [users, setUsers] = useState();
  const [loaded, setLoaded] = useState(false);
  const fetchData = () => {
    axios
      .get(`http://localhost:8080/users/users`)
      .then((res) => setUsers(res.data));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
      setLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const displayUsers = users?.map((user) => (
    <User
      theme={props.theme}
      key={user._id}
      username={user.username}
      country={user.country}
      city={user.city}
      secretQuestion={user.secretQuestion}
      gender={user.gender}
      profileUsername={user.username}
    />
  ));

  return (
    <Fragment>
      <ThemeProvider theme={props.theme}>
        {loaded ? (
          <div
            style={
              props.mode === "light"
                ? {
                    "--font-color": "black",
                  }
                : { "--font-color": "white" }
            }
            className={styles.bigContainer}
          >
            {displayUsers}
          </div>
        ) : (
          <Spinner />
        )}
      </ThemeProvider>
    </Fragment>
  );
};

export default UsersList;
