import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, useFormState } from "react-hook-form";
import { CompanyModel } from "../../../Models/CompanyModel";
import store from "../../../Redux/Store";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./UpdateCompany.css";
import web from "../../../Services/WebApi";
import notify, { SccMsg } from "../../../Services/Notification";
import { companiesUpdatedAction } from "../../../Redux/CompanyAppState";

function UpdateCompany(): JSX.Element {
  const navigate = useNavigate();
  const params = useParams();

  const companyId = +(params.id || 0);

  const [id, setId] = useState<number>(companyId);
  const [company, setCompany] = useState<CompanyModel>(
    store.getState().companiesReducer.companies.filter((c) => c.id === id)[0]
  );
  const [origin, setOrigin] = useState<CompanyModel>({
    email: company.email,
    password: company.password,
  });
  const schema = yup.object().shape({
    email: yup.string().email("Invalid Email").required("Email Is Required"),
    password: yup.string().required("Password Is Required"),
  });

  let defaultValuesObj = { ...origin };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<CompanyModel>({
    defaultValues: defaultValuesObj,
    mode: "all",
    resolver: yupResolver(schema),
  });
  const { dirtyFields } = useFormState({
    control,
  });

  const updateCompany = async (company: CompanyModel) => {
    web
      .updateCompany(companyId, company)
      .then((res) => {
        notify.success(SccMsg.UPDATE_COMPANY);
        console.log(res);
        console.log(res.data);
        //Update App State(Global State)
        store.dispatch(companiesUpdatedAction(res.data));
        navigate("/admin/companies");
      })
      .catch((err) => {
        notify.error(err);

        navigate("/admin/companies");
      });
  };

  return (
    <div className="UpdateCompany flex-col-top-center">
      <h1>Update Company</h1>
      <form onSubmit={handleSubmit(updateCompany)} className="flex-col-top-center box">
        {/*  <label htmlFor="name">name</label>
        <input {...register("name")} type="text" placeholder="name" id="name" />
        <span>{errors.name?.message}</span> */}
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

export default UpdateCompany;
