
import /*React,*/ { useState } from 'react';

// import * as utils from '../imports/lib';

import '../styles/RegisterInfo.css';

const RegisterInfoBtn = ({stepN=1, stepZ=1, onClick_Promise, id=''}) => {


 const btnText = () => {
   return (stepN < stepZ) ? 'NEXT' : 'SAVE';
 }
    
  return (
    <div className="qwik-form-field">
        <button id={id} /*id="reg-submit"*/ /*onClick={onClick_Promise}*/ className='qwik-theme-color-bk-dgreen' type="submit"> { btnText() } </button>
    </div>
  );
}; 

export default RegisterInfoBtn;
