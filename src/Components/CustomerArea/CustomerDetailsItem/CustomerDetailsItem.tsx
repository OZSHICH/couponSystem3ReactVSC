import { CustomerModel } from "../../../Models/CustomerModel";
import "./CustomerDetailsItem.css";

interface CustomerDetailsItemProps {
  customer: CustomerModel;
}

function CustomerDetailsItem(props: CustomerDetailsItemProps): JSX.Element {
  return (
    <div className="CustomerDetailsItem details-item">
      <p>ID: {props.customer.id}</p>
      <p>
        Full Name: {props.customer.firstName} {props.customer.lastName}
      </p>
      <p>Email: {props.customer.email}</p>
    </div>
  );
}

export default CustomerDetailsItem;
