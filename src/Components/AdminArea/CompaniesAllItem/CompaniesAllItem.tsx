import { useState } from "react";
import { BsFillBrushFill, BsFillCalendarXFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { CompanyModel } from "../../../Models/CompanyModel";
import "./CompaniesAllItem.css";

interface CompaniesItemProps {
  company: CompanyModel;
}

function CompaniesAllItem(props: CompaniesItemProps): JSX.Element {
  const [id, setId] = useState<number>(props.company.id || 0);

  const updateCompany = (id: number) => {
    window.alert("Going To Update Company " + id);
  };

  const deleteCompany = (id: number) => {
    window.alert("Going To Delete Company " + id);
  };

  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src="https://picsum.photos/300" alt="Avatar" />
        </div>
        <div className="flip-card-back">
          <p>{props.company.name}</p>
          <p>{props.company.email}</p>
          <p>{props.company.password}</p>
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
            <Link className="link" to={`/admin/companies/update/${props.company.id}`}>
              <BsFillBrushFill size={42} />
            </Link>
            <Link
              className="delete-company-link"
              to={`/admin/companies/delete/${props.company.id}`}
            >
              <BsFillCalendarXFill size={42} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompaniesAllItem;
