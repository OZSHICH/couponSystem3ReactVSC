import { useNavigate, useParams } from "react-router-dom";
import { couponsDeletedAction } from "../../../Redux/CouponsAppState";
import { customersDeletedAction } from "../../../Redux/CustomerAppState";
import store from "../../../Redux/Store";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import "./DeleteCustomer.css";

function DeleteCustomer(): JSX.Element {
  const navigate = useNavigate();
  const params = useParams();
  const customerId = +(params.id || 0);
  const id = customerId;

  const toDelete = () => {
    web
      .deleteCustomer(id)
      .then((res) => {
        notify.success(SccMsg.DELETE_CUSTOMER);
        navigate("/admin/customers/");
        //Update App State(Global State)
        store.dispatch(customersDeletedAction(id));
      })
      .catch((err) => {
        notify.error(ErrMsg.CUSTOMER_NOT_FOUND);
        navigate("/admin/customers/");
      });
  };

  const notDelete = () => {
    navigate("/admin/customers/");
  };
  return (
    <div className="DeleteTodo flex-col-top-center">
      <h1>Delete Customer</h1>
      <h3>Are You Sure You Want To Delete Customer #{id}</h3>
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

export default DeleteCustomer;
