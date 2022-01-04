import logo from "../../images/logo.svg";
import logoBlack from "../../images/logo-black.svg";

const Logo = (props) => {
  console.log("in logo", props.mode);
  return (
    <img
      src={props.mode === "light" ? logoBlack : logo}
      alt="Logo"
      onClick={props.onClick}
      className={props.className}
    ></img>
  );
};

export default Logo;
