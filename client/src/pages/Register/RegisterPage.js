import classes from "./RegisterPage.module.css";
import ParticlesComponent from "../../components/UI/ParticlesComponent";
import Register from "../../components/Authentication/Register";
import Logo from "../../components/UI/Logo";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const redirectToHome = () => {
    navigate("/");
  };
  return (
    <Fragment>
      <div className={classes.container}>
        <div className={classes.card}>
          <Logo onClick={redirectToHome} className={classes.logo} />
          <Register />
        </div>
      </div>
      <ParticlesComponent />
    </Fragment>
  );
};

export default RegisterPage;
