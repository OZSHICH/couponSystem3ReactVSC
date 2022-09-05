import { useState, useEffect } from "react";
import { CustomerModel } from "../../../Models/CustomerModel";
import { companiesDownloadedAction } from "../../../Redux/CompanyAppState";
import { customersDownloadedAction } from "../../../Redux/CustomerAppState";
import store from "../../../Redux/Store";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import CustomerDetailsItem from "../CustomerDetailsItem/CustomerDetailsItem";
import "./CustomerDetails.css";

function CustomerDetails(): JSX.Element {
  const [customerDetails, setCustomerDetails] = useState<CustomerModel>(new CustomerModel());

  useEffect(() => {
    web
      .getCustomerDetails()
      .then((res) => {
        notify.success(SccMsg.CUSTOMER_DETAILS);
        setCustomerDetails(res.data);
        customersDownloadedAction(res.data);
      })
      .catch((err) => {
        notify.error(ErrMsg.CUSTOMER_NOT_FOUND);
      });
  }, []);
  return (
    <div className="CustomerDetails flex-col-top-center">
      <h1>Customer Details</h1>
      <div className="flex-row-none-wrap-list">
        {store.getState().authReducer.user?.token !== undefined ? (
          <CustomerDetailsItem customer={customerDetails} />
        ) : (
          //tasks.map((t) => <ToDoItem key={t.id} task={t} />)
          <EmptyView msg="No Details Available, Have Fun!" />
        )}
      </div>
    </div>
  );
}

export default CustomerDetails;
