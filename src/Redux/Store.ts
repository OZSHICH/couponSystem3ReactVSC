import { combineReducers, createStore } from "redux";
import { companiesReducer } from "./CompanyAppState";
import { couponsReducer } from "./CouponsAppState";
import { customersReducer } from "./CustomerAppState";
import { authReducer } from "./UserAppState";

const reducers = combineReducers({
  companiesReducer: companiesReducer,
  couponsReducer: couponsReducer,
  customersReducer: customersReducer,
  authReducer: authReducer,
});
const store = createStore(reducers);

export default store;
