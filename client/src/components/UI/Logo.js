import logo from "../../images/logo.svg";

const Logo = (props) => {
  return <img src={logo} alt="Logo" className={props.className}></img>;
};

export default Logo;
