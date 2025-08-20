import { Outlet,Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ()=>{
    const authStatus=useSelector((state)=>state.auth.status)
    if(authStatus){
        return <Outlet/>
    } 
    else{
        return <Navigate to='/login'/>
    }

}

export default ProtectedRoute