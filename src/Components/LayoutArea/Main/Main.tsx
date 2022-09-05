import { Outlet } from "react-router-dom";
import About from "../../PagesArea/About/About";
import Donate from "../../PagesArea/Donate/Donate";
import Routing from "../../RoutingArea/Routing/Routing";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Main.css";

function Main(): JSX.Element {
  return (
    <div className="Main">
      <Header />
      <Routing />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Main;
