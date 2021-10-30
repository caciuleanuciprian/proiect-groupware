import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";

const Authentication = () => {
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
    await axios.post("http://localhost:8080/users/login", user).then((res) => {
      if (res.data.token) {
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
    //redirect after login
  };

  return (
    <div>
      <Fragment>
        <h1>Login below:</h1>
        <form onSubmit={authenticate}>
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
          <button onClick={authenticate} type="button">
            Login
          </button>
        </form>
      </Fragment>
    </div>
  );
};

export default Authentication;
