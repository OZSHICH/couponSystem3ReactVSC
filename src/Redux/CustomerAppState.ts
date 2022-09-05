import { CustomerModel } from "../Models/CustomerModel";

export class CustomersAppState {
  public customers: CustomerModel[] = [];
}
export enum CustomersActionType {
  CustomersDownloaded = "CustomersDownloaded",
  CustomerAdded = "CustomerAdded",
  CustomerUpdated = "CustomerUpdated",
  CustomerDeleted = "CustomerDeleted",
  CustomerClear = "CustomerClear",
}
export interface CustomerAction {
  type: CustomersActionType;
  payload?: any;
}
export function customersDownloadedAction(customers: CustomerModel[]): CustomerAction {
  return { type: CustomersActionType.CustomersDownloaded, payload: customers };
}

export function customersAddedAction(customer: CustomerModel): CustomerAction {
  return { type: CustomersActionType.CustomerAdded, payload: customer };
}

export function customersUpdatedAction(customer: CustomerModel): CustomerAction {
  return { type: CustomersActionType.CustomerUpdated, payload: customer };
}

export function customersDeletedAction(id: number): CustomerAction {
  return { type: CustomersActionType.CustomerDeleted, payload: id };
}

export function customersClearAction(): CustomerAction {
  return { type: CustomersActionType.CustomerClear, payload: {} };
}
export function customersReducer(
  currentState: CustomersAppState = new CustomersAppState(),
  action: CustomerAction
): CustomersAppState {
  const newState = { ...currentState }; //Spread Operator
  switch (action.type) {
    case CustomersActionType.CustomersDownloaded:
      newState.customers = action.payload;
      break;
    case CustomersActionType.CustomerAdded:
      newState.customers.push(action.payload);
      break;
    case CustomersActionType.CustomerUpdated:
      console.log(newState.customers);
      console.log(action.payload);
      const idx = newState.customers.findIndex((t) => t.id === action.payload.id);
      console.log(idx);
      console.log(action.payload.id, typeof action.payload.id);
      newState.customers[idx] = action.payload;
      console.log(newState.customers);
      break;
    case CustomersActionType.CustomerDeleted:
      newState.customers = newState.customers.filter((c) => c.id !== action.payload);
      break;
    case CustomersActionType.CustomerClear:
      newState.customers = [];
      break;
  }
  return newState;
}
