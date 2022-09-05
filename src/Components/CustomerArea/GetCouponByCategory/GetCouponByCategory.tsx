import { SetStateAction, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CompanyModel } from "../../../Models/CompanyModel";
import { Category, CouponModel } from "../../../Models/CouponModel";
import { couponsDownloadedAction } from "../../../Redux/CouponsAppState";
import store from "../../../Redux/Store";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import CouponItem from "../../CouponArea/CouponItem/CouponItem";
import "./GetCouponByCategory.css";

function GetCouponByCategory(): JSX.Element {
  const getInitialState = () => {
    const value = "Food";
    return value;
  };

  const [value, setValue] = useState(getInitialState);
  const [coupons, setCoupons] = useState<CouponModel[]>(
    store.getState().couponsReducer.coupons.filter((c) => c.category === "Food")
  );
  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setValue(e.target.value);
    const val: string = e.target.value.toString();
    setCoupons(store.getState().couponsReducer.coupons.filter((c) => c.category === val));
  };

  useEffect(() => {
    web
      .getCompanyCoupons()
      .then((res) => {
        notify.success(SccMsg.ALL_COUPONS);
        // Update Component State (Local state)
        setCoupons(store.getState().couponsReducer.coupons.filter((c) => c.category === "Food"));
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
      <select value={value} onChange={handleChange}>
        <option value="Food">Food</option>
        <option value="Electricity">Electricity</option>
        <option value="Restaurant">Restaurant</option>
        <option value="Vacation">Vacation</option>
      </select>
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
export default GetCouponByCategory;
