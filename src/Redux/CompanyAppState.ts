import { CompanyModel } from "../Models/CompanyModel";

export class CompaniesAppState {
  public companies: CompanyModel[] = [];
}
export enum CompaniesActionType {
  CompaniesDownloaded = "CompaniesDownloaded",
  CompanyAdded = "CompanyAdded",
  CompanyUpdated = "CompanyUpdated",
  CompanyDeleted = "CompanyDeleted",
  CompanyClear = "CompanyClear",
}
export interface CompanyAction {
  type: CompaniesActionType;
  payload?: any;
}
export function companiesDownloadedAction(companies: CompanyModel[]): CompanyAction {
  return { type: CompaniesActionType.CompaniesDownloaded, payload: companies };
}

export function companiesAddedAction(company: CompanyModel): CompanyAction {
  return { type: CompaniesActionType.CompanyAdded, payload: company };
}

export function companiesUpdatedAction(company: CompanyModel): CompanyAction {
  return { type: CompaniesActionType.CompanyUpdated, payload: company };
}

export function companiesDeletedAction(id: number): CompanyAction {
  return { type: CompaniesActionType.CompanyDeleted, payload: id };
}

export function companiesClearAction(): CompanyAction {
  return { type: CompaniesActionType.CompanyClear, payload: {} };
}
export function companiesReducer(
  currentState: CompaniesAppState = new CompaniesAppState(),
  action: CompanyAction
): CompaniesAppState {
  const newState = { ...currentState }; //Spread Operator
  switch (action.type) {
    case CompaniesActionType.CompaniesDownloaded:
      newState.companies = action.payload;
      break;
    case CompaniesActionType.CompanyAdded:
      newState.companies.push(action.payload);
      break;
    case CompaniesActionType.CompanyUpdated:
      console.log(newState.companies);
      console.log(action.payload);
      const idx = newState.companies.findIndex((t) => t.id === action.payload.id);
      console.log(idx);
      //onsole.log(t.id,typeof(t.id));
      console.log(action.payload.id, typeof action.payload.id);
      newState.companies[idx] = action.payload;
      console.log(newState.companies);
      break;
    case CompaniesActionType.CompanyDeleted:
      newState.companies = newState.companies.filter((c) => c.id !== action.payload);
      break;
    case CompaniesActionType.CompanyClear:
      newState.companies = [];
      break;
  }
  return newState;
}
