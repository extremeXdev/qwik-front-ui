
import /*React,*/ { useState, useEffect , useTransition} from 'react';
import QwikLogo from '../assets/qwik-logo-lg.png';

import * as utils from '../imports/lib';

// import { getRoute, routesFront } from '../imports/routes';
// import NotifType from '../imports/enums';

import { BrowserRouter as Router, Route, Link, useNavigate } from 'react-router-dom';

 import '../styles/Register.css';
//import '../styles/Register-inc.css';

const Register = () => {

 // - - - - QW auto styling css- - - -

 //:::: gradient effect
   utils.qw_injectClass('qw-body', false, 'qwik-theme-gradient');
 //::::

 //:::: Body prepare for center effect
   utils.qw_injectClass('qw-body', false, 'qwik-theme-bodyOrBackItemsCentered');
 //::::
 // - - - - QW - - - -

 const [firstName, setFirstName] = useState('');
 const [lastName, setLastName] = useState('');
 const [email, setEmail] = useState('');
 const [phoneCode, setPhoneCode] = useState('');
 const [phoneNumber, setPhoneNumber] = useState('');
 const [pass, setPass] = useState('');


 const navigate = useNavigate();

 const handleRedirect = (link) => {
   navigate(link);
}

 /*
 //// redirect to register step when user is new
  useEffect(() => {
  //:::: save data in cash
  // const okaySaveInCache = utils.qw_processSaveDataInCash(_data);
  const regDataInCash = utils.qw_securestorage_getUserRegisterInfo();   // secure storage
  //::::

  //:::: send-save online
   const okayDataInCash = !utils.qw_isEmptyStringOrData(regDataInCash);
  //::::
  
  //:::: move to next step
    if(okayDataInCash)
      { navigate('/register/infobase'); }  //'/register/infobase
 }, []);
*/

 const handleFirstNameChange = (event) => {
   setFirstName(event.target.value);
 };

 const handleLastNameChange = (event) => {
   setLastName(event.target.value);
 };

 const handleEmailChange = (event) => {
   setEmail(event.target.value);
 };

 const handlePhoneCodeChange = (event) => {
   setPhoneCode(event.target.value);
 };

 const handlePhoneNumberChange = (event) => {
  setPhoneNumber(event.target.value);
};

 const handlePassChange = (event) => {
   setPass(event.target.value);
 };

 const handleSubmit = (event) => {
  event.preventDefault();
  // Handle login logic here, ...
  stepProcess();
};

//:::: VALIDATION FORM MANAGE
const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Name is required!";
  }
  else if ( !utils.qw_validateName(values.name) ) {
    errors.name = "Invalide Name or so short";
  }

  if ( !values.lastName ) {
    errors.lastName = "Last Name is required!";
  }
  else if ( !utils.qw_validateName(values.lastName) ) {
    errors.lastName = "Invalide Last Name or so short";
  }

  if (!values.email) {
    errors.email = "Email is Required";
  } else if ( !utils.qw_validateEmailFormat(values.email)) {
    errors.email = "Invalid emaill address";
  }

  if (!values.phoneCode) {
    errors.phoneCode = "Phone Code is Required";
  }
  else if ( !utils.qw_validatePhoneCode(values.phoneCode) ) {
    errors.phoneCode = "Phone code incorrect";
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = "Phone Number is Required";
  }
  else if ( !utils.qw_validatePhoneNumber(values.phoneNumber) ) {
    errors.phoneNumber = "Phone Number incorrect";
  }

  if (!values.pass) {
    errors.pass = "Password is Required";
  }

  // if (!values.checkbox) {
  //   errors.checkbox = "You must accept our terms";
  // }
  // if (!values.select) {
  //   errors.select = "Select is required";
  // }
  // if (!values.radio) {
  //   errors.radio = "You must accept our terms";
  // }

  return errors;
};

function validatedSignupForm(fieldsData = {}) {

  //:::: validate call
  const wrongs = validate(fieldsData);
  //::::

  //:::: check if there is any wrongness
    return utils.qw_validatedForm(wrongs);
  //::::
}

function processShouldFinalizeSignup(_data = {}) {

  //:::: save data in cash
  // const okaySaveInCache = utils.qw_processSaveDataInCash(_data);
  const okaySaveInCache = utils.qw_securestorage_saveUserRegisterInfo(_data);   // secure storage
  //::::

  //:::: send-save online
  // const okaySaveOnline = utils.qw_processSaveDataOnlineSignup(_data);
  //::::
  
  //:::: move to next step
    if(okaySaveInCache)
      {  handleRedirect('/register/infobase'); }  //'/register/infobase
    else 
      { utils.qw_alertWarning("Something seem wrong, try again or comeback later"); }
  //::::
}


function stepProcess() {

  const data = {
    name: firstName,
    lastName: lastName,
    email: email,
    phoneCode: phoneCode,
    phoneNumber: phoneNumber,
    pass: pass,
  };

  const data_toSend = {
    firstName: data.name,
    lastName: data.lastName,
    email: data.email,
    // phoneCode: data.phoneCode,
    phone: data?.phoneCode + data?.phoneNumber,
    password: data.pass,
    confirmPassword: data.pass,
  };

  if( !validatedSignupForm(data) )
    { return; }

  // utils.qw_alertWarning("OOPs!");

  const emailStepOK =  utils.qw_checkEmailAvailable(email);
  
   if(!emailStepOK)
     { utils.qw_alertWarning("Email already Exist.");
        return; }

   //:::: continue with right data
     processShouldFinalizeSignup(data_toSend);
   //::::
}
//::::: END VALIDATION FORM MANAGE

  return (
    <div className="qwik-container-pageBack">
      <div className="qwik-container">
        <div className="qwik-logo">
          <img src={QwikLogo} alt="Qwik Logo" />
        </div>

        <div className="qwik-form-container">
          <div className="qwik-text-above">
            <h1 className="color-emphasize-red">Let's get going !!!</h1>
            <p>Tell us about yourself</p>
          </div>

          <form onSubmit={ (e) => handleSubmit(e)}>
            <div className="qwik-grouped-field">
              <div className="qwik-form-field">
                <label htmlFor="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName" placeholder='Coen'
                value={firstName}
                onChange={(e) => handleFirstNameChange(e)}
               required/>
              </div>
              <div className="qwik-form-field">
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName" placeholder='Sandra'
                value={lastName}
                onChange={(e) => handleLastNameChange(e)}
               required/>
              </div>
            </div>

            <div className="qwik-form-field">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" placeholder="stephia@foe.com"
              value={email}
              onChange={(e) => handleEmailChange(e)}
              required/>
            </div>

            <div className="qwik-form-field">
              <label htmlFor="phoneNumber">Phone Number:</label>
              <div className="qwik-grouped-field">
                <input type="text" id="country-code" name="countryCode" placeholder='+33'
                value={phoneCode}
                onChange={(e) => handlePhoneCodeChange(e)}
                required/>

                <input type="tel" id="phoneNumber" name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => handlePhoneNumberChange(e)}
                required/>
              </div>
            </div>
            
            <div className="qwik-form-field">
              <label htmlFor="password">Create your password:</label>
              <input type="password" id="password" name="password"
                value={pass}
                onChange={(e) => handlePassChange(e)}
                required/>
            </div>

            <div className="qwik-form-field">
              <button className='qwik-theme-color-bk-dgreen' /*onClick={(e) => stepProcess()}*/ id="reg-submit" type="submit">CONTINUE</button>
            </div>
          </form>
          
          <p>Already have an account? <a href="/login"> <b className='qwik-theme-color-dgreen'>Log In here</b></a></p>
        </div>
      </div>
    </div>
  );
}; 

export default Register;
