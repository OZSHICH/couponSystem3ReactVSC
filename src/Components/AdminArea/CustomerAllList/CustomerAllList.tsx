import { useState, useEffect } from "react";
import { BsFillCalendarPlusFill, BsFillExclamationSquareFill, BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { CustomerModel } from "../../../Models/CustomerModel";
import { customersDownloadedAction } from "../../../Redux/CustomerAppState";
import store from "../../../Redux/Store";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import CustomerItem from "../CustomerItem/CustomerItem";
import "./CustomerAllList.css";

function CustomerAllList(): JSX.Element {
  const [customers, setCustomers] = useState<CustomerModel[]>(
    store.getState().customersReducer.customers
  );
  const customersElements = customers.map((c) => <CustomerItem key={c.id} customer={c} />);

  useEffect(() => {
    if (store.getState().authReducer.user?.token !== undefined) {
      web
        .getAllCustomers()
        .then((res) => {
          setCustomers(res.data);
          notify.success(SccMsg.ALL_CUSTOMERS);
          store.dispatch(customersDownloadedAction(res.data));
        })
        .catch((err) => {
          notify.error(ErrMsg.CUSTOMER_NOT_FOUND);
        });
    }
  }, []);
  return (
    <div className="CustomersList flex-col-top-center">
      <h1>Customer List</h1>
      <p className="List CustomerListAdd">
        {/* To Add Customer
        <Link className="link" to="/admin/customers/add">
          <BsFillCalendarPlusFill size={45} />
        </Link> */}
        Get One Customer
        <Link className="link" to="/admin/customers/getOneCustomer">
          <BsFillExclamationSquareFill size={45} />
        </Link>
      </p>

      <div className="flex-row-none-wrap-list">
        {customers.length > 0 ? (
          customersElements
        ) : (
          <EmptyView msg="No Customers For You, Have Fun!" />
        )}
      </div>
    </div>
  );
}

export default CustomerAllList;
