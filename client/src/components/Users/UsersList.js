import User from "./User";

import styles from "./User.module.css";

import { Fragment, useState } from "react";

import axios from "axios";

const UsersList = () => {
  const [users, setUsers] = useState();
  const fetchData = () => {
    axios
      .get(`http://localhost:8080/users/users`)
      .then((res) => setUsers(res.data));
  };

  const displayUsers = users?.map((user) => (
    <User
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
      {fetchData()} {/* App crashes here. */}
      <div className={styles.bigContainer}>{displayUsers}</div>
    </Fragment>
  );
};

export default UsersList;
