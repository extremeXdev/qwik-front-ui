
import /*React,*/ { useState } from 'react';

import QwikLogo from '../components/QwikLogo';

import * as utils from '../imports/lib';

import '../styles/RegisterInfo.css';

const RegisterInfoFinal = ({displayLogo=false, displayStep=false, stepN=1, stepZ=1, btnID='', formData={}, updateFormData, onClick_Promise}) => {

 // - - - - QW auto styling css  - - - - //

 //:::: gradient effect
   utils.qw_injectClass('qw-body', false, 'qwik-theme-gradient');
 //::::

 //:::: Body prepare for center effect
   utils.qw_injectClass('qw-body', false, 'qwik-theme-bodyOrBackItemsCentered');
 //::::

 // - - - - QW - - - -


  return (
    <div className="qwik-container-pageBack">
      <div className="qwik-container">

        <div className="qwik-form-container">
          
          { displayLogo ? <QwikLogo/> : null }

          <div className="qwik-text-above">
            <h1 className="color-emphasize-red qwik-fontSize-emphasize-title"> Step <span className='qwik-reg-info-step-total'>Final</span> - You successfully registered</h1>
          </div>

          <div id="register-stepper-final-display-zone" hidden={false} >
            <div className="qwik-form-field">
                  <span> Check your inbox now to activate your account</span>
            </div>
            <div id="greatEnvelop" className="qwik-form-field register-stepper-final-greatEnvelop">
                  <i className="fas fa-envelope"></i>
            </div>

            <div className="qwik-form-field">
               <p>Already done? <a href="/login"> <b className='qwik-theme-color-dgreen'>Log In here</b></a></p>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
}; 

export default RegisterInfoFinal;
