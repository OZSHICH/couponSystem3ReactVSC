import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { CustomerModel, CustomerModelPayLoad } from "../../../Models/CustomerModel";
import store from "../../../Redux/Store";
import * as yup from "yup";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import "./UpdateCustomer.css";
import { customersUpdatedAction } from "../../../Redux/CustomerAppState";

function UpdateCustomer(): JSX.Element {
  const navigate = useNavigate();
  const params = useParams();

  const customerId = +(params.id || 0);

  const [id, setId] = useState<number>(customerId);
  const [customer, setCustomer] = useState<CustomerModel>(
    store.getState().customersReducer.customers.filter((c) => c.id === id)[0]
  );
  const [origin, setOrigin] = useState<CustomerModel>({
    email: customer.email,
    firstName: customer.firstName,
    lastName: customer.lastName,
    password: customer.password,
  });
  const schema = yup.object().shape({
    firstName: yup.string().required("First Name Is Required"),
    lastName: yup.string().required("Last Name Is Required"),
    email: yup.string().email("Invalid Email").required("Email Is Required"),
    password: yup.string().required("Password Is Required"),
  });

  let defaultValuesObj = { ...origin };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<CustomerModel>({
    defaultValues: defaultValuesObj,
    mode: "all",
    resolver: yupResolver(schema),
  });
  const { dirtyFields } = useFormState({
    control,
  });

  const updateCustomer = async (customer: CustomerModelPayLoad) => {
    web
      .updateCustomer(customerId, customer)
      .then((res) => {
        notify.success(SccMsg.UPDATE_CUSTOMER);
        //Update App State(Global State)
        store.dispatch(customersUpdatedAction(res.data));
        navigate("/admin/customers");
      })
      .catch((err) => {
        notify.error(ErrMsg.CUSTOMER_NOT_FOUND);

        navigate("/admin/customers");
      });
  };

  return (
    <div className="UpdateCustomer flex-col-top-center">
      <h1>Update Customer</h1>
      <form onSubmit={handleSubmit(updateCustomer)} className="flex-col-top-center box">
        <label htmlFor="firstName">name</label>
        <input {...register("firstName")} type="text" placeholder="firstName" id="firstName" />
        <span>{errors.firstName?.message}</span>
        <label htmlFor="lastName">lastName</label>
        <input {...register("lastName")} type="text" placeholder="lastName" id="lastName" />
        <span>{errors.lastName?.message}</span>
        <label htmlFor="email">email</label>
        <input {...register("email")} type="email" placeholder="email" id="email" />
        <span>{errors.email?.message}</span>
        <label htmlFor="password">password</label>
        <input {...register("password")} type="text" placeholder="password" id="password" />
        <span>{errors.password?.message}</span>
        <button className="button-success" disabled={!isDirty}>
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateCustomer;
