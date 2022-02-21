import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import AdminNavigation from './AdminNavigation.js';
const ProtectedRoute = ({ component:Component, ...rest}) =>{
    
    const {currentUser} = useAuth()
    
    return (
            <Route exact {...rest}  render={(props)=>{
                if(currentUser){
                        return <Component {...props}/>
                }else{
                    return( <Redirect to={{pathname: '/admin', state:{ from: props.location} }} />);
                }
            }}/>
        )
}
export default ProtectedRoute