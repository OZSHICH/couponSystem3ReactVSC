import { UserModel } from "../Models/Welcome";

export class AuthAppState {
  public user: UserModel = new UserModel();
  public constructor() {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user") || "");
      if (storedUser) {
        this.user = storedUser;
      }
    } catch (err) {
      this.user = null;
    }
  }
}

export enum AuthActionType {
  Login = "Login",
  Logout = "Logout",
}

export interface AuthAction {
  type: AuthActionType;
  payload?: any;
}

export function loginAction(user: UserModel): AuthAction {
  return { type: AuthActionType.Login, payload: user };
}

export function logoutAction(): AuthAction {
  return { type: AuthActionType.Logout };
}

export function authReducer(
  currentState: AuthAppState = new AuthAppState(),
  action: AuthAction
): AuthAppState {
  const newState = { ...currentState };
  switch (action.type) {
    case AuthActionType.Login: //Payload is logged i user from backend
      newState.user = action.payload;
      localStorage.setItem("user", JSON.stringify(newState.user)); // Saving in the session storage (won't be deleted)
      break;
    case AuthActionType.Logout: // No payload
      newState.user = null;
      localStorage.removeItem("user");

      break;
  }
  return newState;
}
