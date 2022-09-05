import { useState, SetStateAction } from "react";
import { CompanyModel } from "../../../Models/CompanyModel";
import { companiesDownloadedAction } from "../../../Redux/CompanyAppState";
import store from "../../../Redux/Store";
import notify, { SccMsg, ErrMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import CompanyDetailsItem from "../../CompanyArea/CompanyDetailsItem/CompanyDetailsItem";
import CustomerDetailsItem from "../../CustomerArea/CustomerDetailsItem/CustomerDetailsItem";
import "./GetOneCompany.css";

function GetOneCompany(): JSX.Element {
  const [idx, setIdx] = useState<number>(/* 0 */);
  const [company, setCompany] = useState<CompanyModel>(new CompanyModel());

  let handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    web
      .getSingleCompany(+e.target.value.toString())
      .then((res) => {
        notify.success(SccMsg.SINGLE_COMPANY);
        setCompany(res.data);
        //store.dispatch(companiesDownloadedAction(res.data));
      })
      .catch((err) => {
        notify.error(ErrMsg.COMPANY_NOT_FOUND);
      });
  };

  return (
    <div className="GetOneCompany flex-col-top-center">
      <h1>Search</h1>
      <input type="number" placeholder="Search" onChange={handleChange} value={idx} />
      <br />
      {company.name?.length > 0 ? (
        <CompanyDetailsItem key={company.id} company={company} />
      ) : (
        <h1>Pick Company Id</h1>
      )}
    </div>
  );
}

export default GetOneCompany;
