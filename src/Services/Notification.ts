import { Notyf } from "notyf";

export enum SccMsg {
  ALL_COUPONS = "Got All Coupons Successfully",
  ALL_COUPONS_AVAILABLE = "Got All Coupons Available For Purchase",
  SINGLE_COUPON = "Got Single Coupon Successfully",
  DELETE_COUPON = "Delete Coupon Successfully",
  UPDATE_COUPON = "Update Coupon Successfully",
  ADD_COUPON = "Add Coupon Successfully",
  ALL_CUSTOMERS = "Got All Customers Successfully",
  SINGLE_CUSTOMER = "Got Single Customer Successfully",
  DELETE_CUSTOMER = "Delete Customer Successfully",
  UPDATE_CUSTOMER = "Update Customer Successfully",
  ADD_CUSTOMER = "Add Task Successfully",
  ALL_COMPANIES = "Got All Companies Successfully",
  SINGLE_COMPANY = "Got Single Company Successfully",
  DELETE_COMPANY = "Delete Company Successfully",
  UPDATE_COMPANY = "Update Company Successfully",
  ADD_COMPANY = "Add Company Successfully",
  COMPANY_DETAILS = "Company Details",
  CUSTOMER_DETAILS = "Customer Details",
  lOGIN = "Log In Successfully",
  LOGOUT = "Log Out Successfully",
  REGISTER = "Register Successfully",
  PURCHASE_COUPON = "Purchase Coupon Successfully",
}
export enum ErrMsg {
  PLS_LOGIN = "Please Login",
  CUSTOMER_NOT_FOUND = "Customer Not Found",
  COMPANY_NOT_FOUND = "Company Not Found",
  COUPON_NOT_FOUND = "Coupon Not Found",
  COUPON_ALREADY_PURCHASED = "Coupon Already Purchased",
  TAPE_NOT_VALID = "ClientType/Password/Email Not Valid",
}

class Notify {
  private notification = new Notyf({ duration: 4000, position: { x: "left", y: "top" } });

  public success(message: any) {
    this.notification.success(message);
  }

  public error(message: string) {
    this.notification.error(this.extractMsg(message));
  }

  private extractMsg(err: any): string {
    if (typeof err === "string") {
      return err;
    }

    if (typeof err?.response?.data === "string") {
      //Backend exact error
      return err.response.data;
    }

    if (Array.isArray(err?.response?.data)) {
      // Backend exact error list
      return err?.response?.data[0];
    }

    // Must be last
    if (typeof err?.message === "string") {
      return err.message;
    }

    return "An Error Occurred, Please Try Again.";
  }
}
const notify = new Notify();
export default notify;
