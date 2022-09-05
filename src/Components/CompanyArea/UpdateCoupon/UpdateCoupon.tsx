import "./UpdateCoupon.css";
import { useForm, useFormState } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import { useNavigate, useParams } from "react-router-dom";
import web from "../../../Services/WebApi";
import store from "../../../Redux/Store";
import { couponsUpdatedAction } from "../../../Redux/CouponsAppState";
import { Category, CouponModel, CouponModelPayLoad } from "../../../Models/CouponModel";

function UpdateCoupon(): JSX.Element {
  const navigate = useNavigate();
  const params = useParams();

  const couponId = +(params.id || 0);

  const [id, setId] = useState<number>(couponId);
  const [coupon, setCoupon] = useState<CouponModel>(
    store.getState().couponsReducer.coupons.filter((c) => c.id === id)[0]
  );
  const [origin, setOrigin] = useState<CouponModel>({
    id: coupon.id,
    companyId: coupon.companyId,
    category: coupon.category,
    title: coupon.title,
    description: coupon.description,
    startDate: coupon.startDate,
    endDate: coupon.endDate,
    amount: coupon.amount,
    price: coupon.price,
    image: coupon.image,
  });

  //step 6

  const schema = yup.object().shape({
    //companyId: yup.number().required("CompanyId is required"),
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    startDate: yup
      .date()
      .min(new Date(), "Insert Start Date? come on!")
      .default(new Date())
      .typeError("You must specify a Start Date")
      .required("Start Date is required")
      .nullable()
      .default(() => new Date()),
    endDate: yup
      .date()
      .min(new Date(), "Insert End Date? come on!")
      .default(new Date())
      .typeError("You must specify a End Date")
      .required("End Date is required")
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
    image: yup.string().required("Image is required"),
  });
  let defaultValuesObj = { ...origin };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<CouponModel>({
    defaultValues: defaultValuesObj,
    mode: "all",
    resolver: yupResolver(schema),
  });

  const { dirtyFields } = useFormState({
    control,
  });

  const updateCoupon = async (coupon: CouponModel) => {
    web
      .updateCoupon(couponId, coupon)
      .then((res) => {
        notify.success(SccMsg.UPDATE_COUPON);
        /*        console.log(res);
        console.log(res.data); */
        //Update App State(Global State)
        store.dispatch(couponsUpdatedAction(res.data));
        navigate("/companies/coupons/");
      })
      .catch((err) => {
        notify.error(ErrMsg.COUPON_NOT_FOUND);
        navigate("/companies/coupons/");
      });
  };

  return (
    <div className="UpdateCoupon flex-col-top-center">
      <h1>Update Coupon</h1>
      <form onSubmit={handleSubmit(updateCoupon)} className="flex-col-top-center box">
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
        <span>{errors.category?.message}</span>

        {/* <label htmlFor="companyId">CompanyId</label>
        <input {...register("companyId")} type="number" placeholder="companyId" id="companyId" />
        <span>{errors.companyId?.message}</span> */}

        <label htmlFor="title">Title</label>
        <input {...register("title")} type="text" placeholder="title" id="title" />
        <span>{errors.title?.message}</span>
        <label htmlFor="description">Description</label>
        <input
          {...register("description")}
          type="text"
          placeholder="description"
          id="description"
        />
        <span>{errors.description?.message}</span>
        <label htmlFor="startDate">Start Date</label>
        <input {...register("startDate")} type="Date" placeholder="startDate" id="startDate" />
        <span>{errors.startDate?.message}</span>
        <label htmlFor="endDate">End Date</label>
        <input {...register("endDate")} type="Date" placeholder="endDate" id="endDate" />
        <span>{errors.endDate?.message}</span>
        <label htmlFor="amount">Amount</label>
        <input {...register("amount")} type="number" placeholder="amount" id="amount" />
        <span>{errors.amount?.message}</span>
        <label htmlFor="price">Price</label>
        <input {...register("price")} type="number" placeholder="price" id="price" />
        <span>{errors.price?.message}</span>
        <label htmlFor="image">Image</label>
        <input {...register("image")} type="text" placeholder="image" id="image" />
        <span>{errors.image?.message}</span>
        <button className="button-success" disabled={!isDirty}>
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateCoupon;
