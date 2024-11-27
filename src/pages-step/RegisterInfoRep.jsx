
import React, { useState } from 'react';

import { useFormik } from 'formik';

import QwikLogo from '../components/QwikLogo';
import RegisterInfoTitle from '../components/RegisterInfoTitle';
import RegisterInfoBtn from '../components/RegisterInfoBtn';

import * as utils from '../imports/lib';

import '../styles/RegisterInfo.css';

const RegisterInfoRep = ({displayLogo=false, displayStep=false, stepN=1, stepZ=1, btnID='', formData={}, updateFormData, onClick_Promise}) => {

 // - - - - QW auto styling css- - - -

 //:::: gradient effect
   utils.qw_injectClass('qw-body', false, 'qwik-theme-gradient');
 //::::

 //:::: Body prepare for center effect
   utils.qw_injectClass('qw-body', false, 'qwik-theme-bodyOrBackItemsCentered');
 //::::

 // - - - - QW - - - -

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // console.log('Form submitted:', {
    //   reprLegalName,
    //   reprLegalTitle,
    //   reprRegisteredOfficeAddress,
    //   reprPhoneNumber,
    //   reprEmail,
    // });
  };


  const validate_extra = values => {
    const errors = {};
  
    if (!values.reprLegalName) {
      errors.reprLegalName = 'Name Required';
    } else if (values.reprLegalName.length < 5) {
      errors.reprLegalName = 'Name Too short';
    }
  
    if (!values.reprLegalTitle) {
      errors.reprLegalTitle = 'Legal Title required';
    } else if (values.reprLegalTitle.length < 5) {
      errors.reprLegalTitle = 'Legal Title too Short';
    }
  
    if (!values.reprRegisteredOfficeAddress) {
      errors.reprRegisteredOfficeAddress = 'Office Address required';
    } else if (values.reprRegisteredOfficeAddress.length < 15) {
      errors.reprRegisteredOfficeAddress = "Office Address too short";
    }/*else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.reprEmail)) {
      errors.reprEmail = 'Invalid reprEmail address';
    }*/

    if (!values.reprPhoneNumber) {
      errors.reprPhoneNumber = "Phone Number required";
    }
    else if ( !utils.qw_validatePhoneNumber(values.reprPhoneNumber) ) {
      errors.reprPhoneNumber = "Phone Number incorrect";
    }

    if (!values.reprEmail) {
      errors.reprEmail = "Email required";
    } else if ( !utils.qw_validateEmailFormat(values.reprEmail)) {
      errors.reprEmail = "Email invalid";
    }
  
    return errors;
  };


  const validate = values => {
    const errors = {};
  
    if (!values.reprLegalName) {
      errors.reprLegalName = 'Required';
    } else if (values.reprLegalName.length < 5) {
      errors.reprLegalName = 'Too short';
    }
  
    if (!values.reprLegalTitle) {
      errors.reprLegalTitle = 'Required';
    } else if (values.reprLegalTitle.length < 5) {
      errors.reprLegalTitle = 'Too Short';
    }
  
    if (!values.reprRegisteredOfficeAddress) {
      errors.reprRegisteredOfficeAddress = 'Required';
    } else if (values.reprRegisteredOfficeAddress.length < 15) {
      errors.reprRegisteredOfficeAddress = "Too short";
    }/*else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.reprEmail)) {
      errors.reprEmail = 'Invalid reprEmail address';
    }*/

    if (!values.reprPhoneNumber) {
      errors.reprPhoneNumber = "Required";
    }
    else if ( !utils.qw_validatePhoneNumber(values.reprPhoneNumber) ) {
      errors.reprPhoneNumber = "incorrect";
    }

    if (!values.reprEmail) {
      errors.reprEmail = "Required";
    } else if ( !utils.qw_validateEmailFormat(values.reprEmail)) {
      errors.reprEmail = "Invalid";
    }
  
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      reprLegalName: !utils.qw_isEmptyStringOrData(formData.reprLegalName) ? formData.reprLegalName : '',
      reprLegalTitle: !utils.qw_isEmptyStringOrData(formData.reprLegalTitle) ? formData.reprLegalTitle : '',
      reprRegisteredOfficeAddress: !utils.qw_isEmptyStringOrData(formData.reprRegisteredOfficeAddress) ? formData.reprRegisteredOfficeAddress : '',
      reprPhoneNumber: !utils.qw_isEmptyStringOrData(formData.reprPhoneNumber) ? formData.reprPhoneNumber : '',
      reprEmail: !utils.qw_isEmptyStringOrData(formData.reprEmail) ? formData.reprEmail : '',
    },
    validate,
    onSubmit: values => {
     
      const data = values;

      updateFormData(data, stepN);
  
     //:::: continue with right data
       stepProcess(data);
     //::::
    },
  });


function validatedSignupForm(fieldsData = {}) {

  //:::: validate call
  const wrongs = validate_extra(fieldsData);
  //::::

  //:::: check if there is any wrongness
    return utils.qw_validatedForm(wrongs);
  //::::
}

function stepProcess(data) {
 
  if( !validatedSignupForm(data) )
    { return; }

   //:::: continue with right data
     onClick_Promise();
   //::::
}


  return (
    <div className="qwik-container-pageBack">
      <div className="qwik-container">
        <div className="qwik-form-container">
          
        { displayLogo ? <QwikLogo/> : null}

        { displayStep ? <RegisterInfoTitle stepN={stepN} stepZ={stepZ}/> : null}
          

          <form /*onSubmit={e => handleSubmit(e)}*/ onSubmit={formik.handleSubmit} >
            <div className="qwik-grouped-field">
              <div className="qwik-form-field">
                <label htmlFor="reprLegalName">Nom du Representant Legal:</label>
              </div>
              <div className="qwik-form-field">
                  <div className="qwik-grouped-field">
                    <input type="text" id="reprLegalName" name="reprLegalName"
                     placeholder='Super-Branded Commerce LLC.'
                     required
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.reprLegalName}
                    />
                    {formik.touched.reprLegalName && formik.errors.reprLegalName ?
                        (<div className="color-emphasize-red">{formik.errors.reprLegalName}</div>) : null}
                  </div>

              </div>
            </div>

            <div className="qwik-grouped-field">
              <div className="qwik-form-field">
                <label htmlFor="reprLegalTitle">Titre du représentant légal:</label>
              </div>
              <div className="qwik-form-field">
                <div className="qwik-grouped-field">
                   <input type="text" id="reprLegalTitle" name="reprLegalTitle"
                     placeholder='Super-Branded'                
                     required
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.reprLegalTitle}
                   />
                    {formik.touched.reprLegalTitle && formik.errors.reprLegalTitle ?
                        (<div className="color-emphasize-red">{formik.errors.reprLegalTitle}</div>) : null}
                  </div>
              </div>
            </div>

            <div className="qwik-grouped-field">
              <div className="qwik-form-field">
                <label htmlFor="reprRegisteredOfficeAddress">Adresse du représentant légal:</label>
              </div>
              
              <div className="qwik-form-field">
                <div className="qwik-grouped-field">
                  <input type="text" id="reprRegisteredOfficeAddress" name="reprRegisteredOfficeAddress"
                   placeholder='Street Premier, Nashville, HolyLand'
                   required
                   onChange={formik.handleChange}
                   onBlur={formik.handleBlur}
                   value={formik.values.reprRegisteredOfficeAddress}
                  />
                  {formik.touched.reprRegisteredOfficeAddress && formik.errors.reprRegisteredOfficeAddress ?
                      (<div className="color-emphasize-red">{formik.errors.reprRegisteredOfficeAddress}</div>) : null}
                </div>
              </div>
            </div>

            <div className="qwik-grouped-field">
              <div className="qwik-form-field">
                <label htmlFor="reprPhoneNumber">Numero de téléphone:</label>
              </div>
              <div className="qwik-form-field">
                <div className="qwik-grouped-field">
                  <input type="tel" id="reprPhoneNumber" name="reprPhoneNumber"
                   placeholder='+44 ***********'
                   required
                   onChange={formik.handleChange}
                   onBlur={formik.handleBlur}
                   value={formik.values.reprPhoneNumber}
                  />
                  {formik.touched.reprPhoneNumber && formik.errors.reprPhoneNumber ?
                      (<div className="color-emphasize-red">{formik.errors.reprPhoneNumber}</div>) : null}
                </div>
              </div>
            </div>

            <div className="qwik-grouped-field">
              <div className="qwik-form-field">
                <label htmlFor="reprEmail">Adresse Email du représentant:</label>
              </div>
              <div className="qwik-form-field">
                <div className="qwik-grouped-field">
                  <input type="reprEmail" id="reprEmail" name="reprEmail"
                   // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                   placeholder='sale@company.com'
                   //required
                   onChange={formik.handleChange}
                   onBlur={formik.handleBlur}
                   value={formik.values.reprEmail}
                  />
                  {formik.touched.reprEmail && formik.errors.reprEmail ?
                      (<div className="color-emphasize-red">{formik.errors.reprEmail}</div>) : null}
                </div>
              </div>
            </div>

            <RegisterInfoBtn id={btnID} stepN={stepN} stepZ={stepZ} /*onClick_Promise={(e) => stepProcess()}*//>

          </form>
          
        </div>
      </div>
    </div>
  );
}; 

export default RegisterInfoRep;