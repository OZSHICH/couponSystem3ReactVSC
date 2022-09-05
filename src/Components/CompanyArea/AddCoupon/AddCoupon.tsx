import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import { useNavigate } from "react-router-dom";
import web from "../../../Services/WebApi";
import "./AddCoupon.css";
import { Category, CouponModel } from "../../../Models/CouponModel";
import store from "../../../Redux/Store";
import { couponsAddedAction } from "../../../Redux/CouponsAppState";

function AddCoupon(): JSX.Element {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required("Title Is Required"),
    category: yup.string().required("category Is Required"),
    image: yup.string().required("image Is Required"),
    description: yup.string().required("Description Is Required"),
    startDate: yup
      .date()
      .min(new Date(), "Insert Start Date? COME ON!")
      .default(new Date())
      .typeError("You Must Specify A Start Date")
      .required("Start Date Is Required")
      .nullable()
      .default(() => new Date()),
    endDate: yup
      .date()
      .min(yup.ref("startDate"), "End Date Can't Be Before Start Date")
      /* .min(new Date(), "Insert End Date? come on!") */
      .default(new Date())
      .typeError("You Must Specify A End Date")
      .required("End Date Is Required")
      .nullable()
      .default(() => new Date()),
    amount: yup
      .number()
      .moreThan(0)
      .typeError("You must specify a number")
      .required("Amount is required"),
    price: yup
      .number()
      .moreThan(0)
      .typeError("You must specify a number")
      .required("Price is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<CouponModel>({ mode: "all", resolver: yupResolver(schema) });

  const addCoupon = async (coupon: CouponModel) => {
    web
      .addCoupon(coupon)
      .then((res) => {
        console.log(store.getState().authReducer.user?.token);
        notify.success(SccMsg.ADD_COUPON);
        //Update App State(Global State)
        store.dispatch(couponsAddedAction(res.data));
        navigate("/companies/coupons/");
      })
      .catch((err) => {
        notify.error(ErrMsg.PLS_LOGIN);
        /*         console.log(err);
        console.log(err.message); */
      });
  };

  return (
    <div className="AddCoupon flex-col-top-center">
      <h1 className="shadow-box-title">Add New Coupon</h1>
      <form onSubmit={handleSubmit(addCoupon)} className="flex-col-top-center special-box">
        <label htmlFor="title">Title</label>
        <input {...register("title")} type="text" placeholder="title" id="title" />
        <span>{errors.title?.message}</span>
        <label htmlFor="category">Category</label>
        <select {...register("category")} id="Category">
          <option value="" disabled={true} selected style={{ color: "black" }}>
            category
          </option>
          <option value="Food">{Category.Food}</option>
          <option value="Electricity">{Category.Electricity}</option>
          <option value="Restaurant">{Category.Restaurant}</option>
          <option value="Vacation">{Category.Vacation}</option>
        </select>
        {/* <input {...register("category")} type="text" placeholder="category" id="category" /> */}
        <span>{errors.category?.message}</span>
        <label htmlFor="image">Image</label>
        <input {...register("image")} type="text" placeholder="image" id="image" />
        <span>{errors.image?.message}</span>

        <label htmlFor="description">Description</label>
        <input
          {...register("description")}
          type="text"
          placeholder="description"
          id="description"
        />
        <span>{errors.description?.message}</span>
        <label htmlFor="startDate">Start Date</label>
        <input
          {...register("startDate")}
          type="Date"
          name="startDate"
          placeholder="startDate"
          id="startDate"
        />
        <span>{errors.startDate?.message}</span>
        <label htmlFor="endDate">End Date</label>
        <input
          {...register("endDate")}
          type="Date"
          name="endDate"
          placeholder="endDate"
          id="endDate"
        />
        <span>{errors.endDate?.message}</span>
        <label htmlFor="amount">Amount</label>
        <input {...register("amount")} type="number" placeholder="amount" id="amount" />
        <span>{errors.amount?.message}</span>
        <label htmlFor="price">Price</label>
        <input {...register("price")} type="number" placeholder="price" id="price" />
        <span>{errors.price?.message}</span>
        <button className="button-success" disabled={!isValid}>
          Add
        </button>
      </form>
    </div>
  );
}

export default AddCoupon;
