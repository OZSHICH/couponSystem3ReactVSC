import { useState, useEffect } from "react";
import { CouponModel } from "../../../Models/CouponModel";
import { couponsDownloadedAction } from "../../../Redux/CouponsAppState";
import store from "../../../Redux/Store";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import CouponItem from "../../CouponArea/CouponItem/CouponItem";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import CompanyCouponItem from "../CompanyCouponItem/CompanyCouponItem";
import "./CompanyCouponList.css";

function CompanyCouponList(): JSX.Element {
  const [coupons, setCoupons] = useState<CouponModel[]>(store.getState().couponsReducer.coupons);

  const couponsElements = coupons.map((c) => <CompanyCouponItem key={c.id} coupon={c} />);

  useEffect(() => {
    if (coupons?.length === 0) {
      web
        .getAllCoupons()
        .then((res) => {
          setCoupons(res.data);
          store.dispatch(couponsDownloadedAction(res.data));
          notify.success(SccMsg.ALL_COUPONS);
        })
        .catch((err) => {
          notify.error(ErrMsg.COUPON_NOT_FOUND);
        });
    }
  }, []);
  return (
    <div className="CouponsList flex-col-top-center">
      <h1>Your Coupons List</h1>
      <p className="List CouponsListAdd">
        {/*  To Add Coupon
          <Link className="link" to="add">
            <BsFillCalendarPlusFill size={45} />
          </Link> */}
      </p>

      <div className="flex-row-none-wrap-list">
        {coupons.length > 0 ? (
          couponsElements
        ) : (
          //tasks.map((t) => <ToDoItem key={t.id} task={t} />)
          <EmptyView msg="No Coupons For You, Have Fun!" />
        )}
      </div>
    </div>
  );
}
export default CompanyCouponList;
