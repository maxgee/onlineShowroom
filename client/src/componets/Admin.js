import React, { Component ,useState } from 'react';
import { BrowserRouter as Router,Switch, Route,   useLocation} from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import AdminNavigation from './AdminNavigation.js';
import AdminLogin from './AdminLogin.js';
import AdminControlPannel from './AdminControlPannel.js';
import addInventory from './addInventory.js';
import updateCar from './updateCar.js' ;
import uploadImages from './imageUploader.js';
import MyAccount from './MyAccount.js';
import adminService from './adminService';
import NewInvoice from './newInvoice.js';
import invoiceRepair from './newInvoiceRepairs.js';
import createdInvoice from './createdInvoice.js';
import invoicePDF from './invoicePDF.js';
import ForgotPassword from './forgotPassword';
import ProtectedRoute from './ProtectedRoute.js';

import {useAuth} from '../context/AuthContext.js';
export default  function Admin(){
        const {currentUser} = useAuth()
    return(
        <div>
                <Switch>
                <Route exact path='/admin' component={AdminLogin}></Route>
                
                <Route>
                        <ProtectedRoute path='/admin/adminpannel' component={AdminControlPannel}  />
                        <ProtectedRoute path='/admin/addInventory' component={addInventory}  />
                        <ProtectedRoute path='/admin/service' component={adminService}  />
                        <ProtectedRoute path='/admin/newInvoice' component={NewInvoice}  />
                        <ProtectedRoute path='/admin/invoice/:id' component={invoiceRepair} />
                        <ProtectedRoute path='/admin/createdInvoice/:id' component={createdInvoice} />
                        <ProtectedRoute path='/admin/invoicePDF/:id' component={invoicePDF} />
                        <ProtectedRoute path='/admin/uploadImages/:id' component={uploadImages} />
                        <ProtectedRoute  path='/admin/updateCar/:id' component={updateCar}  />
                        <ProtectedRoute path='/admin/myaccount' component={MyAccount} />
                </Route>
                </Switch>
        </div>
        );
}