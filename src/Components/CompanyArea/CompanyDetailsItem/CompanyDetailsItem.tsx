import { useState } from "react";
import { CompanyModel } from "../../../Models/CompanyModel";
import "./CompanyDetailsItem.css";
interface CompanyDetailsItemProps {
  company: CompanyModel;
}

function CompanyDetailsItem(props: CompanyDetailsItemProps): JSX.Element {
  return (
    <div className="CompanyDetailsItem details-item">
      <p>ID: {props.company.id}</p>
      <p>Full Name: {props.company.name}</p>
      <p>Email: {props.company.email}</p>
    </div>
  );
}

export default CompanyDetailsItem;
