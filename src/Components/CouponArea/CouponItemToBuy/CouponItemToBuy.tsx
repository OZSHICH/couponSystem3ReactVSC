import moment from "moment";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { BsBagPlusFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CouponModel } from "../../../Models/CouponModel";
import { couponsAddedAction } from "../../../Redux/CouponsAppState";
import store from "../../../Redux/Store";
import notify, { SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import "./CouponItemToBuy.css";

interface CouponItemToBuyProps {
  coupon: CouponModel;
}

function CouponItemToBuy(props: CouponItemToBuyProps): JSX.Element {
  const [id, setId] = useState<number>(props.coupon.id || 0);
  /* const navigate = useNavigate();
  const params = useParams();
  const couponId = +(params.id || 0);
  const id = couponId; */

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<CouponModel>({ mode: "all" });

  /*   const buyCoupon = async (coupon: CouponModel) => {
    web
      .purchaseCoupon(id)
      .then((res) => {
        notify.success(SccMsg.PURCHASE_COUPON);
        store.dispatch(couponsAddedAction(res.data));
        navigate("/customers/coupons/");
      })
      .catch((err) => {
        notify.error(err.message);
      });
  };

  const notBuy = () => {
    navigate("/customers/coupons/");
  }; */

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
          <div className="buy-coupon-buttons">
            <Link className="buy-coupon-link" to={`/customers/coupons/toBuy/${props.coupon.id}`}>
              <BsBagPlusFill size={42} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CouponItemToBuy;
