import Authentication from "../../components/authentication/Authentication";
import Logo from "../../components/UI/Logo";
import classes from "./Login.module.css";
import ParticlesComponent from "../../components/UI/ParticlesComponent";
import { Fragment } from "react";
const Login = () => {
  return (
    <Fragment>
      <div className={classes.container}>
        <div className={classes.card}>
          <Logo className={classes.logo} />
          <Authentication />
        </div>
      </div>
      <ParticlesComponent />
    </Fragment>
  );
};

export default Login;
