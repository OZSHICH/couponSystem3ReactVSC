import { CouponModel } from "./CouponModel";

export class CustomerModel {
  public id?: number;
  public firstName?: string = "";
  public lastName?: string = "";
  public email?: string;
  public password?: string;
  //public coupons?: CouponModel[];
  public clientType?: ClientType;

  public constructor(
    id?: number,
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    //coupons?: CouponModel[],
    clientType?: ClientType
  ) {
    this.id = id;
    this.firstName = firstName || "";
    this.lastName = lastName || "";
    this.email = email;
    this.password = password;
    //this.coupons = coupons;
    this.clientType = clientType;
  }
}
export class CustomersModel {
  public id: number;
  public firstName?: string = "";
  public lastName?: string = "";
  public email?: string;
  public password?: string;
  //public coupons?: CouponModel[];
  public clientType: ClientType;

  public constructor(
    id: number,
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    //coupons?: CouponModel[],
    clientType?: ClientType
  ) {
    this.id = id;
    this.firstName = firstName || "";
    this.lastName = lastName || "";
    this.email = email;
    this.password = password;
    //this.coupons = coupons;
    this.clientType = clientType;
  }
}
export class CustomerModelPayLoad {
  public firstName?: string = "";
  public lastName?: string = "";
  public email?: string;
  public password?: string;
  public clientType?: ClientType;

  public constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    clientType: ClientType
  ) {
    this.firstName = firstName || "";
    this.lastName = lastName || "";
    this.email = email;
    this.password = password;
    this.clientType = clientType;
  }
}
export class UserModel {
  public token?: string;
  public email?: string;

  public constructor(token?: string, email?: string) {
    this.token = token;
    this.email = email;
  }
}

export enum ClientType {
  ADMINISTRATOR = "ADMINISTRATOR",
  COMPANY = "COMPANY",
  CUSTOMER = "CUSTOMER",
}
