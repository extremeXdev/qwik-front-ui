
import /*React,*/ { useState, useEffect , useTransition} from 'react';
import QwikLogo from '../assets/qwik-logo-lg.png';

import RegisterInfoBtn from '../components/RegisterInfoBtn';
import { useFormik } from 'formik';

import * as utils from '../imports/lib';

// import { getRoute, routesFront } from '../imports/routes';
// import NotifType from '../imports/enums';

import { BrowserRouter as Router, Route, Link, useNavigate } from 'react-router-dom';

// import '../styles/Register.css';
import '../styles/Register-inc.css';

const Register = ({ /*displayLogo=false, displayStep=false,*/ stepN=1, stepZ=1, btnID='', formData={}, updateFormData, onClick_Promise}) => {

 // - - - - QW auto styling css- - - -

 //:::: gradient effect
   utils.qw_injectClass('qw-body', false, 'qwik-theme-gradient');
 //::::

 //:::: Body prepare for center effect
   utils.qw_injectClass('qw-body', false, 'qwik-theme-bodyOrBackItemsCentered');
 //::::
 // - - - - QW - - - -

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


//:::: VALIDATION FORM MANAGE
const validate_all = (values) => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = "Name is required!";
  }
  else if ( !utils.qw_validateName(values.firstName) ) {
    errors.firstName = "Invalid name or too short";
  }

  if ( !values.lastName ) {
    errors.lastName = "Last name is required!";
  }
  else if ( !utils.qw_validateName(values.lastName) ) {
    errors.lastName = "Invalid Last Name or too short";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if ( !utils.qw_validateEmailFormat(values.email)) {
    errors.email = "Invalid email address";
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

  if (!values.password) {
    errors.password = "Password is Required";
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


const validate = (values) => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = "required";
  }
  else if ( !utils.qw_validateName(values.firstName) ) {
    errors.firstName = "too short";
  }

  if ( !values.lastName ) {
    errors.lastName = "required";
  }
  else if ( !utils.qw_validateName(values.lastName) ) {
    errors.lastName = "too short";
  }

  if (!values.email) {
    errors.email = "required";
  } else if ( !utils.qw_validateEmailFormat(values.email)) {
    errors.email = "email invalid";
  }

  if (!values.phoneCode) {
    errors.phoneCode = "code required";
  }
  else if ( !utils.qw_validatePhoneCode(values.phoneCode) ) {
    errors.phoneCode = "code incorrect";
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = "number required";
  }
  else if ( !utils.qw_validatePhoneNumber(values.phoneNumber) ) {
    errors.phoneNumber = "number incorrect";
  }

  if (!values.password) {
    errors.password = "required";
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



const validate_ = (values) => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = "required";
  }
  if ( !values.lastName ) {
    errors.lastName = "required";
  }
  if (!values.email) {
    errors.email = "required";
  }
  if (!values.phoneCode) {
    errors.phoneCode = "required";
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = "required";
  }
  if (!values.password) {
    errors.password = "required";
  }

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
/* 
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
 */

function stepProcess(data) {
 
    if( !validatedSignupForm(data) )
      { return; }
  
     //:::: continue with right data
       onClick_Promise();
     //::::
}
//:::: END VALIDATION FORM MANAGE

const formik = useFormik({
  initialValues: {

    firstName: !utils.qw_isEmptyStringOrData(formData.firstName) ? formData.firstName : '',
    lastName: !utils.qw_isEmptyStringOrData(formData.lastName) ? formData.lastName : '',
    email: !utils.qw_isEmptyStringOrData(formData.email) ? formData.email : '',
    phoneCode: !utils.qw_isEmptyStringOrData(formData.phoneCode) ? formData.phoneCode : '',
    phoneNumber: !utils.qw_isEmptyStringOrData(formData.phoneNumber) ? formData.phoneNumber : '',
    password: !utils.qw_isEmptyStringOrData(formData.password) ? formData.password : '',
  },
  validate,
  onSubmit: values => {
    
    const data = values;

    updateFormData(data, 1);

   //:::: continue with right data
     stepProcess(data);
   //::::
  },
});

let err_phone = '';

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

          <form /*onSubmit={(e) => handleSubmit(e)}*/ onSubmit={formik.handleSubmit} >
            <div className="qwik-grouped-field">
              <div className="qwik-form-field">
                 <label htmlFor="firstName">First Name:&nbsp; {/* &nbsp; */}
                    {formik.touched.firstName && formik.errors.firstName ?
                      (<span className="color-emphasize-red">{formik.errors.firstName}</span>) : null}
                 </label>
                  <input type="text" id="firstName" name="firstName" placeholder='Coen'
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                  />
              </div>
              <div className="qwik-form-field">
                <label htmlFor="lastName">Last Name:&nbsp;
                  {formik.touched.lastName && formik.errors.lastName ?
                     (<span className="color-emphasize-red">{formik.errors.lastName}</span>) : null}
                </label>
                <input type="text" id="lastName" name="lastName" placeholder='Sandra'
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                />
              </div>
            </div>

            <div className="qwik-form-field">
              <label htmlFor="email">Email:&ensp;
                  {formik.touched.email && formik.errors.email ?
                     (<span className="color-emphasize-red">{formik.errors.email}</span>) : null}
              </label>
              <input type="email" id="email" name="email" placeholder="stephia@foe.com"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>

            <div className="qwik-form-field">
              <label htmlFor="phoneNumber">Phone Number:&ensp;

                  { formik.touched.phoneCode && formik.errors.phoneCode && formik.touched.phoneNumber && formik.errors.phoneNumber ? 
                      (<span className="color-emphasize-red">{formik.errors.phoneCode}</span>) :
                        formik.touched.phoneCode && formik.errors.phoneCode ?
                          (<span className="color-emphasize-red">{formik.errors.phoneCode}</span>) :
                            formik.touched.phoneNumber && formik.errors.phoneNumber ?
                              (<span className="color-emphasize-red">{formik.errors.phoneNumber}</span>) : err_phone=''
                  }

                  {/* 
                  {formik.touched.phoneCode && formik.errors.phoneCode ?
                     (<span className="color-emphasize-red">{formik.errors.phoneCode}</span>) : null}

                  {formik.touched.phoneNumber && formik.errors.phoneNumber ?
                     (<span className="color-emphasize-red">{formik.errors.phoneNumber}</span>) : null}
                  */}
                  
              </label>
              <div className="qwik-grouped-field">
                <input type="text" id="country-code" name="phoneCode" placeholder='+33'
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phoneCode}
                />

                <input type="tel" id="phoneNumber" name="phoneNumber"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phoneNumber}
                />
              </div>
            </div>
            
            <div className="qwik-form-field">
              <label htmlFor="password"> Create your password:&ensp;
                  {formik.touched.password && formik.errors.password ?
                     (<span className="color-emphasize-red">{formik.errors.password}</span>) : null }
              </label>
              <input type="password" id="password" name="password"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </div>

            <div className="qwik-form-field">
              <RegisterInfoBtn id={btnID} stepN={stepN} stepZ={stepZ} /*onClick={(e) => stepProcess()}*/  />
            </div>
          </form>
          
          <p>Already have an account? <a href="/login"> <b className='qwik-theme-color-dgreen'>Log In here</b></a></p>
        </div>
      </div>
    </div>
  );
}; 

export default Register;
