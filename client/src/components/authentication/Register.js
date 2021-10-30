import React, { useState, Fragment, useEffect } from "react";
import axios from "axios";

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
      <h1>Register below:</h1>
      <form onSubmit={createAccount}>
        <label>Username</label>
        <input
          onInput={handleUsername}
          value={username}
          placeholder="Username..."
        ></input>
        <label>Password</label>
        <input
          onInput={handlePassword}
          value={password}
          placeholder="Password..."
        ></input>
        <button onClick={createAccount} type="button">
          Register
        </button>
      </form>
    </Fragment>
  );
};

export default Register;
