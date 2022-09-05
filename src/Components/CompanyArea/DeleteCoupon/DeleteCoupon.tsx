import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { couponsDeletedAction } from "../../../Redux/CouponsAppState";
import store from "../../../Redux/Store";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import "./DeleteCoupon.css";

function DeleteCoupon(): JSX.Element {
  const navigate = useNavigate();
  const params = useParams();
  const couponId = +(params.id || 0);

  //const [id, setId] = useState<number>(couponId);
  const id = couponId;

  const toDelete = () => {
    web
      .deleteCoupon(id)
      .then((res) => {
        notify.success(SccMsg.DELETE_COUPON);
        navigate("/companies/coupons/");
        //Update App State(Global State)
        store.dispatch(couponsDeletedAction(id));
      })
      .catch((err) => {
        notify.error(ErrMsg.COUPON_NOT_FOUND);
        //console.log(err);
        //console.log(err.message);
        navigate("/companies/coupons/");
      });
  };

  const notDelete = () => {
    navigate("/companies/coupons/");
  };
  return (
    <div className="DeleteTodo flex-col-top-center">
      <h1>Delete Coupon</h1>
      <h3>Are you sure you want to delete coupon #{id}</h3>
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

export default DeleteCoupon;
