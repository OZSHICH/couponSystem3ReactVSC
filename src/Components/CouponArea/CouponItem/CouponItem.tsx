import moment from "moment";
import { useState } from "react";
import {
  BsFillBrushFill,
  BsFillCalendarXFill,
  BsFillPencilFill,
  BsFillXSquareFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { CouponModel } from "../../../Models/CouponModel";
import "./CouponItem.css";

interface CouponItemProps {
  coupon: CouponModel;
}

function CouponItem(props: CouponItemProps): JSX.Element {
  const [id, setId] = useState<number>(props.coupon.id || 0);

  const updateCoupon = (id: number) => {
    window.alert("going to update coupon " + id);
  };

  const deleteCoupon = (id: number) => {
    window.alert("going to delete coupon " + id);
  };

  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src="https://picsum.photos/300" alt="Avatar" />
        </div>
        <div className="flip-card-back">
          <h1>{props.coupon.title}</h1>
          {/* <p>{props.coupon.company.name}</p> */}
          <p>{props.coupon.category}</p>
          <p>{props.coupon.image}</p>
          <p className="date">
            {moment(props.coupon.startDate).format("DD/MM/YYYY")}||
            {moment(props.coupon.endDate).format("DD/MM/YYYY")}
          </p>
          <p>{"Amount " + props.coupon.amount}</p>
          <p>{"Price " + props.coupon.price}</p>
          <p>{props.coupon.description}</p>
          <div className="buttons">
            {/* <button onClick={()=>deleteTask(props.task.id || 0)}><FaTrash size={42} /> </button> */}
            {/* <button onClick={()=>updateTask(props.task.id || 0)}><FaEdit size={42} /></button> */}
            <Link className="link" to={`/companies/coupons/update/${props.coupon.id}`}>
              <BsFillPencilFill size={42} />
            </Link>
            <Link
              className="delete-coupon-link"
              to={`/companies/coupons/delete/${props.coupon.id}`}
            >
              <BsFillXSquareFill size={42} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CouponItem;
