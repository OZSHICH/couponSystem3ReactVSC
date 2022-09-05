import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import store from "../../../Redux/Store";
import {} from "../../../Redux/CouponsAppState";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import "./DeleteCompany.css";
import { companiesDeletedAction } from "../../../Redux/CompanyAppState";

function DeleteCompany(): JSX.Element {
  const navigate = useNavigate();
  const params = useParams();
  const companyId = +(params.id || 0);
  const id = companyId;

  const toDelete = () => {
    web
      .deleteCompany(id)
      .then((res) => {
        notify.success(SccMsg.DELETE_COMPANY);
        navigate("/admin/companies");
        //Update App State(Global State)
        store.dispatch(companiesDeletedAction(id));
      })
      .catch((err) => {
        notify.error(ErrMsg.COMPANY_NOT_FOUND);

        navigate("/admin/companies/");
      });
  };

  const notDelete = () => {
    navigate("admin/companies");
  };
  return (
    <div className="DeleteTodo flex-col-top-center">
      <h1>Delete Company</h1>
      <h3>Are You Sure You Want To Delete Company #{id}</h3>
      <div className="flex-row">
        <button className="button-danger" onClick={toDelete}>
          YES
        </button>
        <button className="button" onClick={notDelete}>
          NO
        </button>
      </div>
    </div>
  );
}

export default DeleteCompany;
