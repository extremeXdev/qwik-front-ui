import React, { useState, useEffect } from 'react';
import * as utils from '../imports/lib';

// import { Suspense } from "react";

// import ReactDOM from 'react-dom';

function LoginForm({email__, updateEmail__, pw__, updatePw__, onClick_Promise}) {

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
            updateEmail__(_email);
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
   return true;
   /*
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

    return rsl;*/
}


function stepProcess(_email, _pw) {
  const emailStepOK = stepProcess_email(_email);
  
  let passStepOK = false;
  if(emailStepOK)
    { passStepOK = stepProcess_pass(_pw); }

  if(passStepOK)
    {  
       //:::: continue with right data
        onClick_Promise();
      //::::
    }
}

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here, ...
    // console.log('Email:', email);
  };

  return (
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

            <div className="form-group">
                <label htmlFor="password">Mot de Passe:</label>
                <input
                    type="password"
                    id="qwik-login-pass"
                    name="password"
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    placeholder='pass here...'
                    required
                />
            </div>


            <button type="submit" onClick={(e) => stepProcess()} className="btn">
              <b>Log in</b>
            </button>
        </form>
  );
}

export default LoginForm;