import axios from "axios";
import { Category, CouponModel, CouponModelPayLoad } from "../Models/CouponModel";
import {
  CredentialsRegisterModel,
  LoginModel,
  LoginRequestModel,
  UserModel,
} from "../Models/Welcome";
import globals from "./globals";
import tokenAxios from "./InterceptorAxios";
import { CompanyModel, CompanyModelPayLoad } from "../Models/CompanyModel";
import { CustomerModel, CustomerModelPayLoad, CustomersModel } from "../Models/CustomerModel";
import store from "../Redux/Store";
import { EnumType } from "typescript";

class WebApi {
  private welcomeApi = globals.urls.welcome;
  private customerApi = globals.urls.customer;
  private companyApi = globals.urls.company;
  private adminApi = globals.urls.admin;

  public async register(credentials: CredentialsRegisterModel): Promise<any> {
    return await axios.post<any>(this.welcomeApi + "/register", credentials);
  }
  public async login(credentials: LoginRequestModel): Promise<any> {
    return await axios.post<UserModel>(this.welcomeApi + "/login", credentials);
  }

  //COMPANY

  public async addCoupon(coupon: CouponModel): Promise<any> {
    return await tokenAxios.post<CouponModel>(this.companyApi + "/addCoupon/companyId", coupon);
  }

  public async updateCoupon(couponId: number, coupon: CouponModelPayLoad): Promise<any> {
    return await tokenAxios.put<any>(this.companyApi + "/update/" + couponId, coupon);
  }

  public async deleteCoupon(id: number): Promise<any> {
    return await tokenAxios.delete<any>(this.companyApi + "/delete/" + id);
  }

  public async getAllCoupons(): Promise<any> {
    return await tokenAxios.get<CouponModel[]>(this.customerApi + "/coupons/");
  }

  public async getCustomerCoupons(): Promise<any> {
    return await tokenAxios.get<CouponModel[]>(this.customerApi + "/coupons/customerId");
  }
  public async getCustomerCouponsByCategory(category: string): Promise<any> {
    return await tokenAxios.get<CouponModel[]>(this.customerApi + "/coupons/customerId/category");
  }
  public async getCompanyCouponsByCategory(category: string): Promise<any> {
    return await tokenAxios.get<CouponModel[]>(this.companyApi + "/coupons/category/" + category);
  }
  public async getCustomerCouponsByPrice(): Promise<any> {
    return await tokenAxios.get<CouponModel[]>(this.customerApi + "/coupons/customerId/maxPrice");
  }
  public async getCompanyCoupons(): Promise<any> {
    return await tokenAxios.get<CouponModel[]>(this.companyApi + "/coupons/companyId");
  }
  public async getAllAvailableCoupons(): Promise<any> {
    return await tokenAxios.get<CouponModel[]>(this.customerApi + "/purchase/customerId");
  }

  public async getSingleCoupon(id: number): Promise<any> {
    return await tokenAxios.get<CouponModel>(this.companyApi + "/coupons/" + id);
  }

  public async countCoupon(): Promise<any> {
    return await tokenAxios.get<number>(this.companyApi + "/count");
  }

  public async getDetails(): Promise<any> {
    return await tokenAxios.get<CompanyModel>(this.companyApi + "/details");
  }

  public async getCustomerDetails(): Promise<any> {
    return await tokenAxios.get<CustomerModel>(this.customerApi + "/customerDetails");
  }

  //ADMIN

  public async addCompany(company: CompanyModel): Promise<any> {
    return await tokenAxios.post<CompanyModel>(this.adminApi + "/addCompany", company);
  }

  public async updateCompany(companyId: number, company: CompanyModelPayLoad): Promise<any> {
    return await tokenAxios.put<any>(this.adminApi + "/update/" + companyId, company);
  }

  public async deleteCompany(id: number): Promise<any> {
    return await tokenAxios.delete<any>(this.adminApi + "/companies/" + id);
  }

  public async getAllCompanies(): Promise<any> {
    return await tokenAxios.get<CompanyModel[]>(this.adminApi + "/companies");
  }

  public async getSingleCompany(id: number): Promise<any> {
    return await tokenAxios.get<CompanyModel>(this.adminApi + "/company/" + id);
  }

  public async countCompany(): Promise<any> {
    return await tokenAxios.get<number>(this.adminApi + "/companies/count");
  }

  public async addCustomer(customer: CustomerModel): Promise<any> {
    return await tokenAxios.post<CustomerModel>(this.adminApi + "/addCustomer", customer);
  }

  public async updateCustomer(id: number, customer: CustomerModelPayLoad): Promise<any> {
    return await tokenAxios.put<any>(this.adminApi + "/customer/" + id, customer);
  }

  public async deleteCustomer(id: number): Promise<any> {
    return await tokenAxios.delete<any>(this.adminApi + "/customer/" + id);
  }

  public async getAllCustomers(): Promise<any> {
    return await tokenAxios.get<CustomerModel[]>(this.adminApi + "/customers/");
  }

  public async getSingleCustomer(id: number): Promise<any> {
    return await tokenAxios.get<CustomerModel>(this.adminApi + "/customer/" + id);
  }

  //CUSTOMER
  public async purchaseCoupon(couponId: number): Promise<any> {
    return await tokenAxios.post<CompanyModel>(this.customerApi + "/purchase/" + couponId);
  }
}
const web = new WebApi();
export default web;
