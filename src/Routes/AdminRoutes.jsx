import { useContext } from "react"
import { Authcontext } from "../Providers/AuthProviders"
import useAdmin from "../Hooks/useAdmin";
import { Navigate, useLocation } from "react-router-dom";
import { FallingLines } from "react-loader-spinner";

function AdminRoutes({children}) {
    const { user, loading } = useContext(Authcontext);
    const { isAdmin, isLoading } = useAdmin();
    const location = useLocation();
    if (loading || isLoading) {
      return (
        <>
          <div className="text-center mt-7">
            <div className="flex justify-center">
              <FallingLines
                color="#4fa94d"
                width="200"
                visible={true}
                ariaLabel="falling-circles-loading"
              />
            </div>
          </div>
        </>
      );
    }
    if (user && isAdmin) {
      return children;
    }
    return (
      <Navigate to={"/"} state={{ from: location }} replace></Navigate>
    );
}
export default AdminRoutes