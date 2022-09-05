import { useNavigate, useParams } from "react-router-dom";
import { CouponModel } from "../../../Models/CouponModel";
import { couponsAddedAction } from "../../../Redux/CouponsAppState";
import store from "../../../Redux/Store";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import "./BuyCoupon.css";

function BuyCoupon(): JSX.Element {
  const navigate = useNavigate();
  const params = useParams();
  const couponId = +(params.id || 0);
  const id = couponId;

  const buyCoupon = () => {
    web
      .purchaseCoupon(couponId)
      .then((res) => {
        notify.success(SccMsg.PURCHASE_COUPON);
        store.dispatch(couponsAddedAction(res.data));
        navigate("/customers/coupons/");
      })
      .catch((err) => {
        notify.error(ErrMsg.COUPON_ALREADY_PURCHASED);
        navigate("/customers/coupons/");
      });
  };

  const notBuy = () => {
    navigate("/customers/coupons/");
  };

  return (
    <div className="buyCoupon flex-col-top-center">
      <h1>Buy Coupon</h1>
      <h3>Are You Sure You Want To Buy Coupon #{id}</h3>
      <div className="flex-row">
        <button className="button-success" onClick={buyCoupon}>
          YES
        </button>
        <button className="button" onClick={notBuy}>
          NO
        </button>
      </div>
    </div>
  );
}

export default BuyCoupon;
