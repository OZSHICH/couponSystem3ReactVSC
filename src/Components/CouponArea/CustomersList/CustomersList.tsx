import { useState, useEffect } from "react";
import { BsFillCalendarPlusFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { CustomerModel } from "../../../Models/CustomerModel";
import { customersDownloadedAction } from "../../../Redux/CustomerAppState";
import store from "../../../Redux/Store";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import CustomerItem from "../../AdminArea/CustomerItem/CustomerItem";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import "./CustomersList.css";

function CustomersList(): JSX.Element {
  const [customers, setCustomers] = useState<CustomerModel[]>([]);
  const customersElements = customers.map((c) => <CustomerItem key={c.id} customer={c} />);

  useEffect(() => {
    web
      .getAllCustomers()
      .then((res) => {
        notify.success(SccMsg.ALL_CUSTOMERS);
        setCustomers(res);
        store.dispatch(customersDownloadedAction(res.data));
      })
      .catch((err) => {
        notify.error(ErrMsg.CUSTOMER_NOT_FOUND);
      });
  }, []);
  return (
    <div className="CustomersList">
      <h1>Customer List</h1>
      <p className="List Listadd">
        To Add Customer
        <Link className="link" to="add">
          <BsFillCalendarPlusFill size={45} />
        </Link>
      </p>

      <div className="flex-row-none-wrap-list">
        {customers.length > 0 ? customersElements : <EmptyView msg="No Tasks For You, Have Fun!" />}
      </div>
    </div>
  );
}

export default CustomersList;
