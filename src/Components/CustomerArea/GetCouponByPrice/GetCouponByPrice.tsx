import { useState, SetStateAction, useEffect } from "react";
import { CouponModel } from "../../../Models/CouponModel";
import { couponsDownloadedAction } from "../../../Redux/CouponsAppState";
import store from "../../../Redux/Store";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import CouponItem from "../../CouponArea/CouponItem/CouponItem";
import "./GetCouponByPrice.css";

function GetCouponByPrice(): JSX.Element {
  const getInitialState = () => {
    const value = 0;
    return value;
  };
  const [value, setValue] = useState(getInitialState);
  const [coupons, setCoupons] = useState<CouponModel[]>(
    store.getState().couponsReducer.coupons.filter((c) => c.price === value)
  );
  let handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setValue(+e.target.value);
    const val: number = +e.target.value;
    setCoupons(store.getState().couponsReducer.coupons.filter((c) => c.price <= val));
  };

  useEffect(() => {
    web
      .getCompanyCoupons()
      .then((res) => {
        notify.success(SccMsg.ALL_COUPONS);
        // Update Component State (Local state)
        setCoupons(store.getState().couponsReducer.coupons.filter((c) => c.price <= value));
        // Update App State (Global State)
        store.dispatch(couponsDownloadedAction(res.data));
      })
      .catch((err) => {
        notify.error(ErrMsg.COUPON_NOT_FOUND);
      });
  }, []);

  return (
    <div className="CouponsList flex-col-top-center">
      <h1>Company Coupons List</h1>
      <h1>Choose A Category</h1>
      <br />
      <input type="number" value={value} onChange={handleChange}></input>
      <h1>{`You selected ${value}`}</h1>
      <div className="flex-row-none-wrap-list">
        {coupons.length > 0 ? (
          coupons.map((c) => <CouponItem key={c.id} coupon={c} />)
        ) : (
          <h1>no coupons yet</h1>
        )}
      </div>
    </div>
  );
}

export default GetCouponByPrice;
