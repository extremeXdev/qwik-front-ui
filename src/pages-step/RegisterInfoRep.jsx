
import React, { useState } from 'react';
// import { Formik } from 'formik';
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
/*
 const [reprLegalName, setreprLegalName] = useState('');
 const [reprLegalTitle, setreprLegalTitle] = useState('');
 const [reprRegisteredOfficeAddress, setreprRegisteredOfficeAddress] = useState('');
 const [reprPhoneNumber, setreprPhoneNumber] = useState('');
 const [reprEmail, setReprEmail] = useState('');
 

  const handlereprLegalNameChange = (event) => {
    setreprLegalName(event.target.value);
  };

  const handlereprLegalTitleChange = (event) => {
    setreprLegalTitle(event.target.value);
  };

  const handlereprRegisteredOfficeAddressChange = (event) => {
    setreprRegisteredOfficeAddress(event.target.value);
  };

  const handlereprPhoneNumberChange = (event) => {
    setreprPhoneNumber(event.target.value);
  };

  const handlereprEmailChange = (event) => {
    setReprEmail(event.target.value);
  };
*/

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

  function stepProcess() {
     
  }

  const validate = values => {
    const errors = {};
  
    if (!values.reprLegalName) {
      errors.reprLegalName = 'Required';
    } else if (values.reprLegalName.length < 6) {
      errors.reprLegalName = 'Too short';
    }
  
    if (!values.reprLegalTitle) {
      errors.reprLegalTitle = 'Required';
    } else if (values.reprLegalTitle.length < 6) {
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
      updateFormData(values, 2);
      // alert(utils.qw_dataToJsonStringFormat(formData));
      onClick_Promise();
    },
  });


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
                    // value={reprLegalName}
                    // onChange={(e) => handlereprLegalNameChange(e)}

                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    // value={values.name}
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
                    // value={reprLegalTitle}
                    // onChange={(e) => handlereprLegalTitleChange(e)}
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
                  // value={reprRegisteredOfficeAddress}
                  // onChange={(e) => handlereprRegisteredOfficeAddressChange(e)}
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
                  // value={reprPhoneNumber}
                  // onChange={(e) => handlereprPhoneNumberChange(e)}
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
                  // value={reprEmail}
                  // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  // onChange={(e) => handlereprEmailChange(e)}
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