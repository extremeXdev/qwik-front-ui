
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

 /*
 const [anualTurnover, setAnualTurnover] = useState('');
 const [bankName, setBankName] = useState('');
 const [bankDetails, setBankDetails] = useState('');
 const [bankIban, setBankIban] = useState('');
 const [bankBic, setBankBic] = useState('');

  const handleAnualTurnoverChange = (event) => {
    setAnualTurnover(event.target.value);
  };

  const handleBankNameChange = (event) => {
    setBankName(event.target.value);
  };

  const handleBankDetailsChange = (event) => {
    setBankDetails(event.target.value);
  };

  const handleBankIbanChange = (event) => {
    setBankIban(event.target.value);
  };

  const handleBankBicChange = (event) => {
    setBankBic(event.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // console.log('Form submitted:', {
    //   anualTurnover,
    //   bankName,
    //   bankDetails,
    //   bankIban,
    //   bankBic,
    // });
  };
*/

  function stepProcess() {
     
  }

  const validate = values => {
    const errors = {};
  
    if (!values.anualTurnover) {
      errors.anualTurnover = 'Required';
    } else if (!utils.qw_validateMustBeGreaterThan(values.anualTurnover, 5000)) {
      errors.anualTurnover = 'Number > 5000';
    }
  
    if (!values.bankName) {
      errors.bankName = 'Required';
    } else if (values.bankName.length < 6) {
      errors.bankName = 'Must be 6 characters at least';
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
      updateFormData(values, 3);
      updateFormData(values, 3);
      // alert(utils.qw_dataToJsonStringFormat(formData));
      onClick_Promise(true, true);  // onClick_Promise(true, true);
    },
  });

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
                      //value={anualTurnover}
                      //onChange={(e) => handleAnualTurnoverChange(e)}
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
                      //value={bankName}
                      //onChange={(e) => handleBankNameChange(e)}                
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
                    //value={bankDetails}
                    //onChange={(e) => handleBankDetailsChange(e)}
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
                      //value={bankIban}
                      //onChange={(e) => handleBankIbanChange(e)}
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
                    //value={bankBic}
                    //onChange={(e) => handleBankBicChange(e)}
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