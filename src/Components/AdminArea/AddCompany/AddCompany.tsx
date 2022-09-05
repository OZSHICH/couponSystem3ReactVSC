import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./AddCompany.css";
import { CompanyModel, CompanyModelPayLoad } from "../../../Models/CompanyModel";
import { companiesAddedAction } from "../../../Redux/CompanyAppState";
import store from "../../../Redux/Store";
import notify, { SccMsg, ErrMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";

function AddCompany(): JSX.Element {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup.string().required("Name Is Required"),
    email: yup.string().email("Invalid Email").required("Email Is Required"),
    password: yup.string().required("Password Is Required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<CompanyModel>({ mode: "all", resolver: yupResolver(schema) });

  const addCompany = async (company: CompanyModel) => {
    web
      .addCompany(company)
      .then((res) => {
        notify.success(SccMsg.ADD_COMPANY);
        //Update App State(Global State)
        store.dispatch(companiesAddedAction(res.data));
        navigate("/admin/companies");
      })
      .catch((err) => {
        notify.error(ErrMsg.PLS_LOGIN);
        //console.log(err);
        //console.log(err.message);
        navigate("/admin/companies");
      });
  };

  return (
    <div className="AddCompany flex-col-top-center">
      <h1 className="shadow-box-title">Add Company</h1>
      <form onSubmit={handleSubmit(addCompany)} className="flex-col-top-center special-box">
        <label htmlFor="name">Name</label>
        <input {...register("name")} type="text" placeholder="name" id="name" />
        <span>{errors.name?.message}</span>
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

export default AddCompany;
