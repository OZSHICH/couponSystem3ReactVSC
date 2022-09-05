import moment from "moment";
import { useEffect, useState } from "react";
import { BsFillBrushFill, BsFillCalendarXFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { CustomerModel } from "../../../Models/CustomerModel";
import store from "../../../Redux/Store";
import "./CustomerItem.css";

interface CustomerItemProps {
  customer: CustomerModel;
}

function CustomerItem(props: CustomerItemProps): JSX.Element {
  /*   const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(
    store.getState().authReducer.user?.clientType === "CUSTOMER"
  );
  const [isCompanyLoggedIn, setIsCompanyLoggedIn] = useState(
    store.getState().authReducer.user?.clientType === "COMPANY"
  );
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    store.getState().authReducer.user?.clientType === "ADMINISTRATOR"
  );

  useEffect(() => {
    return store.subscribe(() => {
      setIsCustomerLoggedIn(store.getState().authReducer.user?.clientType === "CUSTOMER");
      setIsCompanyLoggedIn(store.getState().authReducer.user?.clientType === "COMPANY");
      setIsAdminLoggedIn(store.getState().authReducer.user?.clientType === "ADMINISTRATOR");
    });
  }, []); */

  const [id, setId] = useState<number>(props.customer.id || 0);

  const updateCustomer = (id: number) => {
    window.alert("Going To Update Customer " + id);
  };

  const deleteCustomer = (id: number) => {
    window.alert("Going To Delete Customer " + id);
  };

  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src="https://picsum.photos/300" alt="Avatar" />
        </div>
        <div className="flip-card-back">
          <div>
            <p>
              {props.customer.firstName} {props.customer.lastName}
            </p>
            <p>{props.customer.email}</p>
            <p>{props.customer.password}</p>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className="buttons">
            {/* <button onClick={()=>deleteTask(props.task.id || 0)}><FaTrash size={42} /> </button> */}
            {/* <button onClick={()=>updateTask(props.task.id || 0)}><FaEdit size={42} /></button> */}

            {/* {isCustomerLoggedIn ? (
        <>
          <div className="flex-around-menu">
          <Link className="link" to={`/admin/customer/update/${props.customer.id}`}>
              <BsFillBrushFill size={42} />
            </Link>
            <Link className="link" to={`/admin/customer/delete/${props.customer.id}`}>
              <BsFillCalendarXFill size={42} />
            </Link>
          </div>
        </>
      ) : (
        <></>
      )}

      {isCompanyLoggedIn ? (
        <>
          <div className="flex-around-menu">
          
          </div>
        </>
      ) : (
        <></>
      )}

      {isAdminLoggedIn ? (
        <>
          <div className="flex-around-menu">
           
          </div>
          <div>

          </div>
        </>
      ) : (
        <>

        </>
      )} */}

            <Link className="link" to={`/admin/customer/update/${props.customer.id}`}>
              <BsFillBrushFill size={42} />
            </Link>
            <Link
              className="delete-customer-link"
              to={`/admin/customer/delete/${props.customer.id}`}
            >
              <BsFillCalendarXFill size={42} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerItem;
