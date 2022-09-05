import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import App from "../../../App";
import AddCompany from "../../AdminArea/AddCompany/AddCompany";
import AddCustomer from "../../AdminArea/AddCustomer/AddCustomer";
import DeleteCompany from "../../AdminArea/DeleteCompany/DeleteCompany";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import AddCoupon from "../../CompanyArea/AddCoupon/AddCoupon";
import DeleteCoupon from "../../CompanyArea/DeleteCoupon/DeleteCoupon";
import Donate from "../../PagesArea/Donate/Donate";
import Home from "../../PagesArea/Home/Home";
import Page404 from "../Page404/Page404";
import "./Routing.css";
import DeleteCustomer from "../../CouponArea/DeleteCustomer/DeleteCustomer";
import About from "../../PagesArea/About/About";
import CouponsToBuyList from "../../CouponArea/CouponsToBuyList/CouponsToBuyList";
import CompaniesCoupons from "../../CompanyArea/CompaniesCoupons/CompaniesCoupons";
import UpdateCoupon from "../../CompanyArea/UpdateCoupon/UpdateCoupon";
import CustomerCouponList from "../../CustomerArea/CustomerCouponList/CustomerCouponList";
import UpdateCompany from "../../AdminArea/UpdateCompany/UpdateCompany";
import CustomerAllList from "../../AdminArea/CustomerAllList/CustomerAllList";
import CompaniesAllItem from "../../AdminArea/CompaniesAllItem/CompaniesAllItem";
import CompaniesAllList from "../../AdminArea/CompaniesAllList/CompaniesAllList";
import GetOneCustomer from "../../AdminArea/GetOneCustomer/GetOneCustomer";
import BuyCoupon from "../../CustomerArea/BuyCoupon/BuyCoupon";
import GetOneCompany from "../../AdminArea/GetOneCompany/GetOneCompany";
import UpdateCustomer from "../../AdminArea/UpdateCustomer/UpdateCustomer";
import GetCouponByCategory from "../../CustomerArea/GetCouponByCategory/GetCouponByCategory";
import CompanyDetails from "../../CompanyArea/CompanyDetails/CompanyDetails";
import CustomerDetails from "../../CustomerArea/CustomerDetails/CustomerDetails";
import GetCouponByPrice from "../../CustomerArea/GetCouponByPrice/GetCouponByPrice";

//function Routing(): JSX.Element {
const Routing: FC = () => {
  return (
    <div className="Routing">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />

        <Route path="/admin/home/" element={<Home />} />

        <Route path="/admin/companies/" element={<CompaniesAllList />} />
        <Route path="/admin/companies/add" element={<AddCompany />} />
        <Route path="/admin/companies/getOneCompany/" element={<GetOneCompany />} />
        <Route path="/admin/companies/update/:id" element={<UpdateCompany />} />
        <Route path="/admin/companies/delete/:id" element={<DeleteCompany />} />

        <Route path="/admin/customers/" element={<CustomerAllList />} />
        <Route path="/admin/customers/add" element={<AddCustomer />} />
        <Route path="/admin/customers/getOneCustomer" element={<GetOneCustomer />} />
        <Route path="/admin/customer/update/:id" element={<UpdateCustomer />} />
        <Route path="/admin/customer/delete/:id" element={<DeleteCustomer />} />

        <Route path="/companies/coupons/" element={<CompaniesCoupons />} />
        <Route path="/companies/addCoupon/" element={<AddCoupon />} />
        <Route path="/companies/getCompanyDetails/" element={<CompanyDetails />} />
        <Route path="/companies/getCouponByCategory/" element={<GetCouponByCategory />} />
        <Route path="/companies/getCouponByPrice/" element={<GetCouponByPrice />} />
        <Route path="/companies/coupons/update/:id" element={<UpdateCoupon />} />
        <Route path="/companies/coupons/delete/:id" element={<DeleteCoupon />} />

        <Route path="/customers/coupons/customerId/" element={<CustomerCouponList />} />
        <Route path="/customers/coupons/" element={<CouponsToBuyList />} />
        <Route path="/customers/coupons/toBuy/:id" element={<BuyCoupon />} />
        <Route path="/customers/getCustomerDetails/" element={<CustomerDetails />} />

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="logout" element={<Logout />} />

        <Route
          path="donate"
          element={<Donate to={"or"} bank={12} branch={644} account={123455} />}
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
};

export default Routing;
