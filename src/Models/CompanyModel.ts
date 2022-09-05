import { CouponModel } from "./CouponModel";

export class CompanyModel {
  public id?: number;
  public name?: string;
  public email?: string;
  public password?: string;
  public clientType?: ClientType;

  public constructor(
    id?: number,
    name?: string,
    email?: string,
    password?: string,
    clientType?: ClientType
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.clientType = clientType;
  }
}
export class CompanyModelPayLoad {
  public name?: string;
  public email?: string;
  public password?: string;

  public constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
export enum ClientType {
  ADMINISTRATOR = "ADMINISTRATOR",
  COMPANY = "COMPANY",
  CUSTOMER = "CUSTOMER",
}
