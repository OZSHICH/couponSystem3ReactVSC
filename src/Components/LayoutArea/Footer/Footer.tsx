import { AudioPlayer } from "../../SharedArea/MusicPlayer/AudioPlayer";
import SocialMedia from "../../SharedArea/SocialMedia/SocialMedia";
import "./Footer.css";

function Footer(): JSX.Element {
  return (
    <div className="Footer foot-flex-around">
      <SocialMedia />
      <br />

      <AudioPlayer />
      <p className="text-rights">All Rights Reserved To OzShich &copy;</p>
    </div>
  );
}
export default Footer;
