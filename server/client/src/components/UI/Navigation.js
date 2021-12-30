import React, { useState, Fragment } from "react";
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  IconButton,
  Tooltip,
  ToggleButton,
  Button,
} from "@mui/material";
import classes from "./Navigation.module.css";
import { blue } from "@mui/material/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faUserAlt,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Navigation = (props) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLogged, setIsLogged] = useState(
    document.cookie !== "" ? true : false
  );
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const redirectToLogin = () => {
    navigate("/login");
  };

  const clearCookies = () => {
    document.cookie.split(";").forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      window.location.reload();
    });
  };

  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "flex-end",
          height: "10vh",
        }}
      >
        <ToggleButton
          sx={{ mt: 2, border: "none" }}
          value="check"
          selected={selected}
          onClick={() => props.onClick()}
          onChange={() => {
            setSelected(!selected);
          }}
        >
          {selected ? (
            <FontAwesomeIcon
              icon={faMoon}
              className={classes.faIconColorBlack}
            />
          ) : (
            <FontAwesomeIcon
              icon={faSun}
              className={classes.faIconColorWhite}
            />
          )}
        </ToggleButton>
        {isLogged ? (
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2, mr: 2, mt: 2 }}
            >
              <Avatar sx={{ width: 36, height: 36, bgcolor: blue[700] }}>
                C
              </Avatar>
            </IconButton>
          </Tooltip>
        ) : (
          <Button
            variant="contained"
            size="large"
            onClick={redirectToLogin}
            type="button"
            sx={{ mr: 3, mt: 2, ml: 3 }}
          >
            Login
          </Button>
        )}
      </Box>
      {isLogged ? (
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              //bgcolor: `${props.theme.palette.paper}`,
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem>
            <FontAwesomeIcon icon={faUserAlt} className={classes.faIcon} />
            Profile
          </MenuItem>
          <Divider />
          <MenuItem onClick={clearCookies}>
            <FontAwesomeIcon icon={faSignOutAlt} className={classes.faIcon} />
            Logout
          </MenuItem>
        </Menu>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default Navigation;
