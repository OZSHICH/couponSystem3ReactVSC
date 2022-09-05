import "./Login.css";
import * as yup from "yup";
import {
  CredentialsModel,
  CredentialsRegisterModel,
  LoginModel,
  LoginRequestModel,
} from "../../../Models/Welcome";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import { log } from "console";
import store from "../../../Redux/Store";
import { loginAction } from "../../../Redux/UserAppState";
import { ClientType } from "../../../Models/CompanyModel";
import { couponsClearAction } from "../../../Redux/CouponsAppState";
import { clearScreenDown } from "readline";

function Login(): JSX.Element {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    email: yup.string().email("A Valid Email Is Required"),
    password: yup
      .string()
      .required("Password Is Required")
      .min(3, "At Least 3 Characters Required")
      .max(8, "At Most 8 Characters Required"),
    type: yup.mixed<ClientType>().oneOf(Object.values(ClientType)),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<LoginModel>({ mode: "all", resolver: yupResolver(schema) });

  const loginUser = async (model: LoginModel) => {
    const credential = new LoginRequestModel();
    credential.email = model.email;
    credential.password = model.password;
    credential.clientType = model.clientType;

    console.log("Remote Server " + credential);

    web
      .login(credential)
      .then((res) => {
        notify.success(SccMsg.lOGIN);
        store.dispatch(loginAction(res.data));
        console.log(store.getState().authReducer.user?.token);

        if (credential.clientType === "COMPANY" && res.data.token !== null) {
          navigate("/companies/coupons/");
        } else if (credential.clientType === "CUSTOMER" && res.data.token !== null) {
          navigate("/customers/coupons/");
        } else if (credential.clientType === "ADMINISTRATOR" && res.data.token !== null) {
          navigate("/admin/home/");
        }
      })

      .catch((err) => {
        console.log(store.getState().authReducer.user?.token);
        notify.error(ErrMsg.TAPE_NOT_VALID);
        navigate("/login");
      });
  };

  return (
    <div className="Login flex-col-top-center">
      <h1 className="login-register-title">Login</h1>
      <form onSubmit={handleSubmit(loginUser)} className="flex-col-top-center login-box">
        <label htmlFor="clientType">Client Type</label>
        <select {...register("clientType")} id="ClientType">
          <option value="" disabled={true} selected style={{ color: "black" }}>
            ClientType
          </option>
          <option value="ADMINISTRATOR">{ClientType.ADMINISTRATOR}</option>
          <option value="CUSTOMER">{ClientType.CUSTOMER}</option>
          <option value="COMPANY">{ClientType.COMPANY}</option>
        </select>
        <span>{errors.clientType?.message}</span>
        <label htmlFor="email">Email</label>
        <input {...register("email")} type="email" placeholder="Email" id="email" />
        <span>{errors.email?.message}</span>
        <label htmlFor="password">Password</label>
        <input {...register("password")} type="password" placeholder="Password" id="password" />
        <span>{errors.password?.message}</span>

        <button className="button-success" disabled={!isValid}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
