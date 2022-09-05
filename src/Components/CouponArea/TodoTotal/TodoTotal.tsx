import { log } from "console";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import store from "../../../Redux/Store";
import notify, { ErrMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import Circle from "../../SharedArea/Circle/Circle";
import "./TodoTotal.css";

function TotalCoupons(): JSX.Element {
  const [num, setNum] = useState(store.getState().couponsReducer.coupons.length);

  /*   const countTask = notify.success(
    "You Have: " + store.getState().tasksReducer.tasks.length + " Tasks" 
  );*/
  useEffect(() => {
    if (num === 0) {
      web
        .countCoupon()
        .then((res) => {
          setNum(res.data);
          //notify.success("You Have: " + store.getState().tasksReducer.tasks.length + " Tasks");
        })
        .catch((err) => {});
    }

    return store.subscribe(() => {
      setNum(store.getState().couponsReducer.coupons.length);
    });
  }, [num]);
  return (
    <div className="TotalCoupons">
      <Circle num={num}></Circle>
    </div>
  );
}

export default TotalCoupons;
