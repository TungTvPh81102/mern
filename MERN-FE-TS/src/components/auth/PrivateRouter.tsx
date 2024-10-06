import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken ? <Outlet /> : <Navigate to={"/"} replace/>;
};

export default PrivateRouter;
