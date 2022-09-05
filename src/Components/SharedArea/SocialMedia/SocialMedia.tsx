import "./SocialMedia.css";
import { BsGithub, BsLinkedin } from "react-icons/bs";
function SocialMedia(): JSX.Element {
  return (
    <div className="SocialMedia social-flex-around">
      <a href="https://www.linkedin.com/in/oz-shich-2aa38722a/">
        <BsLinkedin />
      </a>
      <a href="https://github.com/OZSHICH">
        <BsGithub />
      </a>
    </div>
  );
}

export default SocialMedia;
