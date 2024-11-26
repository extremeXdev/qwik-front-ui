
import { useState, useEffect } from 'react'
//import Link from "react-router-dom"


import * as React from "react";

import { lazy, Suspense, startTransition } from 'react';

import { useNavigate } from 'react-router-dom';
import * as utils from '../imports/lib';

import Stepper from "awesome-react-stepper";
import '../styles/RegisterStepper.css';

import * as restyle from '../styles/Register-restyle.css';


// import Register from "./Register";
import RegisterInfoBase from '../pages-step/RegisterInfoBase.jsx';
import RegisterInfoRep from '../pages-step/RegisterInfoRep.jsx';
import RegisterInfoFin from '../pages-step/RegisterInfoFin.jsx';
import { FormikConsumer } from 'formik';
import RegisterInfoFinal from '../pages-step/RegisterInfoFinal.jsx';
import Register from './Register';

import QwikLogoImg from '../assets/qwik-logo-lg.png';

import QwikLogoImg_short from '../assets/qwik-logo.png';


    // // :::: pages load first
    // // const Alert = lazy(() => import("../components/Alert"));
    // const RegisterInfoBase = lazy(() => utils.delayForPromise(import('../pages-s/RegisterInfoBase.jsx')));
    // const RegisterInfoRep  = lazy(() => utils.delayForPromise(import('../pages-step/RegisterInfoRep.jsx')));
    // const RegisterInfoFin  = lazy(() => utils.delayForPromise(import('../pages-step/RegisterInfoFin.jsx')));
    // const NotFound         = lazy(() => utils.delayForPromise(import('../pages/NotFound.jsx')));
    // // ::::
    //const Register  = lazy(() => utils.delayForPromise(import('./Register')));

function RegisterStepper() {
  //const [count, setCount] = useState(0)

  const [formData, setFormData] = useState({});

  const [form1Data, setForm1Data] = useState({});
  const [form2Data, setForm2Data] = useState({});
  const [form3Data, setForm3Data] = useState({});
  const [form4Data, setForm4Data] = useState({});

  const [defaultStep, setDefaultStep] = React.useState(1);
  const [activeStep, setActiveStep] = React.useState(defaultStep);
  const [stepFinal, setStepFinal] = React.useState(4);

  // const btnID = 'reg-default-submit';
  const btnID = 'reg-submit';


//  // Get the stepper button element
  const stepperContinueBtn = document.getElementById('stepperContinueBtn');
  const stepperBackBtn   = document.getElementById('stepperBackBtn');
  const stepperSubmitBtn = document.getElementById('stepperSubmitBtn');

  const navigate = useNavigate();

//  // Trigger the onClick event programmatically
//  button.click();

// Change Step view Effect
useEffect(() => {
    //if(formData!={})alert(utils.qw_dataToJsonStringFormat(formData));

    // Attach the event handler using addEventListener
    //stepperContinueBtn.addEventListener('click', handleClick);
    // Define the onClick event handler
    // stepperContinueBtn.onclick = function() {
    // alert('Button was clicked!');
    // stepperContinueBtn.click();
   
    // stepperContinueBtn.click();

      updateFormData(form1Data, 1);
      updateFormData(form2Data, 2);
      updateFormData(form3Data, 3);
      updateFormData(form4Data, 4);
  }, [form1Data, form2Data, form3Data, form4Data]);


// // Change Step view Effect
// useEffect(() => {
//   utils.qw_injectStyle_imgSource("qwik-logo-id", QwikLogoImg_short);
// }, []);


//   const updateFormData_ = (data) => {
//     setForm2Data(data);
//   };
  
  const updateFormData = (data, form_nb=1) => {

    if(form_nb===1)
        setForm1Data(data);
    else if(form_nb===2)
        setForm2Data(data);
    else if(form_nb===3)
        setForm3Data(data);
    else if(form_nb===4)
        setForm4Data(data);
    
    //:::: join them in a single
       setFormData( utils.qw_dataMergerInSingleObject(form1Data, form2Data, form3Data, form4Data));
    //::::
  };

  function handleActiveStepChange(step){
    setActiveStep(step);
  }

  const incrementActiveStep = () => {
    let cnt = activeStep;
    cnt = (cnt >= stepFinal) ? stepFinal : cnt+1;
    setActiveStep(cnt);
};
const decrementActiveStep = () => {
    let cnt = activeStep;
    cnt = (cnt <= defaultStep) ? defaultStep : cnt-1;
    setActiveStep(cnt);
};

function continueNextformStep() {
    stepperContinueBtn.click();
    //incrementActiveStep();  -- done
}

function backNextformStep() {
    stepperBackBtn.click();
    //decrementActiveStep();    -- done
}

function submitFormFinalStep() {
    stepperSubmitBtn.click();
}

//::::: SUBMIT DATA
async function processShouldFinalizeSignup(_data = {}) {

     // alert(utils.qw_dataToJsonStringFormat(_data));

      //:::: save data online
      // const [okaySaveOnline, rspData_orMsg] = await utils.qw_processSaveDataOnlineSignup(_data);
      //::::

      //:::: ui purpose: TEST
      const okaySaveOnline =  true;
      //::::
      
      //:::: move to next step
        if(okaySaveOnline)
          { 
            //alert(utils.qw_dataToJsonStringFormat(_data));
            
            //::::
              utils.qw_alertGood("final Step submit online...");
            //::::

             //:::: automaticaly login or create login session
             //  utils.qw_autoLogin(formData.email, formData.password);
             //::::

             //:::: remove saved data in secure cash
             // utils.qw_securestorage_removeUserRegisterInfo();
             //::::

             //:::: move
             //  utils.delayForPromise(navigate('/dashboard'), 1000);
             //  navigate('/dashboard');
             //:::: redirect

          }
        else 
          {  /*utils.qw_alertWarning("Something seem wrong, try again or comeback later");*/ }
      //::::
      
      return [okaySaveOnline, rspData_orMsg];
}
    
async function finalProcess() { 
  //utils.qw_alertSomething();

  //:::: save data in cash
  // const okaySaveInCache = utils.qw_processSaveDataInCash(_data);
  //  const regSavedData = utils.qw_securestorage_getUserRegisterInfo();   // secure storage
  //::::
 
  const establ_date = utils.qw_formatDate(formData.establishmentDate, "yyyy-MM-dd");

    const data_toSend = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.countryCode + formData.phoneNumber,

      legalBusinessName: formData.legalName,
      businessName: formData.commercialName,
      legalForm: formData.legalForm,
      registrationNumber: formData.registrationNumber,
      dateOfIncorporation: establ_date,
      headOfficeAddress: formData.headquartersAddress,
      vatNumber: formData.vatNumber,

      legalRepresentativeName: formData.reprLegalName,
      legalRepresentativeTitle: formData.reprLegalTitle, 
      legalRepresentativeAddress: formData.reprRegisteredOfficeAddress,
      legalRepresentativePhone: formData.reprPhoneNumber,
      legalRepresentativeEmail: formData.reprEmail,
      
      email: formData.email,                       // "stanis@gmail.com"
      
      annualTurnover: formData.anualTurnover,
      bankName: formData.bankName,
      bankDetails: formData.bankDetails,
      iban: formData.bankIban,
      bic: formData.bankBic,
      
      password: formData.password,                // "admin12345"
      confirmPassword: formData.password,         // "admin12345"
    };
    
    // utils.qw_alertWarning("OOPs!");
    
    //:::: continue with right data
    const rsl =  await processShouldFinalizeSignup(data_toSend);
    //::::
    
    return rsl;
}

//:::::
const handleFormStepperBtn = async (isFinal=false, displayExtraExitPage=false) => {
    if(isFinal)
      {  
        if(!displayExtraExitPage)
          { submitFormFinalStep(); }

           //utils.qw_injectStyle_imgSource("qwik-logo-id", QwikLogoImg_short);
           //utils.qw_injectStyle("qwik-logo-id", {max-width} )
           
           const waiterNotif = utils.qw_alertPromise_loading("Please wait...", true);
             const [rsp_done, rspData_orMsg] = await finalProcess();
           utils.qw_alertPromise_loadingResult(rsp_done,
                                               "Success",
                                               rspData_orMsg,  /*"Something went wrong, try again or comeback later"*/
                                               waiterNotif, true, true, true, 2000, 3000 );

              if(rsp_done && displayExtraExitPage)
                { continueNextformStep();
                    submitFormFinalStep(); }
      }
    else
      { continueNextformStep(); }
 }

  return (    
      <>
        <Stepper
            strokeColor="#17253975"
            fillStroke="#172539"
            activeColor="#172539"
            activeProgressBorder="2px solid #17253975"
            barWidth = "100%"
            showProgressBar ={true}
            defaultActiveStep={defaultStep} //
            btnPos = "normal"   // 'center' | 'end' | 'flex-end' | 'flex-start' | 'inherit' | 'initial' | 'left' | 'normal' | 'revert' | 'right' | 'space-around' | 'space-between' | 'space-evenly' | 'start' | 'stretch' | 'unset';
            allowClickControl = {false}

            submitBtn={<button id="stepperSubmitBtn" hidden={true} /*onClick={ () => alert("Youpii")}*/ className="stepperBtn--wrongclass">Submit</button>}
            continueBtn={<button id="stepperContinueBtn" hidden={true} className="stepperBtn--wrongclass">Next</button>}
            backBtn={<button id="stepperBackBtn" className="stepperBtn"> {"<"} </button>}
            
            onSubmit={
                (step) => console.log(`Thank you!!! Final Step -> ${activeStep}`) /*alert(`Final Step -> ${step}`)*/
            }
            onContinue={
                (step) => { incrementActiveStep(); console.log(`Thank you!!! Step forward -> ${activeStep}`); }
             }
             onPrev={
                (step) => { decrementActiveStep(); console.log(`Thank!!! Step -> ${activeStep}`); }
             }
         >
                {/* Wrongness, style error and vite display issues */}
            <div className="stepperSubDiv">
                <Register btnID={btnID} displayLogo={true} stepN={1} stepZ={stepFinal} formData={form1Data} updateFormData={updateFormData}  onClick_Promise={handleFormStepperBtn}/>
            </div>
            <div className="stepperSubDiv">
                <RegisterInfoBase btnID={btnID} displayLogo={true} displayStep={true} stepN={2} stepZ={stepFinal} formData={form2Data} updateFormData={updateFormData}  onClick_Promise={handleFormStepperBtn}/>
            </div>
            <div className="stepperSubDiv">
                <RegisterInfoRep btnID={btnID} displayLogo={true} displayStep={true} stepN={3} stepZ={stepFinal} formData={form3Data} updateFormData={updateFormData} onClick_Promise={handleFormStepperBtn}/>
            </div>
            <div className="stepperSubDiv">
                <RegisterInfoFin btnID={btnID} displayLogo={true} displayStep={true} stepN={4} stepZ={stepFinal} formData={form4Data} updateFormData={updateFormData}  onClick_Promise={handleFormStepperBtn}/>
            </div>
            <div className="stepperSubDiv">
                <RegisterInfoFinal btnID={btnID} displayLogo={true} displayStep={true} stepN={4} stepZ={stepFinal} formData={form4Data} updateFormData={updateFormData}  onClick_Promise={handleFormStepperBtn}/>
            </div>
        </Stepper>
      </>
  );
}

export default RegisterStepper;