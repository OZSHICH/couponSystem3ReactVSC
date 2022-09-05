import { CouponModel } from "../Models/CouponModel";

export class CouponsAppState {
  public coupons: CouponModel[] = [];
}
export enum CouponsActionType {
  CouponsDownloaded = "CouponsDownloaded",
  CouponAdded = "CouponAdded",
  CouponUpdated = "CouponUpdated",
  CouponDeleted = "CouponDeleted",
  CouponClear = "CouponClear",
}
export interface CouponAction {
  type: CouponsActionType;
  payload?: any;
}
export function couponsDownloadedAction(coupons: CouponModel[]): CouponAction {
  return { type: CouponsActionType.CouponsDownloaded, payload: coupons };
}

export function couponsAddedAction(coupon: CouponModel): CouponAction {
  return { type: CouponsActionType.CouponAdded, payload: coupon };
}

export function couponsUpdatedAction(coupon: CouponModel): CouponAction {
  return { type: CouponsActionType.CouponUpdated, payload: coupon };
}

export function couponsDeletedAction(id: number): CouponAction {
  return { type: CouponsActionType.CouponDeleted, payload: id };
}

export function couponsClearAction(): CouponAction {
  return { type: CouponsActionType.CouponClear, payload: {} };
}
export function couponsReducer(
  currentState: CouponsAppState = new CouponsAppState(),
  action: CouponAction
): CouponsAppState {
  const newState = { ...currentState }; //Spread Operator

  switch (action.type) {
    case CouponsActionType.CouponsDownloaded:
      newState.coupons = action.payload;
      break;
    case CouponsActionType.CouponAdded:
      newState.coupons.push(action.payload);
      break;
    case CouponsActionType.CouponUpdated:
      /*       console.log(newState.coupons);
      console.log(action.payload); */
      const idx = newState.coupons.findIndex((t) => t.id === action.payload.id);
      /*       console.log(idx); */
      //onsole.log(t.id,typeof(t.id));
      /*       console.log(action.payload.id, typeof action.payload.id); */
      newState.coupons[idx] = action.payload;
      /*       console.log(newState.coupons); */
      break;
    case CouponsActionType.CouponDeleted:
      newState.coupons = newState.coupons.filter((c) => c.id !== action.payload);
      break;
    case CouponsActionType.CouponClear:
      newState.coupons = [];
      break;
  }
  return newState;
}
