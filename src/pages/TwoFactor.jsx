
import React, { useState, useEffect } from 'react';
import QwikLogo from '../assets/qwik-logo-lg.png';

import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import * as utils from '../imports/lib';

import '../styles/TwoFactor.css';

function TwoFactor() {
//  const [email, setEmail] = useState('');
// const [pw, setPw] = useState('');

 // - - - - QW auto styling css- - - -

 //:::: gradient effect
   utils.qw_injectClass('qw-body', false, 'qwik-theme-gradient');
 //::::

 //:::: gradient effect
 //  utils.qw_injectClass2('#qw-body', 'qwik-theme-gradient');
 //::::

 //:::: Body prepare for center effect
   utils.qw_injectClass('qw-body', false, 'qwik-theme-bodyOrBackItemsCentered');
 //::::
 // - - - - QW - - - -

 const navigate = useNavigate();

 const handleNavigate = (link) => {
   navigate(link);
}

let CurrentComponent = null;

// // Change Step view Effect
// useEffect(() => {
//   //--- Pass Page
//  if(currentPageStep == PageStep.Pass) {
//     // Load the pass component here
//     CurrentComponent = lazy(() => import('../pages-step/LoginPassStep'));
//  }
//  //--- Email Page
//  else // Load the default component here
//    { CurrentComponent = lazy(() => import('../pages-step/LoginEmailStep')); }

//   //:::: Render the component
//   utils.qw_renderInsideElement('qwik-form-login-step-zone', false, <CurrentComponent currentPageStep={currentPageStep} updateCurrentPageStep={updateCurrentPageStep} pageStepCST={PageStep}
//                                                                                      email={email__} updateEmail__={updateEmail__}
//                                                                                      pw__={pw__} updatePw__={updatePw__} />);    
//   //::::
// }, [currentPageStep]);


function stepProcess(_param) {
  //alert(_param);

  const factors_code = _param;

  //:::: get saved credentials
  const okayGetInCache = utils.qw_securestorage_getUserCredentials();
  //:::: redirect

  //:::: move to login by otp process
   if(okayGetInCache) {

          const data_toSend = {
              email: okayGetInCache?.email,
              pass: okayGetInCache?.password,
              otp: factors_code,
          }

          processShouldFinalizeLogin(data_toSend);
    }
  else 
     { utils.qw_alertWarning("Something seem wrong, return to login page."); }
  //:::: redirect

}


async function processShouldFinalizeLogin(_data = {}) {
    
  const waiterNotif = utils.qw_alertPromise_loading("Please wait...", true);
  //:::: create session
   const [okaySession, rspData_orMsg]  = await utils.qw_loginOnline_viaEmailPassOtp(_data.email, _data.pass, _data.otp);
  //::::
  utils.qw_alertPromise_loadingResult(okaySession,
                                      "Success",
                                      rspData_orMsg,  /*"Something went wrong, try again or comeback later"*/
                                      waiterNotif, true, true, true, 2000, 3000 );
  
  //:::: move to next step
    if(okaySession)
      {
         //:::: move to login by otp process
           utils.delayForPromise( handleNavigate('/dashboard'), 1300);
         //:::: redirect
      }
    else 
      { utils.qw_alertWarning("Something seem wrong, try again..."); }
  //::::
  
}


const handleSubmit = (event) => {
  event.preventDefault();
  // Handle login logic here, ...
  console.log('Email:', email);
};


const validate = (values) => {
  const errors = {};

  if(!values.twofactorPin1)
    { errors.twofactorsPin1 = "required"; }
  // else if( !utils.qw_isDigit(values.twofactorPin1))
  //   { errors.twofactorsPin1 = "require digit only"; }

  return errors;
};


const formik = useFormik({
  initialValues: {
    twofactorPin1: '',
    twofactorPin2: '',
    twofactorPin3: '',
    twofactorPin4: '',
    twofactorPin5: '',
    twofactorPin6: '',
  },
  validate,
  onSubmit: values => {

    const data = values;

    const factors_code = data.twofactorPin1 + data.twofactorPin2 + data.twofactorPin3 + data.twofactorPin4 + data.twofactorPin5 + data.twofactorPin6;
   
    //:::: continue with right data
     stepProcess(factors_code);
   //::::
  },

});


  return (

    <div className="qwik-2fa-container">
      
      <div id="qwik-form-id" className='qwik-form'>
        <div className='qwik-logo-section'>
          <img className='qwik-logo' src={QwikLogo} alt="Qwik logo" />
        </div>

        <div className="qwik-text-above">
            <h2 className='color-emphasize-red'>Enter your 2FA code</h2>
            <p>To login, enter your 6-digit two-factor authentication code below.</p>
        </div>
        
        <form className='qwik-form-zone' onSubmit={formik.handleSubmit} >
          <div className="qwik-grouped-field">
            <div className="qwik-code-field">
              <input type="text" id="twofactorPin1" name="twofactorPin1"
                maxLength="1"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.twofactorPin1}
              />
            </div>
            <div className="qwik-code-field">
              <input type="text" id="twofactorPin2" name="twofactorPin2"
                maxLength="1"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.twofactorPin2}
              />
            </div>
            <div className="qwik-code-field">
              <input type="text" id="twofactorPin3" name="twofactorPin3"
                maxLength="1"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.twofactorPin3}
              />
            </div>
            <div className="qwik-code-field">
              <input type="text" id="twofactorPin4" name="twofactorPin4"
                maxLength="1"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.twofactorPin4}
              />
            </div>
            <div className="qwik-code-field">
              <input type="text" id="twofactorPin5" name="twofactorPin5"
                maxLength="1"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.twofactorPin5}
              />
            </div>
            <div className="qwik-code-field">
              <input type="text" id="twofactorPin6" name="twofactorPin6"
                maxLength="1"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.twofactorPin6}
              />
            </div>
          </div>

          <button type="submit" /*onClick={(e) => stepProcess()}*/ className="btn">
            VALIDATE
          </button>
        </form>

      </div>
    </div>
  );
}

export default TwoFactor;