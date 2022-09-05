import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { companiesClearAction } from "../../../Redux/CompanyAppState";
import { couponsClearAction } from "../../../Redux/CouponsAppState";
import store from "../../../Redux/Store";
import { logoutAction } from "../../../Redux/UserAppState";
import notify, { SccMsg } from "../../../Services/Notification";
import "./Logout.css";

function Logout(): JSX.Element {
  const navigate = useNavigate();

  useEffect(() => {
    const res = window.confirm("Are You Sure You Want To Log Out?");

    if (res) {
      store.dispatch(logoutAction());
      store.dispatch(companiesClearAction());
      store.dispatch(couponsClearAction());
      notify.success(SccMsg.LOGOUT);
      navigate("/login");
    }
  }, []);
  return <> </>;
}

export default Logout;
