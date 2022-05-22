import Authentication from "../../components/Authentication/Authentication";
import Logo from "../../components/UI/Logo";
import classes from "./Login.module.css";
import ParticlesComponent from "../../components/UI/ParticlesComponent";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const redirectToHome = () => {
    navigate("/");
  };
  return (
    <Fragment>
      <div className={classes.container}>
        <div className={classes.card}>
          <Logo onClick={redirectToHome} className={classes.logo} />
          <Authentication />
        </div>
      </div>
      <ParticlesComponent />
    </Fragment>
  );
};

export default Login;
