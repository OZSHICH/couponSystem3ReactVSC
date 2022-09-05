import { Link } from "react-router-dom";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import "./Menu.css";

function Menu(): JSX.Element {
  //const customLinks = customLinksData.map((x) => <CustomLink to={x.link}>{x.title}</CustomLink>);
  //return <div className="Menu flex-col-top-center">{customLinks}</div>;

  return (
    <div className="Menu flex-col-top-center">
      <CustomLink to="home">Home</CustomLink>
      <CustomLink to="coupons">Coupons</CustomLink>
      <CustomLink to="customers">Customer</CustomLink>
      <CustomLink to="companies">Companies</CustomLink>
      <CustomLink to="about">About</CustomLink>
      <CustomLink to="donate">Donate</CustomLink>
    </div>
  );
}

export default Menu;
