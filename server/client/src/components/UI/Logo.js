import logo from "../../images/logo.svg";

const Logo = (props) => {
  return (
    <img
      src={logo}
      alt="Logo"
      onClick={props.onClick}
      className={props.className}
    ></img>
  );
};

export default Logo;
