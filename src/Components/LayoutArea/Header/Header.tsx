import { useEffect, useState } from "react";
import store from "../../../Redux/Store";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import DarkMode from "../../DarkMode/DarkMode";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import Clock from "../../SharedArea/Clock/Clock";
import Logo from "../../SharedArea/Logo/Logo";
import "./Header.css";

function Header(): JSX.Element {
  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(
    store.getState().authReducer.user?.clientType === "CUSTOMER"
  );
  const [isCompanyLoggedIn, setIsCompanyLoggedIn] = useState(
    store.getState().authReducer.user?.clientType === "COMPANY"
  );
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    store.getState().authReducer.user?.clientType === "ADMINISTRATOR"
  );

  useEffect(() => {
    return store.subscribe(() => {
      setIsCustomerLoggedIn(store.getState().authReducer.user?.clientType === "CUSTOMER");
      setIsCompanyLoggedIn(store.getState().authReducer.user?.clientType === "COMPANY");
      setIsAdminLoggedIn(store.getState().authReducer.user?.clientType === "ADMINISTRATOR");
    });
  }, []);

  return (
    <div className="Header head-flex-around">
      <div className="flex-around coupon-system-title">
        <Logo />
        <h1>Coupon System</h1>
      </div>

      {isCustomerLoggedIn ? (
        <>
          <div className="flex-around-menu">
            <CustomLink to="home">Home</CustomLink>
            <CustomLink to="/customers/coupons/customerId/">Coupons</CustomLink>
            <CustomLink to="/customers/coupons/">Coupons Shop</CustomLink>
            <CustomLink to="/customers/getCustomerDetails/">Customer Details</CustomLink>
            <CustomLink to="about">About</CustomLink>
            <CustomLink to="donate">Donate</CustomLink>
          </div>
        </>
      ) : (
        <></>
      )}

      {isCompanyLoggedIn ? (
        <>
          <div className="flex-around-menu">
            <CustomLink to="home">Home</CustomLink>
            <CustomLink to="/companies/coupons/">Coupons</CustomLink>
            <CustomLink to="/companies/getCompanyDetails/">Company Details</CustomLink>
            <CustomLink to="about">About</CustomLink>
            <CustomLink to="donate">Donate</CustomLink>
          </div>
        </>
      ) : (
        <></>
      )}

      {isAdminLoggedIn ? (
        <>
          <div className="flex-around-menu">
            <CustomLink to="/admin/home/">Home</CustomLink>
            <CustomLink to="admin/companies/">Companies</CustomLink>
            <CustomLink to="/admin/customers/">Customers</CustomLink>
            <CustomLink to="about">About</CustomLink>
            <CustomLink to="donate">Donate</CustomLink>
          </div>
          <div className="single-line-head">
            <div>
              <AuthMenu />
            </div>
            <div>
              <DarkMode />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="single-line-head">
            <div>
              <AuthMenu />
            </div>
            <div>
              <DarkMode />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Header;
