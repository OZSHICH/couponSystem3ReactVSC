import { useState, useEffect } from "react";
import { BsFillCalendarPlusFill, BsFillExclamationSquareFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { CompanyModel } from "../../../Models/CompanyModel";
import { companiesDownloadedAction } from "../../../Redux/CompanyAppState";
import { customersDownloadedAction } from "../../../Redux/CustomerAppState";
import store from "../../../Redux/Store";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import CompaniesAllItem from "../CompaniesAllItem/CompaniesAllItem";
import "./CompaniesAllList.css";

function CompaniesAllList(): JSX.Element {
  const [companies, setCompanies] = useState<CompanyModel[]>(
    store.getState().companiesReducer.companies
  );

  const companiesElements = companies?.map((c) => <CompaniesAllItem key={c.id} company={c} />);

  useEffect(() => {
    if (store.getState().authReducer.user?.token !== undefined) {
      web
        .getAllCompanies()
        .then((res) => {
          setCompanies(res.data);
          store.dispatch(companiesDownloadedAction(res.data));
          notify.success(SccMsg.ALL_COMPANIES);
        })
        .catch((err) => {
          notify.error(ErrMsg.COMPANY_NOT_FOUND);
        });
    }
  }, []);
  return (
    <div className="CompaniesList flex-col-top-center">
      <h1>Company List</h1>
      <p className="List CompanyListAdd">
        To Add Company
        <Link className="link" to="/admin/companies/add">
          <BsFillCalendarPlusFill size={45} />
        </Link>
        Get One Company
        <Link className="link" to="/admin/companies/getOneCompany/">
          <BsFillExclamationSquareFill size={45} />
        </Link>
      </p>

      <div className="flex-row-none-wrap-list">
        {companies.length > 0 ? (
          companiesElements
        ) : (
          <EmptyView msg="No Companies For You, Have Fun!" />
        )}
      </div>
    </div>
  );
}

export default CompaniesAllList;
