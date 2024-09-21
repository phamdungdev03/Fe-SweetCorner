import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { axiosAccountForLogin } from "../ReduxToolkit/sildes/AccountSlide";

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = sessionStorage.getItem("accessToken");
  const { accountLogin } = useSelector((state) => state?.accountReducer);

  const userRole = accountLogin?.role_name;

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(axiosAccountForLogin());
    }
  }, [dispatch, isLoggedIn]);
  if (!isLoggedIn || userRole === "user") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
