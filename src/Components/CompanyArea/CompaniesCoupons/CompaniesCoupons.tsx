import { useState, useEffect } from "react";
import {
  BsFillArchiveFill,
  BsFillCalendarPlusFill,
  BsFillTagsFill,
  BsPlusSquareFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { CompanyModel } from "../../../Models/CompanyModel";
import { CouponModel } from "../../../Models/CouponModel";
import { couponsDownloadedAction } from "../../../Redux/CouponsAppState";
import store from "../../../Redux/Store";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import CouponItem from "../../CouponArea/CouponItem/CouponItem";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import "./CompaniesCoupons.css";

function CompaniesCoupons(): JSX.Element {
  const [coupons, setCoupons] = useState<CouponModel[]>(store.getState().couponsReducer.coupons);

  const couponsElements = coupons.map((c) => <CouponItem key={c.id} coupon={c} />);

  useEffect(() => {
    if (coupons?.length === 0) {
      web
        .getCompanyCoupons()
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
      <h1>Company Coupons List</h1>
      <p className="List CouponsListAdd">
        To Add Coupon
        <Link className="link" to="/companies/addCoupon/">
          <BsPlusSquareFill size={45} />
        </Link>
        Get Coupons By Category
        <Link className="link" to="/companies/getCouponByCategory/">
          <BsFillArchiveFill size={45} />
        </Link>
        Get Coupons By Price
        <Link className="link" to="/companies/getCouponByPrice/">
          <BsFillTagsFill size={45} />
        </Link>
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
export default CompaniesCoupons;
