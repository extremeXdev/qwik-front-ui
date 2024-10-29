import React, { useState, useEffect } from 'react';
import { qw_alert, qw_checkEmailExistenceOnServer, qw_checkEmailFormat } from '../imports/lib';

// import { Suspense } from "react";

// import ReactDOM from 'react-dom';

function LoginEmailStep({currentPageStep, updateCurrentPageStep, pageStepCST,
                                        email__, updateEmail__, pw__, updatePw__}) {

const [email, setEmail] = useState('');

function stepProcess(_email) {
  // alert(_email);
  const okayFormat = qw_checkEmailFormat(_email);

  if(okayFormat)
    {
      const okayAvailable = qw_checkEmailExistenceOnServer(_email);
      
      if(okayAvailable)
        { 
          //:::: save email
            updateEmail__(_email);
          //::::

          //:::: move to pass step
            updateCurrentPageStep(pageStepCST.Pass);
          //::::
        }
      else 
        { qw_alert("L'email inseré n'exist pas!"); }
    }
}

function submitData(_email) {
  
}


const [pw, setPw] = useState('');

function stepProcess(_pw) {
  const okayMatch = utils.qw_checkPassMatchOnServer(_pw);

  if(okayMatch) {
       //:::: save email
          updatePw__(_pw);
       //::::

       //:::: continue with right data
        utils.qw_processShouldFinalizeLogin(email__, pw__);
      //::::
  }
  else 
    { utils.qw_alert("Ce Mot de passe est incorrect!"); }
}



  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here, ...
    console.log('Email:', email);
  };

  return (
        <form className='qwik-form-zone' onSubmit={handleSubmit}>
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

            <button type="submit" onClick={(e) => stepProcess(email)} className="btn">
              <b>Log in</b>
            </button>
        </form>
  );
}

export default LoginEmailStep;