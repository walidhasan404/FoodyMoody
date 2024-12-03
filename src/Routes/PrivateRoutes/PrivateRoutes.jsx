import { useContext } from "react"
import { Authcontext } from "../../Providers/AuthProviders"
import { Navigate, useLocation } from "react-router-dom"
import { FallingLines } from "react-loader-spinner";

function PrivateRoutes({children}) {
    const { user, loading } = useContext(Authcontext)
    const location = useLocation();
    if (loading) {
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
    if (user) {
        return children
    }
   return <Navigate to={'/login'} state={{from:location}} replace></Navigate>
}
export default PrivateRoutes