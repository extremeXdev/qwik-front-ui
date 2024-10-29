import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import QwikLogo from '../assets/qwik-logo-lg.png';

//import LoginForm from './LoginForm';

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

 const navigate = useNavigate();

 const handleNavigate = (link) => {
   navigate(link);
}


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

// let CurrentComponent = <LoginForm email={email__} updateEmail__={updateEmail__}
//   pw__={pw__} updatePw__={updatePw__} onClick_Promise={stepProcess} />;


// Change Step view Effect
useEffect(() => {
  //:::: Render the component
  //  utils.qw_renderInsideElement('qwik-form-login-step-zone', false, CurrentComponent); 
  //::::
});


const [email, setEmail] = useState('');
const [pw, setPw] = useState('');

function stepProcess_email(_email) {
  let rsl = false;
  const okayFormat = utils.qw_checkEmailFormat(_email);

  if(okayFormat)
    {
      const okayAvailable = utils.qw_checkEmailExistenceOnServer(_email);
      
      if(okayAvailable)
        { 
          //:::: save email
            setEmail__(_email);
          //::::

          //:::: all is good
           rsl = true;
          //::::
        }
      else 
        { utils.qw_alertWarning("L'email inseré n'exist pas!"); }
    }

    return rsl;
}


function stepProcess_pass(_pw) {
  let rsl = false;
   
  const okayMatch = utils.qw_checkPassMatchOnServer(_pw);

  if(okayMatch) {
       //:::: save pass
          updatePw__(_pw);
       //::::

       //:::: all is good
          rsl = true;
       //::::
  }
  else 
    { utils.qw_alertWarning("Ce Mot de passe est incorrect!"); }

    return rsl;
}


function stepProcess(_email, _pass) {

  const emailStepOK = stepProcess_email(_email);
  
  let passStepOK = false;
  if(emailStepOK)
    { passStepOK = stepProcess_pass(_pass); }

  if(passStepOK)
    {  
       //:::: continue with right data
        stepProcessFinal(_email, _pass);
      //::::
    }
}

function stepProcessFinal(_email, _pass) {

  const data_toSend = {
    email: _email,
    pass: _pass,
  }
  
  //:::: continue with right data
      processShouldFinalizeLogin(data_toSend)
  //::::
     
}

async function processShouldFinalizeLogin(_data = {}) {
    
  const waiterNotif = utils.qw_alertPromise_loading("Please wait...", true);
  //:::: create session
   const [okaySession, rspData_orMsg]  = await utils.qw_loginOnline_viaEmailPass(_data.email, _data.pass);
  //::::
  utils.qw_alertPromise_loadingResult(okaySession,
                                      "Success",
                                      rspData_orMsg,  /*"Something went wrong, try again or comeback later"*/
                                      waiterNotif, true, true, true, 2000, 3000 );
  
  //:::: move to next step
    if(okaySession)
      {   //utils.qw_alert("OOH");

         //:::: save credentials
           const okaySaveInCache = utils.qw_securestorage_saveUserCredentials(_data.email, _data.pass);
         //:::: redirect

         //:::: move
         //  utils.qw_alertGood('Preparing your dashboard...');
         //  utils.delayForPromise( handleNavigate('/dashboard'), 3000);
         //:::: redirect

         //:::: move to login by otp process
         if(okaySaveInCache)
           utils.delayForPromise( handleNavigate('/validate?login'), 1300);
         else 
           utils.qw_alertWarning("Something seem wrong, try again or comeback later");
         //:::: redirect
      }
    else 
      { /*utils.qw_alertWarning("Something seem wrong, try again...");*/ }
  //::::
  
}


const handleSubmit = (e) => {
  e.preventDefault();
  //alert("email: " + email__ + " pass: " + pw__);
  stepProcess(email__, pw__);
};

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
                <form className='qwik-form-zone' onSubmit={ (e) => handleSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="email">Adresse e-mail:</label>
                        <input
                            type="email"
                            id="qwik-login-email"
                            value={email__}
                            onChange={(e) => updateEmail__(e.target.value)}
                            placeholder='jerome@doe.com'
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Mot de Passe:</label>
                        <input
                            type="password"
                            id="qwik-login-pass"
                            name="password"
                            value={pw__}
                            onChange={(e) => updatePw__(e.target.value)}
                            placeholder='pass here...'
                            required
                        />
                    </div>


                    <button type="submit" /*onClick={(e) => stepProcess()}*/ className="btn">
                      <b>Log in</b>
                    </button>
                </form>
            </div>

            <p id="forgot-pass">Forgot your password? <a href="/login/forgotpw"> <b>Request a new one</b></a></p>
          </div>
        </div>

        <div className='qwik-not-account-zone text-in-right-corner'>
          <p>Don't have account yet? <a href="register"> <b className='color-emphasize-red'>Sign up</b></a></p>
        </div>
    
      </div>
  );
}

export default Login;