import React, { useState, Fragment, useEffect } from "react";
import axios from "axios";
import { MenuItem, Button, Grid, TextField, Container } from "@mui/material";
import { countries } from "./countries";
import { genders } from "./genders";
import { useNavigate } from "react-router-dom";

// Add notification that the account was created!

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [secretQuestion, setSecretQuestion] = useState("");
  const [gender, setGender] = useState("");
  const [user, setUser] = useState({
    username: username,
    password: password,
    birthdate: birthdate,
    country: country,
    city: city,
    secretQuestion: secretQuestion,
    gender: gender,
  });

  useEffect(() => {
    handleUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, password, birthdate, country, city, secretQuestion, gender]);

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleBirthdate = (event) => {
    // const date = new Date(event.target.value).toISOString();
    setBirthdate(event.target.value);
  };

  const handleCountry = (event) => {
    setCountry(event.target.value);
  };

  const handleCity = (event) => {
    setCity(event.target.value);
  };

  const handleSecretQuestion = (event) => {
    setSecretQuestion(event.target.value);
  };

  const handleGender = (event) => {
    setGender(event.target.value);
  };

  const handleUser = () => {
    setUser({
      username: username,
      password: password,
      birthdate: birthdate,
      country: country,
      city: city,
      secretQuestion: secretQuestion,
      gender: gender,
    });
  };

  const createAccount = () => {
    axios.post("http://localhost:8080/users/create", user).then((res) => {
      console.log(user);
      setUsername("");
      setPassword("");
      setBirthdate("");
      setCountry("");
      setCity("");
      setSecretQuestion("");
      setGender("");
      //redirect after register
    });
  };

  const redirectToLogin = () => {
    navigate("/login");
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
          <TextField
            id="birthdate"
            label=""
            variant="outlined"
            margin="dense"
            onInput={handleBirthdate}
            value={birthdate}
            fullWidth
            type="date"
            helperText="Please enter your birthday."
          />
          <br />
          <TextField
            id="country"
            select
            margin="dense"
            label="Country"
            value={country}
            onChange={handleCountry}
            helperText="Please select your country."
            fullWidth
          >
            {countries.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <br />
          <TextField
            id="city"
            label="City"
            variant="outlined"
            margin="dense"
            onInput={handleCity}
            value={city}
            fullWidth
            type="text"
          />
          <br />
          <TextField
            id="secretQuestion"
            label="Secret question"
            variant="outlined"
            margin="dense"
            onInput={handleSecretQuestion}
            value={secretQuestion}
            fullWidth
            type="text"
          />
          <br />
          <TextField
            id="gender"
            select
            margin="dense"
            label="Gender"
            value={gender}
            onChange={handleGender}
            helperText="Please select your gender."
            fullWidth
          >
            {genders.map((gen) => (
              <MenuItem key={gen} value={gen}>
                {gen}
              </MenuItem>
            ))}
          </TextField>
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
              onClick={redirectToLogin}
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
