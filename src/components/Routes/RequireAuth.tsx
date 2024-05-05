

import { useAuth } from "../AuthContenxt/AuthContext"
import { Navigate, Outlet, useLocation } from "react-router-dom"

interface RequireAuthProps{
    roles:string | null
}

const RequireAuth = ({roles}:RequireAuthProps) =>{
    const {authContext,loadingContext} = useAuth()

    
    const location = useLocation();


    if (loadingContext?.isLoading) {
        return <div>Loading...</div>; // Or your own custom loading component
      }
    else{
        return (
            roles === authContext?.userRoles
                ? <Outlet/>
                : authContext
                ?  
                <Navigate to ='/unauthorized' state={{from:location} } replace/>
                :
                <Navigate to='/' state={{from:location} } replace/>
        )

    }
   
}
export default RequireAuth