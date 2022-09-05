import { useState, useEffect } from "react";
import { CompanyModel } from "../../../Models/CompanyModel";
import { couponsDownloadedAction } from "../../../Redux/CouponsAppState";
import store from "../../../Redux/Store";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import CompanyItem from "../CompanyItem/CompanyItem";
import "./CompaniesList.css";

function CompaniesList(): JSX.Element {
  const [companies, setCompanies] = useState<CompanyModel[]>(
    store.getState().companiesReducer.companies
  );

  const companiesElements = companies.map((c) => <CompanyItem key={c.id} company={c} />);

  useEffect(() => {
    if (companies?.length === 0) {
      web
        .getAllCompanies()
        .then((res) => {
          setCompanies(res.data);
          store.dispatch(couponsDownloadedAction(res.data));
          notify.success(SccMsg.ALL_COUPONS);
        })
        .catch((err) => {
          notify.error(ErrMsg.COMPANY_NOT_FOUND);
        });
    }
  }, []);
  return (
    <div className="CompaniesList flex-col-top-center">
      <h1>Companies List</h1>
      <p className="List CompaniesListAdd">
        {/*  To Add Coupon
          <Link className="link" to="add">
            <BsFillCalendarPlusFill size={45} />
          </Link> */}
      </p>

      <div className="flex-row-none-wrap-list">
        {companies.length > 0 ? (
          companiesElements
        ) : (
          //tasks.map((t) => <ToDoItem key={t.id} task={t} />)
          <EmptyView msg="No Companies For You, Have Fun!" />
        )}
      </div>
    </div>
  );
}

export default CompaniesList;
