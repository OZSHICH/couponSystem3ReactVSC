import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./AddCustomer.css";
import { CustomerModel } from "../../../Models/CustomerModel";
import { useForm } from "react-hook-form";
import { companiesAddedAction } from "../../../Redux/CompanyAppState";
import store from "../../../Redux/Store";
import notify, { SccMsg, ErrMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import { customersAddedAction } from "../../../Redux/CustomerAppState";

function AddCustomer(): JSX.Element {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    firstName: yup.string().required("First Name Is Required"),
    lastName: yup.string().required("Last Name Is Required"),
    email: yup.string().email("Invalid Email").required("Email Is Required"),
    password: yup.string().required("Password Is Required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<CustomerModel>({ mode: "all", resolver: yupResolver(schema) });

  const addCustomer = async (customer: CustomerModel) => {
    web
      .addCustomer(customer)
      .then((res) => {
        notify.success(SccMsg.ADD_CUSTOMER);
        //Update App State(Global State)
        store.dispatch(customersAddedAction(res.data));
        navigate("/admin/customers");
      })
      .catch((err) => {
        notify.error(ErrMsg.PLS_LOGIN);
        //console.log(err);
        //console.log(err.message);
        navigate("/admin/customers");
      });
  };

  return (
    <div className="AddCompany flex-col-top-center">
      <h1 className="shadow-box-title">Add Customer</h1>
      <form onSubmit={handleSubmit(addCustomer)} className="flex-col-top-center special-box">
        <label htmlFor="firstName">First Name</label>
        <input {...register("firstName")} type="text" placeholder="firstName" id="firstName" />
        <span>{errors.firstName?.message}</span>
        <label htmlFor="lastName">Last Name</label>
        <input {...register("lastName")} type="text" placeholder="lastName" id="lastName" />
        <span>{errors.lastName?.message}</span>
        <label htmlFor="email">Email</label>
        <input {...register("email")} type="email" placeholder="email" id="email" />
        <span>{errors.email?.message}</span>
        <label htmlFor="password">Password</label>
        <input {...register("password")} type="text" placeholder="password" id="password" />
        <span>{errors.password?.message}</span>

        <button className="button-success" disabled={!isValid}>
          Add
        </button>
      </form>
    </div>
  );
}

export default AddCustomer;
