import { SetStateAction, useState } from "react";
import { CustomerModel } from "../../../Models/CustomerModel";
import web from "../../../Services/WebApi";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import "./GetOneCustomer.css";
import store from "../../../Redux/Store";
import { customersDownloadedAction } from "../../../Redux/CustomerAppState";
import CustomerDetailsItem from "../../CustomerArea/CustomerDetailsItem/CustomerDetailsItem";
import { error } from "console";

function GetOneCustomer(): JSX.Element {
  const [idx, setIdx] = useState<number>(/* 0 */);
  const [customer, setCustomer] = useState(new CustomerModel());

  let handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    web
      .getSingleCustomer(+e.target.value.toString())
      .then((res) => {
        notify.success(SccMsg.SINGLE_CUSTOMER);
        setCustomer(res.data);
        //store.dispatch(customersDownloadedAction(res.data));
      })
      .catch((err) => {
        notify.error(ErrMsg.CUSTOMER_NOT_FOUND);
      });
  };

  return (
    <div className="GetOneCustomer flex-col-top-center">
      <h1>Search</h1>
      <input type="number" placeholder="Search" onChange={handleChange} value={idx} />
      <br />
      {customer.firstName?.length > 0 ? (
        <CustomerDetailsItem key={customer.id} customer={customer} />
      ) : (
        <h1>Pick Customer Id</h1>
      )}
    </div>
  );
}

export default GetOneCustomer;
