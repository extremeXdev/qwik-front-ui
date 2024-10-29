
import React, { useState, useEffect } from 'react';

import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import { lazy, Suspense } from 'react';

// !!! Issues with styles and rendering !!!
// abort!
// import Dashboard_ from './Dashboard';
// import Login from './Login';
// import TwoFactor_ from './TwoFactor';
// import RegisterInfo_ from "./RegisterInfo";
// import Home_ from "./Home";
// import NotFound_ from "./NotFound";
// import ForgotPass_ from "./ForgotPass";

// attempt solving style issues
// import { Dashboard as Dashboard_ } from './Dashboard';
// import { Login as Login_ } from './Login';
// import { Register as Register_} from "./RegisterInfo";
// import { TwoFactor as TwoFactor_ } from './TwoFactor';
// import { RegisterInfo as RegisterInfo_ } from "./RegisterInfo";
// import { Home as Home_ } from "./Home";
// import { NotFound as NotFound_ } from "./NotFound";
// import { ForgotPass as ForgotPass_ } from "./ForgotPass";

import * as utils from '../imports/lib';

    //:::: pages load first
    const Login = lazy(() => import('./Login'));
    const Register = lazy(() => import('./Register'));
    const Register_ = utils.qw_renderElementLazy_byImport('./Register');
    const TwoFactor = lazy(() => import('./TwoFactor'));
    const RegisterInfo = lazy(() => import("./RegisterInfo"));
    const Home = lazy(() => import("./Home"));
    const NotFound = lazy(() => import("./NotFound"));
    const ForgotPass = lazy(() => import("./ForgotPass"));
    const RestaurePass = lazy(() => import("./RestaurePass"));
    const Dashboard = lazy(() => import("./Dashboard"));

    const Alert = lazy(() => import("../components/Alert"));
    //::::


function BaseRouter() {

    // attempt solving style issues suit
    // // :::: pages load first
    // let Login = <Login_/>;
    // let Register = <Register_/>;
    // let TwoFactor = <TwoFactor_/>;
    // let RegisterInfo = <RegisterInfo_/>;
    // let Home = <Home_/>;
    // let NotFound = <NotFound_/>;
    // let ForgotPass = <ForgotPass_/>;
    // // ::::

    // //:::: pages load first
    // let Login = null;
    // let Register = null;
    // let Register_ = null;
    // let TwoFactor = null;
    // let RegisterInfo = null;
    // let Home = null;
    // let NotFound = null;
    // let ForgotPass = null;
    // //::::

    // //:::: pages load first
    // useEffect(() => {
    // Login = lazy(() => import('./Login'));
    // Register = lazy(() => import('./Register'));
    // Register_ = utils.qw_renderElementLazy_byImport('./Register');
    // TwoFactor = lazy(() => import('./TwoFactor'));
    // RegisterInfo = lazy(() => import("./RegisterInfo"));
    // Home = lazy(() => import("./Home"));
    // NotFound = lazy(() => import("./NotFound"));
    // ForgotPass = lazy(() => import("./ForgotPass"));   
    // }, []);
    // //::::

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
         <Alert/>
         <Home/>
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
         <Alert/>
         <Login/>
        </>
      ),
    },
    {
      path: "/register",
      element: (
        <>
         <Alert/>
         {/*<Register/>*/}
         <RegisterInfo/>
        </>
      ),
    },
    /*{
      path: "register/infobase/*",
      element: (
        <>
         <Alert/>
         <RegisterInfo/>
        </>
      ),
    }*/,
    {
      path: "/validate",
      element: (
        <>
         <Alert/>
         <TwoFactor/>
        </>
      ),
  },
    {
      path: "login/forgotpw",
      element: (
        <>
         <Alert/>
         <ForgotPass/>
        </>
      ),
    },
    {
      path: "login/restorepw",
      element: (
        <>
         <Alert/>
         <RestaurePass/>
        </>
      ),
    },
    {
      path: "/dashboard",
      element:  (
        <>
         <Alert/>
         <Dashboard/>
        </>
      ),
    },
    {
      path: "/*",
      element: <NotFound/>,
    },
  ]);
  
  createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
  );
  

// import ReactDOMClient from 'react-dom/client';

// const container = document.getElementById('root');
// let root;

// if (!container._reactRootContainer) {
//     root = ReactDOMClient.createRoot(container);
// } else {
//     root = container._reactRootContainer._internalRoot;
// }

  return (
      <></>
  );
}

export default BaseRouter;