import {Navigate} from 'react-router-dom'


export const PrivateRoutes=({children}) =>{
    const getTokenFromlocalStorage=localStorage.getItem("token")
return getTokenFromlocalStorage?.token!==undefined ? children : (<Navigate to ='/Login' replace={true}/>)


}
