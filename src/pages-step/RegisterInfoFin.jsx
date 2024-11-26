
import /*React,*/ { useState } from 'react';
import { useFormik } from 'formik';

import QwikLogo from '../components/QwikLogo';
import RegisterInfoTitle from '../components/RegisterInfoTitle';
import RegisterInfoBtn from '../components/RegisterInfoBtn';

import * as utils from '../imports/lib';

import '../styles/RegisterInfo.css';

const RegisterInfoFin = ({displayLogo=false, displayStep=false, stepN=1, stepZ=1, btnID='', formData={}, updateFormData, onClick_Promise}) => {

 // - - - - QW auto styling css- - - -

 //:::: gradient effect
   utils.qw_injectClass('qw-body', false, 'qwik-theme-gradient');
 //::::

 //:::: Body prepare for center effect
   utils.qw_injectClass('qw-body', false, 'qwik-theme-bodyOrBackItemsCentered');
 //::::

 // - - - - QW - - - -

  const validate_extra = values => {
    const errors = {};
  
    if (!values.anualTurnover) {
      errors.anualTurnover = 'Required';
    } else if (!utils.qw_validateMustBeGreaterThan(values.anualTurnover, 5000)) {
      errors.anualTurnover = 'Number > 5000';
    }
  
    if (!values.bankName) {
      errors.bankName = 'Required';
    } else if (values.bankName.length < 4) {
      errors.bankName = 'Must be 4 characters at least';
    }
  
    if (!values.bankDetails) {
      errors.bankDetails = 'Required';
    } else if (values.bankDetails.length < 15) {
      errors.bankDetails = "Can't be so short";
    }

    if (!values.bankIban) {
      errors.bankIban = "Required";
    }
    else if ( !utils.qw_validateBankIBAN(values.bankIban) ) {
      errors.bankIban = "IBAN incorrect";
    }

    if (!values.bankBic) {
      errors.bankBic = "Required";
    }
    else if ( !utils.qw_validateBankBIC(values.bankBic) ) {
      errors.bankBic = "BIC incorrect";
    }
  
    return errors;
  };


  const validate = values => {
    const errors = {};
  
    if (!values.anualTurnover) {
      errors.anualTurnover = 'required';
    } else if (!utils.qw_validateMustBeGreaterThan(values.anualTurnover, 5000)) {
      errors.anualTurnover = 'Number > 5000';
    }
  
    if (!values.bankName) {
      errors.bankName = 'required';
    } else if (values.bankName.length < 4) {
      errors.bankName = 'too short';
    }
  
    if (!values.bankDetails) {  
      errors.bankDetails = 'required';
    } else if (values.bankDetails.length < 15) {
      errors.bankDetails = "too short";
    }

    if (!values.bankIban) {
      errors.bankIban = "required";
    }
    else if ( !utils.qw_validateBankIBAN(values.bankIban) ) {
      errors.bankIban = "incorrect";
    }

    if (!values.bankBic) {
      errors.bankBic = "required";
    }
    else if ( !utils.qw_validateBankBIC(values.bankBic) ) {
      errors.bankBic = "incorrect";
    }
  
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      anualTurnover: !utils.qw_isEmptyStringOrData(formData.anualTurnover) ? formData.anualTurnover : '',
      bankName: !utils.qw_isEmptyStringOrData(formData.bankName) ? formData.bankName : '',
      bankDetails: !utils.qw_isEmptyStringOrData(formData.bankDetails) ? formData.bankDetails : '',
      bankIban: !utils.qw_isEmptyStringOrData(formData.bankIban) ? formData.bankIban : '',
      bankBic: !utils.qw_isEmptyStringOrData(formData.bankBic) ? formData.bankBic : '',
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


const handleSubmit = (event) => {
  event.preventDefault();
  // Handle form submission here
  stepProcess();
};

function stepProcess(data) {
 
  if( !validatedSignupForm(data) )
    { return; }
//alert('bingo');
   //:::: continue with right data
     onClick_Promise(true, true);   // last step is here
   //::::
}

  return (
    <div className="qwik-container-pageBack">
      <div className="qwik-container">

        <div className="qwik-form-container">
          
          { displayLogo ? <QwikLogo/> : null}

          { displayStep ? <RegisterInfoTitle stepN={stepN} stepZ={stepZ}/> : null}
          
          <form id="fin-form" /*onSubmit={ (e) => handleSubmit(e)*/ onSubmit={formik.handleSubmit}>
            <div className="qwik-grouped-field">
              <div className="qwik-form-field">
                <label htmlFor="anualTurnover">Chiffre d'affaire annuel:</label>
              </div>
              <div className="qwik-form-field">
                  <div className="qwik-grouped-field">
                    <input type="text" id="anualTurnover" name="anualTurnover"
                      placeholder='20 000 000'
                      required
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.anualTurnover}
                    />
                      {formik.touched.anualTurnover && formik.errors.anualTurnover ?
                          (<div className="color-emphasize-red">{formik.errors.anualTurnover}</div>) : null}
                  </div>
              </div>
            </div>

            <div className="qwik-grouped-field">
              <div className="qwik-form-field">
                <label htmlFor="bankName">Nom de la Banque:</label>
              </div>
              <div className="qwik-form-field">
                  <div className="qwik-grouped-field">
                     <input type="text" id="bankName" name="bankName"             
                       placeholder='Hello Capital'
                       required
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       value={formik.values.bankName}
                     />
                      {formik.touched.bankName && formik.errors.bankName ?
                          (<div className="color-emphasize-red">{formik.errors.bankName}</div>) : null}
                 </div>
              </div>
            </div>

            <div className="qwik-grouped-field">
              <div className="qwik-form-field">
                <label htmlFor="bankDetails"> Coordonnees de la banque:</label>
              </div>
              <div className="qwik-form-field">
                 <div className="qwik-grouped-field">
                    <input type="text" id="bankDetails" name="bankDetails"
                     placeholder='Nice Street 4, Villebreak, HollyCountry'
                     required
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.bankDetails}
                    />
                    {formik.touched.bankDetails && formik.errors.bankDetails ?
                        (<div className="color-emphasize-red">{formik.errors.bankDetails}</div>) : null}
                 </div>
              </div>
            </div>

            <div className="qwik-grouped-field">
              <div className="qwik-form-field">
                <label htmlFor="bankIban">IBAN:</label>
              </div>
              <div className="qwik-form-field">
                 <div className="qwik-grouped-field">
                     <input type="text" id="bankIban" name="bankIban"
                      //pattern='^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$'
                      placeholder='LU28 0019 4006 4475 0000'
                      required
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.bankIban}
                    />
                    {formik.touched.bankIban && formik.errors.bankIban ?
                        (<div className="color-emphasize-red">{formik.errors.bankIban}</div>) : null}
                 </div>
              </div>
            </div>

            <div className="qwik-grouped-field">
              <div className="qwik-form-field">
                <label htmlFor="bankBic">BIC:</label>
              </div>
              <div className="qwik-form-field">
                <div className="qwik-grouped-field">
                    <input type="text" id="bankBic" name="bankBic"
                    //pattern='^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$'
                    placeholder='HBUKGB4B'
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.bankBic}
                    />
                    {formik.touched.bankBic && formik.errors.bankBic ?
                        (<div className="color-emphasize-red">{formik.errors.bankBic}</div>) : null}
                </div>
              </div>
            </div>

            <RegisterInfoBtn id={btnID} stepN={stepN} stepZ={stepZ} /*onClick_Promise={(e) => stepProcess()}*/ />

          </form>
        </div>
      </div>
    </div>
  );
}; 

export default RegisterInfoFin;