import "./Register.css";
import * as yup from "yup";
import { CredentialsRegisterModel, RegisterModel, RegistersModel } from "../../../Models/Welcome";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import notify, { SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function Register(): JSX.Element {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email("Invalid Email").required("Email Is Required"),

    password: yup
      .string()
      .min(3, "Your Password Is Too Short, 3 Characters Minimum")
      .max(8, "Your Password Is Too Long, 8 Characters Maximum")
      .required("Password Is Required"),

    confirm: yup.string().test("Passwords-Match", "Passwords Must Match", function (value) {
      return this.parent.password === value;
    }),
    firstName: yup.string().required("First Name Is Required"),

    lastName: yup.string().required("Last Name Is Required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<RegisterModel>({ mode: "all", resolver: yupResolver(schema) });

  //step8
  const registerUser = async (model: RegisterModel) => {
    const credential = new RegistersModel();
    credential.email = model.email;
    credential.password = model.password;
    credential.firstName = model.firstName;
    credential.lastName = model.lastName;
    web
      .register(credential)
      .then((res) => {
        notify.success(SccMsg.REGISTER);
        navigate("/login");
      })
      .catch((err) => {
        notify.error(err);
        console.log(err);
        console.log(err.message);
      });
  };

  return (
    <div className="Register flex-col-top-center">
      <h1 className="login-register-title">Register</h1>
      <form onSubmit={handleSubmit(registerUser)} className="flex-col-top-center register-box">
        <label htmlFor="firstName">FirstName</label>
        <input {...register("firstName")} type="text" placeholder="FirstName" id="firstName" />
        <span>{errors.firstName?.message}</span>
        <label htmlFor="lastName">LastName</label>
        <input {...register("lastName")} type="text" placeholder="LastName" id="lastName" />
        <span>{errors.lastName?.message}</span>
        <label htmlFor="email">Email</label>
        <input {...register("email")} type="email" placeholder="Email" id="email" />
        <span>{errors.email?.message}</span>
        <label htmlFor="password">Password</label>
        <input {...register("password")} type="password" placeholder="Password" id="password" />
        <span>{errors.password?.message}</span>
        <label htmlFor="confirm">Confirm Password</label>
        <input {...register("confirm")} type="password" placeholder="Confirm" id="confirm" />
        <span>{errors.confirm?.message}</span>
        <br />
        <button className="button-success" disabled={!isValid}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
