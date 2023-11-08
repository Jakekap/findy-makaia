import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = ({ isAuthenticated }) => {
  return <div>{isAuthenticated ? <Outlet /> : <Navigate to="/login" />}</div>;
};

export default PrivateRouter;
