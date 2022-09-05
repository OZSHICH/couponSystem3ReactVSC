import { useState } from "react";
import { BsFillBrushFill, BsFillCalendarXFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { CompanyModel } from "../../../Models/CompanyModel";
import "./CompanyItem.css";

interface CompanyItemProps {
  company: CompanyModel;
}

function CompanyItem(props: CompanyItemProps): JSX.Element {
  const [id, setId] = useState<number>(props.company.id || 0);

  const updateCompany = (id: number) => {
    window.alert("going to update company " + id);
  };

  const deleteCompany = (id: number) => {
    window.alert("going to delete company " + id);
  };
  return (
    <div className="CompanyItem">
      <h2 className="single-line">{props.company.name}</h2>
      <div className="card">
        <p className="flex-center">{props.company.email}</p>
        <p className="flex-center">{props.company.password}</p>
        <p className="button-card">
          <Link className="link" to={`update/${props.company.id}`}>
            <BsFillBrushFill />
          </Link>
          <Link className="link" to={`delete/${props.company.id}`}>
            <BsFillCalendarXFill />
          </Link>
        </p>
      </div>
    </div>
  );
}

export default CompanyItem;
