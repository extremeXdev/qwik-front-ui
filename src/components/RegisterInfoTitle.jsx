
import /*React,*/ { useState } from 'react';

// import * as utils from '../imports/lib';

import '../styles/RegisterInfo.css';

const RegisterInfoTitle = ({stepN=1, stepZ=1}) => {


  function getStep() { 
    return stepN > stepZ ? stepZ : stepN;
  }

  return (
      <div className="qwik-text-above">
        <h1 className="color-emphasize-red qwik-fontSize-emphasize-title"> Step { getStep() } <span className='qwik-reg-info-step-total'>of {stepZ}</span> - Information de base de l'entité</h1>
      </div>
  );
}; 

export default RegisterInfoTitle;