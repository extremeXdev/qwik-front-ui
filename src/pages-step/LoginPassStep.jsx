import React, { useState, useEffect } from 'react';
import * as utils from '../imports/lib';

function LoginPassStep({currentPageStep, updateCurrentPageStep, pageStepCST,
    email__, updateEmail__, pw__, updatePw__}) {

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
    
    //console.log('Pass:', pw);
  };

  return (
        <form className='qwik-form-zone' onSubmit={handleSubmit}>
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

            <button type="submit" onClick={(e) => stepProcess(pw)} className="btn">
              <b>Log in</b>
            </button>
        </form>
  );
}

export default LoginPassStep;