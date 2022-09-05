import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CompanyModel } from "../../../Models/CompanyModel";
import { CustomerModel } from "../../../Models/CustomerModel";
import { companiesDownloadedAction } from "../../../Redux/CompanyAppState";
import { customersDownloadedAction } from "../../../Redux/CustomerAppState";
import store from "../../../Redux/Store";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import CompanyDetailsItem from "../CompanyDetailsItem/CompanyDetailsItem";
import "./CompanyDetails.css";

function CompanyDetails(): JSX.Element {
  const [companyDetails, setCompanyDetails] = useState<CompanyModel>(new CompanyModel());

  useEffect(() => {
    web
      .getDetails()
      .then((res) => {
        notify.success(SccMsg.COMPANY_DETAILS);
        setCompanyDetails(res.data);
        companiesDownloadedAction(res.data);
      })
      .catch((err) => {
        notify.error(ErrMsg.COMPANY_NOT_FOUND);
      });
  }, []);
  return (
    <div className="Details flex-col-top-center">
      <h1>Company Details</h1>
      <div className="flex-row-none-wrap-list">
        {store.getState().authReducer.user?.token !== undefined ? (
          <CompanyDetailsItem company={companyDetails} />
        ) : (
          //tasks.map((t) => <ToDoItem key={t.id} task={t} />)
          <EmptyView msg="No Details Available, Have Fun!" />
        )}
      </div>
    </div>
  );
}

export default CompanyDetails;
