import classes from "./RegisterPage.module.css";
import ParticlesComponent from "../../components/UI/ParticlesComponent";
import Register from "../../components/authentication/Register";
import Logo from "../../components/UI/Logo";
import { Fragment } from "react";
const RegisterPage = () => {
  return (
    <Fragment>
      <div className={classes.container}>
        <div className={classes.card}>
          <Logo className={classes.logo} />
          <Register />
        </div>
      </div>
      <ParticlesComponent />
    </Fragment>
  );
};

export default RegisterPage;
