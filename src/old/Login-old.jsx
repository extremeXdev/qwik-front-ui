
import React, { useState, useEffect } from 'react';
import { lazy, Suspense } from 'react';
import QwikLogo from '../assets/qwik-logo-lg.png';

import * as utils from '../imports/lib';

import '../styles/Login.css';

function Login() {

 // - - - - QW auto styling css- - - -

 //:::: gradient effect
   utils.qw_injectClass('qw-body', false, 'qwik-theme-gradient');
 //::::

 //:::: Body prepare for center effect
   utils.qw_injectClass('qw-body', false, 'qwik-theme-bodyOrBackItemsCentered');
 //::::

 // - - - - QW - - - -


 // const [email, setEmail] = useState('');
 // const [pw, setPw] = useState('');

  const PageStep = {
    Email: 0,
    Pass: 1,
    ForgottenPass: 2,
  };

//:::: general page step
const [currentPageStep, setCurrentPageStep] = useState(0);  // 0 = email, 1 = pw, ...

const updateCurrentPageStep = (newValue) => {
  setCurrentPageStep(newValue);
};
//::::

//:::: email step
const [email__, setEmail__] = useState('');

const updateEmail__ = (newValue) => {
  setEmail__(newValue);
};
//::::

//:::: pass step
const [pw__, setPw__] = useState('');

const updatePw__ = (newValue) => {
  setPw__(newValue);
};
//::::

let CurrentComponent = null;

// Change Step view Effect
useEffect(() => {
  //--- Pass Page
 if(currentPageStep == PageStep.Pass) {
    // Load the pass component here
    CurrentComponent = lazy(() => import('../pages-step/LoginPassStep'));
 }
 //--- Email Page
 else // Load the default component here
   { CurrentComponent = lazy(() => import('../pages/LoginForm')); }

  //:::: Render the component
  utils.qw_renderInsideElement('qwik-form-login-step-zone', false, <CurrentComponent currentPageStep={currentPageStep} updateCurrentPageStep={updateCurrentPageStep} pageStepCST={PageStep}
                                                                                     email={email__} updateEmail__={updateEmail__}
                                                                                     pw__={pw__} updatePw__={updatePw__} />);    
  //::::
}, [currentPageStep]);

  return (
      <div>
        <div className="qwik-login-container">
          
          <div className='qwik-logo-section'>
            <img className='qwik-logo' src={QwikLogo} alt="Qwik logo" />
          </div>

          <div id="qwik-form-id" className='qwik-form'>

            <div className="qwik-text-above">
                <h2 className='color-emphasize-red'>Log in to your account</h2>
                <p>To make the most of your Qwik experience</p>
            </div>

            <div id="qwik-form-login-step-zone">
                {/* <Login CurrentComponent is here/>*/}
            </div>

            <p id="forgot-pass">Forgot your password? <a href="#"> <b>Request a new one</b></a></p>
          </div>
        </div>

        <div className='qwik-not-account-zone text-in-right-corner'>
          <p>Don't have account yet? <a href="register"> <b className='color-emphasize-red'>Sign up</b></a></p>
        </div>
    
      </div>
  );
}

export default Login;