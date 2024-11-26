
import React, { useState, useEffect } from 'react';
import { lazy, Suspense } from 'react';

import { createRoot } from 'react-dom/client';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import  secureLocalStorage  from  "react-secure-storage";

import CryptoJS from 'crypto-js';

import { /*compareAsc,*/ format } from "date-fns";
import axios from 'axios';


// import * as enums from '../imports/enums';
import * as gbl from './global';


export function qw_renderInsideElement(elmSelector = '', classInsteadOfID = false, component)
{
  const renderComponent = <Suspense fallback={<div>Loading...</div>}>
                            {component}
                          </Suspense>
                          
  if(classInsteadOfID)
    { 
      //  Many matters
        const elements = document.getElementsByClassName(elmSelector);
      //const elements = document.querySelectorAll("."+elmSelector);   // work wrong

      Array.from(elements).forEach(elm => {
          const ElmToAdd = createRoot(elm);
                  ElmToAdd.render(renderComponent);
        });
    }
  else
    {
      const elm = document.getElementById(elmSelector);
       createRoot(elm).render(renderComponent);
    }
}


export function qw_renderElementLazy(component)
{
  const renderComponent = <Suspense fallback={<div>Loading...</div>}>
                            {component}
                          </Suspense>
  
  return renderComponent;
}

export function qw_renderElementLazy_byImport(import_url='./')
{
  let component = lazy(() => import(/* @vite-ignore */import_url));
  const renderComponent = qw_renderElementLazy(component);
  
  return <renderComponent/>;
}

export function qw_injectClass(elmSelector, classInsteadOfID = false, classToAdd) {
                   
  if(classInsteadOfID)
    { 
      //  Many matters
      const elements = document.getElementsByClassName(elmSelector);
      // const elements = document.querySelectorAll("."+elmSelector);   // work wrong

      Array.from(elements).forEach(elm => {
          elm.classList.add(classToAdd); // adds the class
        });
    }
  else
    { 
      const elm = document.getElementById(elmSelector);
              elm.classList.add(classToAdd); // adds the class
    }
}


export function qw_injectClass2(elmSelector, classInsteadOfID = false, classToAdd) {
                   
  if(classInsteadOfID)
    { 
      const elm = document.getElementsByClassName(elmSelector)[1];
              elm.classList.add(classToAdd); // adds the class
    }
  else
    { 
      const elm = document.getElementById(elmSelector);
              elm.classList.add(classToAdd); // adds the class
    }
}

export function qw_injectClass3(elmSelector= './', classToAdd='', selectorX = ElmSelectX.SelectOne) {
                   
  // if(selectorX == ElmSelectX.SelectMany)
  //   { 
  //     //  Many matters
  //     // const elements = document.getElementsByClassName(elmSelector);
  //     const elements = document.querySelectorAll(elmSelector);

  //       elements.forEach(elm => {
  //         elm.classList.add(classToAdd); // adds the class
  //       });
  //   }
  // else
  //   { 
      const elm = document.querySelector(elmSelector);
              elm.classList.add(classToAdd); // adds the class
    // }
}
////////////

export function qw_injectStyle_RootClean() {
  qw_resetMarginAndPadding("root");
  qw_resetMarginAndPadding("qw-body");
}

export function qw_resetMarginAndPadding(elmSelector) {
    var elm = document.getElementById(elmSelector);
    if (elm) {
        elm.style.margin = "0";
        elm.style.padding = "0";
    } else {
        console.log("${qw_resetMarginAndPadding.name}: Element not found");
    }
}

export function qw_injectStyle_imgSource(img_selector, img_new_src) {
  var elm = document.getElementById(img_selector);
  if (elm) {
      elm.src = img_new_src;
  } else {
      console.log("${qw_resetMarginAndPadding.name}: Element not found");
  }
}



// export function qw_injectStyle_imgSource(img_selector, img_new_src) {
//   qw_injectStyle(img_selector, {src: img_new_src}, true);
// }


export function qw_injectStyle(elm_selector, new_style={}, mergeStyle_insteadOfReplace=false) {
  var elm = document.getElementById(elm_selector);
  if (elm) {
      elm.style =  mergeStyle_insteadOfReplace ? {...elm.style, ...new_style} : new_style;
  } else {
      console.log("${qw_resetMarginAndPadding.name}: Element not found");
  }
}


export function qw_formatDate(the_date, format_str) { // eg: "yyyy-MM-dd"
    return format(new Date(the_date), format_str);
}

// Add a fixed delay so you can see the loading state
export function delayForPromise(promise, ms_delay=100) {
  return new Promise(resolve => {
    setTimeout(resolve, ms_delay);
  }).then(() => promise);
}

export async function qw_autoLogin(_email, _pass) {
  let rsl = false;

    rsl = true;

  return rsl;
}

export async function qw_loginOnline_viaEmailPass(_email, _pass) {
  let rsl = false;
  //alert("email: " + _email + " pass: " + _pass);
  const _data  = {
    email: _email,
    password:  _pass
  }

  rsl = await qw_api_post(_data, "/otp");

  return rsl;
}


export async function qw_loginOnline_viaEmailPassOtp(_email, _pass, _otp) {
  const _data  = {
    email: _email,
    password:  _pass,
    otp:   _otp,
  }

  const rsl = await qw_api_post(_data, "/users/login");

  return rsl;
}


export async function qw_api_post(_entryData, _endpointLink='eg: /used/sign') {
  let rsl = false;

  const _data  = _entryData;
  
  //:::: save data online
  const url = gbl.qwik_host__query+_endpointLink;

  const headers = {
     //'Authorization': 'Bearer yourToken',

     //'User-Agent': "PostmanRuntime/7.42.0",
     //'User-Agent': navigator.userAgent,

     //'X-Custom-User-Agent': navigator.userAgent,
     //'X-Custom-User-Agent': "PostmanRuntime/7.42.0",

     //'Postman-Token': '',
     'Content-Type': 'application/json',
     //'Content-Length': '',
     //'Host': '',
     //'User-Agent': 'PostmanRuntime/7.42.0',
     //'X-Custom-User-Agent': navigator.userAgent,
     'Accept': '*/*',
     //'Accept-Encoding': 'gzip, deflate, br',
     //'Connection': 'keep-alive',
  };
  
  try {
    const response = await qw_axiosQueryPost(url, _data, headers);
 
    //alert("OO YES!");
    
    // Access the response data
    const responseData = response.data;

    //alert('Response Data: ' + qw_dataToJsonStringFormat_(responseData));
    
    let success = false;

    success = responseData?.status === "success" ? true : false;

    if(success)
      { rsl = [true, responseData]; /*alert("Bingo!");*/ }

    return rsl;

    /*.then(function (response) {
      // handle success
      console.log(response);
    });
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });*/
  } catch (error) {

    //alert("OOPPPPS");
    console.error('Error:', error.response ? error.response.data : error.message);

    rsl = [false, /*error.message*/ error.response.data.body];
  } 

  return rsl;
}


export async function qw_processSaveDataOnlineSignup(_data = {}) {

  const rsl = await qw_api_post(_data, "/users/register");

  return rsl;
}

export async function qw_processSaveDataOnlineSignup_Infobase(_data = {}) {
  let rsl=false;
  //rsl = true;

  //:::: save data online
  const url = gbl.qwik_host__query+"/users/register";

  const headers = {
    //'Authorization': 'Bearer yourToken',

     //'User-Agent': "PostmanRuntime/7.42.0",
     //'User-Agent': navigator.userAgent,

     //'X-Custom-User-Agent': navigator.userAgent,
     //'X-Custom-User-Agent': "PostmanRuntime/7.42.0",

     //'Postman-Token': '',
     'Content-Type': 'application/json',
     //'Content-Length': '',
     //'Host': '',
     //'User-Agent': 'PostmanRuntime/7.42.0',
     //'X-Custom-User-Agent': navigator.userAgent,
     'Accept': '*/*',
     //'Accept-Encoding': 'gzip, deflate, br',
     //'Connection': 'keep-alive',
  };
  
  try {
    const response = await qw_axiosQueryPost(url, _data, headers);
 
    //alert("OO YES!");
    
    // Access the response data
    const responseData = response.data;

    //alert('Response Data: ' + qw_dataToJsonStringFormat_(responseData));
    
    let success = false;

    success = responseData?.status === "success" ? true : false;

    if(success)
      { rsl = [true, responseData]; /*alert("Bingo!");*/ }

    return rsl;

    /*.then(function (response) {
      // handle success
      console.log(response);
    });
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });*/
  } catch (error) {

    //alert("OOPPPPS");
    console.error('Error:', error.response ? error.response.data : error.message);

    rsl = [false, /*error.message*/ error.response.data.body];
  } 

  // //axios.post(url, _data)
  //  qw_axiosQueryPost(url, _data, headers)
  //   .then(response => {
  //     console.log(response.data);
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });

  //  try {
  //     const response = await axios.post(url, data, { headers: headers });
  //     console.log('Response:', response.data);
  // } catch (error) {
  //     console.error('Error:', error.response ? error.response.data : error.message);
  // }

  //:::: save data online 
  //rsl = true;
  //::::


  // lib.jsx:346
  // POST http://18.191.99.136:3000/api/v1/users/register net::ERR_CONNECTION_TIMED_OUT

  return rsl;
}


///// axios query   
export async function qw_axiosQueryGet(url='', headers={}, params={}) {
  return await axios.get(url, { headers: headers, params: params });
}

export async function qw_axiosQueryPost(url='', data={}, headers={}) {
  return await axios.post(url, data, { headers: headers });
}

export async function qw_axiosQueryPut(url='', data={}, headers={}) {
  return await axios.put(url, data, { headers: headers });
}

export async function qw_axiosQueryDelete(url='', headers={}) {
  return await axios.delete(url, { headers: headers });
}
// axios query __end here


function qw_stepProcess_email(_email) {
  let rsl = false;
  const okayFormat = qw_checkEmailFormat(_email);

  if(okayFormat)
    {
      const okayAvailable = qw_checkEmailExistenceOnServer(_email);
      
      if(okayAvailable)
        {
          //:::: all is good
           rsl = true;
          //::::
        }
    }
    return rsl;
}

export function qw_checkEmailExistenceOnServer(_email) {
  let rsl = false; // not exist yet
  
  rsl = true;

  return rsl;
}

export function qw_checkEmailAvailable(_email) {
  return qw_checkEmailExistenceOnServer(_email);
}

export async function qw_performPassRestaure(_email, _newPass) {
  let rsl = false;
  //alert("email: " + _email);
  const _data  = {
    //tokenType: "reset-password",
      email: _email,
      password: _newPass,
  }

  rsl = await qw_api_post(_data, "/reset");

  return rsl;
}


export async function qw_performForgottenPass(_email) {
  let rsl = false;
  //alert("email: " + _email);
  const _data  = {
    tokenType: "reset-password",
    email: _email,
  }

  rsl = await qw_api_post(_data, "/validationToken");

  return rsl;
}

export function qw_alert(msg) {
  return alert(msg);
}


export function qw_alertSomething() {
  return alert("BINGO here...");
}

export function qw_alertInfo(msg) {
  toast.info(msg, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
    theme: "light",
    // transition: Bounce,
    });
}

export function qw_alertWarning(msg) {
  toast.error(msg, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
    theme: "light",
    // transition: Bounce,  // Bounce, Zoom
    });
}

export function qw_alertGood(msg) {
  toast.success(msg, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
    theme: "light",
    // transition: Bounce,
    });
    qw_pause();
}


export function qw_alertPromise_(msg) {
    toast.promise(msg, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
    theme: "light",
    // transition: Bounce,
    });
    qw_pause();
}

export function qw_alertPromise_pro(def_wait, autoclose_delay) {
  const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, def_wait));
  return toast.promise(
      resolveAfter3Sec,
      {
        pending: 'Pending',
        success: 'successful 👌',
        error: 'Unsuccessful 🤯',

        // pauseOnFocusLoss: false,
        // autoClose: autoclose_delay,
      }
  )
}

export function qw_alertPromise_loading(msg, cleanZoneFirst=false) {
  if(cleanZoneFirst)
    { qw_alertToast_dismissAll(); }
    const id = toast.loading(msg);
  return id;
}

export function qw_alertPromise_loadingResult(rsp=false, msgSuccessful='', msgUnsuccessful='', emitter_id, pauseOnFocusLoss=false, hideProgressBar=true, removeAfter=true, cleanZoneFirst=true, autoclose_delaySuccess=2000, autoclose_delayWrong=3000) {
    
    if(!removeAfter) {
       if(rsp)
         { qw_alertPromise_loadingResultGood(msgSuccessful, emitter_id, pauseOnFocusLoss, hideProgressBar); }
       else
         { qw_alertPromise_loadingResultWrong(msgUnsuccessful, emitter_id, pauseOnFocusLoss, hideProgressBar); }
      }
    else {
        if(rsp)
          { qw_alertPromise_loadingResultGood(msgSuccessful, emitter_id, pauseOnFocusLoss, hideProgressBar, autoclose_delaySuccess); }
        else
          { qw_alertPromise_loadingResultWrong(msgUnsuccessful, emitter_id, pauseOnFocusLoss, hideProgressBar, autoclose_delayWrong); }
      }

     //if(removeAfter) qw_alertToast_dismiss(emitter_id);
  }

export function qw_alertPromise_loadingResultGood(msg, emitter_id, pauseOnFocusLoss=false, hideProgressBar=true, autoclose_delay) {
  toast.update(emitter_id, {
      render: msg,
      type: "success",
      isLoading: false,

      hideProgressBar: hideProgressBar,
      closeOnClick: !autoclose_delay,
      pauseOnFocusLoss: pauseOnFocusLoss,
      autoClose: autoclose_delay,
    });
  }

export function qw_alertPromise_loadingResultWrong(msg, emitter_id, pauseOnFocusLoss=false, hideProgressBar=true, autoclose_delay) {
  toast.update(emitter_id, { 
      render: msg,
      type: "error",
      isLoading: false,

      hideProgressBar: hideProgressBar,
      closeOnClick: !autoclose_delay,
      pauseOnFocusLoss: pauseOnFocusLoss,
      autoClose: autoclose_delay,
    });
  }

export async function qw_alertPromise(func_that_return_promise, pending_msg, success_msg, error_msg) {
const response = await toast.promise(
    func_that_return_promise,
    {
      pending: pending_msg,
      success: success_msg+' 👌',
      error: error_msg+' 🤯'
    }
  );
};

export function qw_alertToast_dismiss(toast_id) {
   toast.dismiss(toast_id);
}

export function qw_alertToast_dismissAll() {
  toast.dismiss();
}

export function qw_alert_(msg, notifTyp=NotifType.Warning) {
  return alert(msg);
}

export function qw_pause(waiting_ms = 2000) {
    setTimeout(() => {
      console.log("Waiting...");
    }, waiting_ms); // 3000 milliseconds = 3 seconds
}

export function qw_checkPassMatchOnServer(_pw) {
  return true;
}


export function qw_processSaveDataInCash(id, _data) {
  let rsl=false;

  secureLocalStorage.setItem(id, _data);
  //:::: save data online
    rsl = true;
  //::::

  return rsl;
}


export function qw_processGetDataFromCash(id, _data) {
  let rsl=false;

  //:::: save data online
  secureLocalStorage.setItem(id, _data);
  rsl = true;
  //::::

  return rsl;
}


export function qw_processSaveDataInLocalCash(id, _data) {
  let rsl=false;

  // vite
   const apiKey = import.meta.env.VITE_API_KEY;
   const apiUrl = import.meta.env.VITE_API_URL;

  // react
  // const apiKey_R = process.env.REACT_APP_API_KEY;
  // const apiUrl_R = process.env.REACT_APP_API_URL;


  // const encryptedData = CryptoJS.AES.encrypt('your_data', 'secret_key').toString();
  // const decryptedData = CryptoJS.AES.decrypt(encryptedData, 'secret_key').toString(CryptoJS.enc.Utf8);
  

  //:::: save data online
  rsl = true;
  //::::
  
  return rsl;
}

export function qw_processGetDataFromLocalCash(id, _data) {
  let rsl=false;

  // //:::: save data online
  // secureLocalStorage.setItem(id, _data);
  // rsl = true;
  // //::::

  // const encryptedData = CryptoJS.AES.encrypt('your_data', 'secret_key').toString();
  // const decryptedData = CryptoJS.AES.decrypt(encryptedData, 'secret_key').toString(CryptoJS.enc.Utf8);
  
  
  return rsl;
}

///// Secure Storage
export function qw_securestorage_saveData(id, data) {
  secureLocalStorage.setItem(id, data);
};

export function qw_securestorage_getData(id) {
    const data = secureLocalStorage.getItem(id);
    return data;
}

export function qw_securestorage_removeData(id) {
    secureLocalStorage.removeItem(id);
 }
 
 export function qw_securestorage_clearAllData() {
   secureLocalStorage.clear();
 }
////////

/////// secure storage User RegisterInfo
export function qw_securestorage_saveUserRegisterInfo(reg_data) {
  let rsl = false;
  qw_securestorage_saveData("userRegData", qw_dataToJsonStringFormat(reg_data));
  rsl = true; return rsl;
};

export function qw_securestorage_getUserRegisterInfo() {
  const reg_data = qw_dataFromJsonStringToObject(qw_securestorage_getData("userRegData"));
  return reg_data;
};
////

export function qw_securestorage_removeUserRegisterInfo()
 { qw_securestorage_removeData("userRegData"); };

//___

export function qw_securestorage_saveUserCredentials(email, password) {

  const cred_data = {
    email: email,
    password: password,
  }
  qw_securestorage_saveData("userCredentials", qw_dataToJsonStringFormat(cred_data));
};

export function qw_securestorage_getUserCredentials() {
  const cred_data = qw_dataFromJsonStringToObject(qw_securestorage_getData("userCredentials"));
  //alert(`Email: ${data.email}, Password: ${data.password}`);
  return cred_data;
};

export function qw_securestorage_removeUserCredentials()
{
  qw_securestorage_removeData("userCredentials");
};
/////// secure storage User RegisterInfo __end here


//////


export function qw_isEmptyMap(map = {}) {
  // Check if the map is empty
  if (Object.keys(map).length === 0)
    { return true; }
  else
    { return false; }
}

export function qw_isDigit(_param){
  let rsl = false;
    rsl = qw_isNumber(_param, true);
  return rsl;
}


export function qw_isNumber(_param='', strict_digit=false){
  let rsl = false;

  if (strict_digit) {
    if (_param.length === 1 && _param.match(/[0-9]/))
     { rsl = true; }
  }
  else if(_param.match(/^[0-9]+$/))
    { rsl = true; }

  return rsl;
}

export function qw_isEmptyStringOrData(data) {
  let rsl = false;
  if (typeof data === "string" && data.trim().length === 0) {
      rsl = true
      //console.log("The string is empty");
  } else if (data === null || data === undefined) {
      rsl = true;
      //console.log("The data is null or undefined");
  }
  return rsl;
}

// Function to set focus on an element by its ID
export function qw_getfocusOnElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
      element.focus();
      console.log(`${elementId} gained focus`);
  } else {
      console.log(`Element with ID ${elementId} not found`);
  }
}

export function getElementStyleById(elementId, property) {
 
      // Get the computed style of the element
      var style = getElementStyleAllById(elementId);
      
      // Return the value of the specified property
      return style.getPropertyValue(property);
}

// Example usage:
//var backgroundColor = getElementStyleById("myElement", "background-color");
//console.log("Background color:", backgroundColor);


export function getElementStyleAllById(elementId) {
  // Get the element by its ID
  var element = document.getElementById(elementId);
  
  // Check if the element exists
  if (element) {
      // Get the computed style of the element
      var style = window.getComputedStyle(element);
      
      // Return the value of the specified property
      return style;
  } else {
      console.error("Element with ID '" + elementId + "' not found.");
      return null;
  }
}

export function qw_hideElement(elementId) {
  var element = document.getElementById(elementId);
  if (element) {
      element.hidden = true;
  }
}

export function qw_toggleHidden(elementId) {
  var element = document.getElementById(elementId);
  if (element) {
      element.hidden = !element.hidden;
  }
}


export function qw_dataMergerInSingleObject_(objectsArray) {
  return objectsArray.reduce((acc, obj) => ({ ...acc, ...obj }), {});
}

export function qw_dataMergerInSingleObject(data1, data2={}, data3={}, data4={}, data5={}) {
  return ({ ...data1, ...data2, ...data3, ...data4, ...data5});
}

export function qw_dataFromJsonStringToObject(json_string){
  return JSON.parse(json_string);
}
////


////  Json and Data
export function qw_dataToJsonStringFormat(data={}, level=2){
  return JSON.stringify(data, null, level)
}

export function qw_dataToJsonStringFormat_(data={}){
  return JSON.stringify(data)
}
////

export function getElementPositionById(elementId) {
  // Get the element by its ID
  var element = document.getElementById(elementId);
  
  // Check if the element exists
  if (element) {
      // Get the computed style of the element
      var style = window.getComputedStyle(element);
      
      // Retrieve the position properties
      var position = {
          top: style.getPropertyValue('top'),
          left: style.getPropertyValue('left'),
          right: style.getPropertyValue('right'),
          bottom: style.getPropertyValue('bottom')
      };
      
      return position;
  } else {
      console.error("Element with ID '" + elementId + "' not found.");
      return null;
  }
}

// Example usage:
//var position = getElementPositionById("myElement");
//console.log("Position:", position);


// ----- VALIDATOR

export function isValidDate(dateString) {
  const regex = /^\d{1,2}\/\d{1,2}\/\d{4}$/; // MM/DD/YYYY or DD/MM/YYYY format
  if (!regex.test(dateString)) {
    return false; // Invalid date format
  }

  const parts = dateString.split('/');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return false; // Invalid date values
  }

  if (month < 1 || month > 12) {
    return false; // Invalid month
  }

  if (day < 1 || day > 31) {
    return false; // Invalid day
  }

  if (month === 2) {
    // February
    if (day > 29) {
      return false; // Invalid day for February
    }
    if (day === 29 && !isLeapYear(year)) {
      return false; // Invalid day for non-leap year February
    }
  }

  if (month === 4 || month === 6 || month === 9 || month === 11) {
    // April, June, September, November
    if (day > 30) {
      return false; // Invalid day for these months
    }
  }

  return true; // Valid date
}

export function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function qw_getMapObjectEntry(data= {}, from=0, to=0)
{
  return Object.fromEntries(Object.entries(data).slice(from, to));
}

export function qw_validatedForm(validate_callData = {}, notifOnePerOne=true) {
  let rsl = false;

  //:::: notifier
    qw_validatorNotifier(validate_callData, notifOnePerOne);
  //::::

  //:::: check if there is any wrongness
     rsl =  qw_isEmptyMap(validate_callData);
  //::::

   return rsl;
}

export function qw_validatorNotifier(errorsData = {}, notifOnePerOne=true) {
  // reach and display the error
  
  let errors = errorsData;

  if(notifOnePerOne) { errors = qw_getMapObjectEntry(errorsData, 0, 1); }

  Object.keys(errors).forEach((key) => {
     qw_alertWarning(errors[key]);
    // if(notifOnePerOne === true) return;
  });
  
}

export function qw_validateName(name) {
  // Check if the name is not empty
  if (!name || name.trim() === '') {
    return false;
  }

  // Check if the name contains only letters, spaces, and apostrophes
  let nameRegex = /^[a-zA-Z\s']+$/
  if (!nameRegex.test(name)) {
    return false;
  }

  // Check if the name has at least 2 characters
  if (name.trim().length < 2) {
    return false;
  }

  return true;
}


export function qw_validatePhoneCode(phoneCode) {
  // Check if the phone number matches the pattern of a valid phone number
  let phoneCodeRegex = /^(\+?)([0-9]{1,4})$/;

  if (!phoneCodeRegex.test(phoneCode)) {
    return false;
  }
  return true;
}

export function qw_validatePhoneNumber(phoneNumber) {
  // Remove all non-digit characters from the phone number
  let cleanedPhoneNumber = phoneNumber.replace(/\D+/g, '');

  // Check if the phone number has at least 10 digits
  if( cleanedPhoneNumber.length < 8 )   // < 10
    { return false; }

  // Check if the phone number matches the pattern of a valid phone number
  let phoneRegex = /^\+?\(?([0-9]{1,3})\)?[-. ]?([0-9]{1,3})[-. ]?([0-9]{4,10})$/;

  if(!phoneRegex.test(phoneNumber))
    { return false; }

  return true;
}

export function qw_validateLength(item, length_min=2, length_max=100) {
  
  if (item.length <= length_max && item.length >= length_min)
    { return true }

  return false;
}

export function qw_validateVATNumber(vatNumber) {
  const countryCodes = {
    'AT': /^[A-Z]{1}[0-9]{8}$/, // Austria
    'BE': /^[0-9]{10}$/, // Belgium
    'BG': /^[0-9]{9,10}$/, // Bulgaria
    'CY': /^[0-9]{8}[A-Z]{1}$/, // Cyprus
    'CZ': /^[CZ][0-9]{8,10}$/, // Czech Republic
    'DE': /^[0-9]{9}$/, // Germany
    'DK': /^[0-9]{8}$/, // Denmark
    'EE': /^[0-9]{9}$/, // Estonia
    'EL': /^[0-9]{9}$/, // Greece
    'ES': /^[0-9]{8}[A-Z]{1}$/, // Spain
    'FI': /^[0-9]{8}$/, // Finland
    'FR': /^[0-9]{11}$/, // France
    'GB': /^[0-9]{9,12}$/, // United Kingdom
    'HR': /^[0-9]{11}$/, // Croatia
    'HU': /^[0-9]{8}$/, // Hungary
    'IE': /^[0-9]{8}[A-Z]{1,2}$/, // Ireland
    'IT': /^[0-9]{11}$/, // Italy
    'LT': /^[0-9]{9,12}$/, // Lithuania
    'LU': /^[0-9]{8}$/, // Luxembourg
    'LV': /^[0-9]{11}$/, // Latvia
    'MT': /^[0-9]{8}$/, // Malta
    'NL': /^[0-9]{9}$/, // Netherlands
    'PL': /^[0-9]{10}$/, // Poland
    'PT': /^[0-9]{9}$/, // Portugal
    'RO': /^[0-9]{10,13}$/, // Romania
    'SE': /^[0-9]{12}$/, // Sweden
    'SI': /^[0-9]{8}$/, // Slovenia
    'SK': /^[0-9]{10}$/, // Slovakia
    'ZA': /^[0-9]{10}[0-9]{2}[ 0-9]{2}$/, // South Africa
    'EG': /^[0-9]{10}[0-9]{2}[0-9]{2}$/, // Egypt
    'MA': /^[0-9]{10}[0-9]{2}[0-9]{1}$/, // Morocco
    'NG': /^[0-9]{10}[0-9]{2}$/, // Nigeria
    'KE': /^[0-9]{10}[0-9]{1}$/, // Kenya
    'US': null, // United States (no VAT)
    'CA': /^[0-9]{9}[A-Z]{2}[0-9]{4}$/, // Canada
    'MX': /^[0-9]{12}[A-Z]{1}$/, // Mexico
    'BR': /^[0-9]{12}[A-Z]{2}$/, // Brazil
  };

  const countryCode = vatNumber.substring(0, 2);
  const vatNumberRegex = countryCodes[countryCode];

  //:::: Country code not supported
  if( !vatNumberRegex )
    { return qw_validateLength(vatNumber, 8, 15); }
 //::::

  const isValid = vatNumberRegex.test(vatNumber);

  return isValid;
}

export function qw_validateEmailFormat(_email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(_email);
}

export function qw_validateMustBeGreaterThan(input_or_number, greaterThan_nb=0) {
  
  let rsl = false;
  // Convert string to integer
  let number = parseInt(input_or_number, 10);

  // Check if the number is greater than 1000
  if (!isNaN(number)) {
      if(number > greaterThan_nb)
        { rsl = true }
    }

  return rsl;
}

export function qw_checkEmailFormat(_email) {
  return qw_validateEmailFormat(_email);
}


export function qw_checkPasswordMatch(pass1, pass2) {
  return (pass1 === pass2);
}


export function qw_validateBankBIC(_bic) {
  let rsl = false;
  const bicPattern = /^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/;

  if(bicPattern.test(_bic))
    { rsl = true; }

  return rsl;
}


export function qw_validateBankIBAN(_iban) {
  let rsl = false;
  //alert(_iban);
  _iban = qw_removeSpaces(_iban);

  const ibanPattern = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/;
  
  if(ibanPattern.test(_iban))
    { rsl = true; }
  
  return rsl;
}

export function qw_removeSpaces(_str='') {
  return _str.replaceAll(" ", "");
}



// function validateIBAN() {
//   const iban = document.getElementById('iban').value;
//   const result = document.getElementById('result');
//   const ibanPattern = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/;

//   if (ibanPattern.test(iban)) {
//       result.textContent = 'Valid IBAN';
//       result.style.color = 'green';
//   } else {
//       result.textContent = 'Invalid IBAN';
//       result.style.color = 'red';
//   }
// }

// ----- VALIDATOR