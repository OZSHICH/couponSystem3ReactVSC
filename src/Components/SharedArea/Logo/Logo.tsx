import "./Logo.css";
import src from "../../../Assets/Images/tickets-icon.svg";
function Logo(): JSX.Element {
  return (
    <div className="Logo ">
      <img className=" logo-size" src={src} alt="logo" />
    </div>
  );
}

export default Logo;
