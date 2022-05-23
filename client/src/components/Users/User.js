import styles from "./User.module.css";

import { useState, useMemo } from "react";

import { useNavigate } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { getDesignTokens } from "../../utils/theme";

const User = (props) => {
  const navigate = useNavigate();

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

  const redirect = () => {
    navigate("/stranger", { state: props.profileUsername });
  };
  return (
    <ThemeProvider theme={props.theme}>
      <div
        className={styles.container}
        style={
          mode === "light"
            ? {
                "--font-color": "black",
              }
            : { "--font-color": "white" }
        }
      >
        <h1 className={styles.title}>{props.username}</h1>
        <div className={styles.row}>
          <div className={styles.column}>
            <p className={styles.paragraph}>Country: {props.country}</p>
            <p className={styles.paragraph}>City: {props.city}</p>
          </div>
          <div className={styles.column}>
            <p className={styles.paragraph}>Question: {props.secretQuestion}</p>
            <p className={styles.paragraph}>Gender: {props.gender}</p>
          </div>
        </div>
        <div className={styles.row}>
          <button className={styles.btn} onClick={redirect}>
            Profile
          </button>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default User;
