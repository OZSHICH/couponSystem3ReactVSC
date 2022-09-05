import { useState } from "react";
import { Link } from "react-router-dom";
import "./FlipCard.css";
import { BsFillBrushFill, BsFillCalendarXFill } from "react-icons/bs";
import moment from "moment";
import { CouponModel } from "../../../Models/CouponModel";

interface FlipCardProps {
  coupon: CouponModel;
}
function FlipCard(props: FlipCardProps): JSX.Element {
  const [id, setId] = useState<number>(props.coupon.id || 0);

  const updateCoupon = (id: number) => {
    window.alert("going to update " + id);
  };

  const deleteCoupon = (id: number) => {
    window.alert("going to delete " + id);
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
            {moment(props.coupon.startDate).format("DD/MM/YYYY HH:mm")}||
            {moment(props.coupon.endDate).format("DD/MM/YYYY HH:mm")}
          </p>
          <p>
            {props.coupon.amount}||{props.coupon.price}
          </p>
          <p>{props.coupon.description}</p>
          <p>{props.coupon.price}</p>
          <div className="buttons">
            {/* <button onClick={()=>deleteTask(props.task.id || 0)}><FaTrash size={42} /> </button> */}
            {/* <button onClick={()=>updateTask(props.task.id || 0)}><FaEdit size={42} /></button> */}
            <Link className="link" to={`/coupons/update/${props.coupon.id}`}>
              <BsFillBrushFill size={42} />
            </Link>
            <Link className="link" to={`/coupons/delete/${props.coupon.id}`}>
              <BsFillCalendarXFill size={42} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/*   return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src="https://picsum.photos/300" alt="Avatar" />
        </div>
        <div className="flip-card-back">
          <h1>{props.task.caption}</h1>
          <p>{props.task.info}</p>
          <p>{props.task.classification}</p>
          <p className="date">{moment(props.task.dueDate).format("DD/MM/YYYY HH:mm")}</p>
          <div className="buttons"> */
{
  /* <button onClick={()=>deleteTask(props.task.id || 0)}><FaTrash size={42} /> </button> */
}
{
  /* <button onClick={()=>updateTask(props.task.id || 0)}><FaEdit size={42} /></button> */
}
/*             <Link className="link" to={`/tasks/update/${props.task.id}`}>
              <BsFillBrushFill size={42} />
            </Link>
            <Link className="link" to={`/tasks/delete/${props.task.id}`}>
              <BsFillCalendarXFill size={42} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} */

export default FlipCard;
