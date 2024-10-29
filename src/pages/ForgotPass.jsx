
import React, { useState, useEffect } from 'react';
import { lazy, Suspense } from 'react';
import QwikLogo from '../assets/qwik-logo-lg.png';
import { useNavigate } from 'react-router-dom';

import * as utils from '../imports/lib';
import '../imports/enums';

import '../styles/Login.css';

function ForgotPass() {

 // - - - - QW auto styling css- - - -

 //:::: gradient effect
   utils.qw_injectClass('qw-body', false, 'qwik-theme-gradient');
 //::::

 //:::: Body prepare for center effect
   utils.qw_injectClass('qw-body', false, 'qwik-theme-bodyOrBackItemsCentered');
 //::::

 // - - - - QW - - - -

 const navigate = useNavigate();

 const handleNavigate = (link) => {
   navigate(link);
}

 const [email, setEmail] = useState('');

async function stepProcess(_email) {
// alert(_email);
    const okayFormat = utils.qw_checkEmailFormat(_email);

    if(okayFormat)
    {
       const okayAvailable = utils.qw_checkEmailExistenceOnServer(_email);

       if(okayAvailable)
        { 
          const waiterNotif = utils.qw_alertPromise_loading("Please wait...", true);
          //:::: create session
           const [process_done, rspData_orMsg]  = await utils.qw_performForgottenPass(_email);
          //::::
          utils.qw_alertPromise_loadingResult(process_done,
                                              "Success! Please check your mail box...",
                                              rspData_orMsg,  /*"Something went wrong, try again or comeback later"*/
                                              waiterNotif, true, true, true, 2000, 3000 );
          
          //:::: move to login
          if(process_done)
            { utils.delayForPromise( handleNavigate('/login/restorepw'), 1300); }
          //:::: redirect
        }
       else 
        { utils.qw_alertWarning("L'email inseré n'exist pas!"); }
    }
    else 
      { utils.qw_alertWarning("L'email inseré n'est pas valide!"); }
}

const handleSubmit = (event) => {
event.preventDefault();
// Handle login logic here, ...
//alert('Email:'+email);
  stepProcess(email);
};

  return (
      <div>
        <div className="qwik-login-container">
          
          <div className='qwik-logo-section'>
            <img className='qwik-logo' src={QwikLogo} alt="Qwik logo" />
          </div>

          <div id="qwik-form-id" className='qwik-form'>

            <div className="qwik-text-above">
                <h2 className='color-emphasize-red'>Password forgotten</h2>
                <p>Recover your account</p>
            </div>

            <div id="qwik-form-login-step-zone">
              <form className='qwik-form-zone' onSubmit={ (e) => handleSubmit(e)}>
                  <div className="form-group">
                      <label htmlFor="email">Adresse e-mail:</label>
                      <input
                          type="email"
                          id="qwik-login-email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder='jerome@doe.com'
                          required
                      />
                  </div>

                  <button type="submit" /*onClick={(e) => stepProcess(email)}*/ className="btn">
                    <b>Confirm</b>
                  </button>
              </form>
            </div>

            <p id="forgot-pass">Still remembering? <a href="/login"> <b>Login here</b></a></p>
          </div>
        </div>
    
      </div>
  );
}

export default ForgotPass;