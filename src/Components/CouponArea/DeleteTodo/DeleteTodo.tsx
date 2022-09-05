import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { couponsDeletedAction } from "../../../Redux/CouponsAppState";
import store from "../../../Redux/Store";

import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import "./DeleteTodo.css";

function DeleteTodo(): JSX.Element {
  const navigate = useNavigate();
  const params = useParams();
  const couponId = +(params.id || 0);

  const [id, setId] = useState<number>(couponId);
  //const id = taskId;

  const toDelete = () => {
    web
      .deleteCoupon(id)
      .then((res) => {
        notify.success(SccMsg.DELETE_COUPON);
        navigate("/allCoupons");
        //Update App State(Global State)
        store.dispatch(couponsDeletedAction(id));
      })
      .catch((err) => {
        notify.error(ErrMsg.COMPANY_NOT_FOUND);
        //console.log(err);
        //console.log(err.message);
        navigate("/tasks");
      });
  };

  const notDelete = () => {
    navigate("/tasks");
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

export default DeleteTodo;

/* const navigate = useNavigate();
const params = useParams();
const taskId = +(params.id || 0); */
/* 
/*   useEffect(() => {
  // If we don't have a user object - we are not logged in
  if (!store.getState().authReducer.user.token) {
    console.log(store.getState().authReducer.user);
    notify.error(ErrMsg.PLS_LOGIN);
    navigate("/login");
  }
}, []); */
//const [id, setId] = useState<number>(taskId);
/*const id = taskId;

const toDelete = () => {
  web
    .deleteTask(id)
    .then((res) => {
      notify.success(SccMsg.DELETE_TASK);
      //Update App State(Global State)
      store.dispatch(tasksDeletedAction(id));
      navigate("/tasks");
    })
    .catch((err) => {
      notify.error(err);
      console.log(err);
      console.log(err.message);
      navigate("/tasks");
    });
};

const notDelete = () => {
  navigate("/tasks");
}; */
