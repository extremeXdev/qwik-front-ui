
import /*React,*/ { useState } from 'react';
import QwikLogoImg from '../assets/qwik-logo-lg.png';

// import * as utils from '../imports/lib';

const QwikLogo = () => {

  return (
        <div className="qwik-logo">
            <img id="qwik-logo-id" src={QwikLogoImg} alt="Qwik Logo" />
        </div>
  );
}; 

export default QwikLogo;