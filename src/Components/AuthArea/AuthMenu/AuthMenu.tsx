import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserModel } from "../../../Models/Welcome";
import store from "../../../Redux/Store";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(
    store.getState().authReducer.user?.token?.length > 0
  );

  //const [email, setEmail] = useState(store.getState().authReducer.user?.email);
  const [name, setName] = useState(store.getState().authReducer.user?.name);

  useEffect(() => {
    return store.subscribe(() => {
      setIsLoggedIn(store.getState().authReducer.user?.token?.length > 0);
      setName(store.getState().authReducer.user?.name);
    });
  }, []);

  return (
    <div className="AuthMenu flex-col-top-center-user">
      {isLoggedIn ? (
        <>
          Hello {name}
          <Link className="login-register" to="logout">
            Logout
          </Link>
        </>
      ) : (
        <>
          <div className="Hello flex-col-top-center-user">Hello Guest </div>
          <Link className="login-register" to="register">
            Register
          </Link>{" "}
          <Link className="login-register" to="login">
            Login
          </Link>
        </>
      )}
    </div>
  );
}

export default AuthMenu;
