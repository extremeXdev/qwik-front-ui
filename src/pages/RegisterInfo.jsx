
import * as React from "react";

import { useNavigate } from 'react-router-dom';
//  import { getRoute, routesFront } from "../imports/routes.tsx";

import /*React,*/ { useState, useEffect } from 'react';

import * as utils from '../imports/lib';
import RegisterStepper from "./RegisterStepper.jsx";

import Alert from "../components/Alert";

const RegisterInfo = () => {
  /*
  const navigate = useNavigate();

 //// redirect to register step when user is new
  useEffect(() => {
  //:::: save data in cash
  // const okaySaveInCache = utils.qw_processSaveDataInCash(_data);
  const regDataInCash = utils.qw_securestorage_getUserRegisterInfo();   // secure storage
  //::::

  //:::: send-save online
   const okayDataInCash = !utils.qw_isEmptyStringOrData(regDataInCash);
  //::::
  
  //:::: move to next step
    if(!okayDataInCash)
      { navigate('/register'); }  //'/register/infobase
 }, []);
*/

 //alert( utils.qw_dataToJsonStringFormat(utils.qw_securestorage_getUserRegisterInfo()) );

  return (
    <>
      <Alert/>
      <RegisterStepper/>
    </>
  );
}; 

export default RegisterInfo;
