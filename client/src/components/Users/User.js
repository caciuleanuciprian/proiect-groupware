import styles from "./User.module.css";

import { useNavigate } from "react-router-dom";

const User = (props) => {
  const navigate = useNavigate();

  const redirect = () => {
    navigate("/stranger", { state: props.profileUsername });
  };
  return (
    <div className={styles.container}>
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
  );
};

export default User;
