import { ClientType } from "./CompanyModel";

export class RegisterModel {
  public firstName?: string;
  public lastName?: string;
  public email?: string;
  public password?: string;
  public confirm?: string;

  public constructor(
    email: string,
    password: string,
    confirm: string,
    firstName?: string,
    lastName?: string
  ) {
    this.email = email;
    this.password = password;
    this.confirm = confirm;
    this.firstName = firstName || "";
    this.lastName = lastName || "";
  }
}
export class RegistersModel {
  public firstName?: string;
  public lastName?: string;
  public email?: string;
  public password?: string;
  public confirm?: string;

  public constructor(
    email?: string,
    password?: string,
    confirm?: string,
    firstName?: string,
    lastName?: string
  ) {
    this.email = email;
    this.password = password;
    this.confirm = confirm;
    this.firstName = firstName || "";
    this.lastName = lastName || "";
  }
}
export class LoginModel {
  public email?: string;
  public password?: string;
  public clientType?: ClientType;

  public constructor(email: string, password: string, clientType: ClientType) {
    this.email = email;
    this.password = password;
    this.clientType = clientType;
  }
}
export class CredentialsModel {
  public email?: string;
  public password?: string;
  public clientType?: ClientType;

  public constructor(email?: string, password?: string, clientType?: ClientType) {
    this.email = email;
    this.password = password;
    this.clientType = clientType;
  }
}
export class UserModel {
  public token?: string;
  public email?: string;
  public name?: string;
  public clientType?: ClientType;

  public constructor(token?: string, email?: string, name?: string, clientType?: ClientType) {
    this.token = token;
    this.email = email;
    this.name = name;
    this.clientType = clientType;
  }
}
export class LoginRequestModel {
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

export class CredentialsRegisterModel {
  public email?: string;
  public password?: string;

  public constructor(email?: string, password?: string) {
    this.email = email;
    this.password = password;
  }
}

export class UsersModel {
  public token: string;
  public email: string;

  public constructor(token?: string, email?: string) {
    this.token = token || "";
    this.email = email || "";
  }
}
