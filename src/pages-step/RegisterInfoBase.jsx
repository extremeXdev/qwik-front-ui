
import /*React,*/ { useState } from 'react';
// import QwikLogo from '../assets/qwik-logo-lg.png';
import { useFormik } from 'formik';

import QwikLogo from '../components/QwikLogo';
import RegisterInfoTitle from '../components/RegisterInfoTitle';
import RegisterInfoBtn from '../components/RegisterInfoBtn';

import { Suspense, startTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import * as utils from '../imports/lib';


import '../styles/RegisterInfo.css';

const RegisterInfoBase = ({displayLogo=false, displayStep=false, stepN=1, stepZ=1, btnID='', formData={}, updateFormData, onClick_Promise}) => {

 // - - - - QW auto styling css- - - -

 //:::: gradient effect
   utils.qw_injectClass('qw-body', false, 'qwik-theme-gradient');
 //::::

 //:::: Body prepare for center effect
   utils.qw_injectClass('qw-body', false, 'qwik-theme-bodyOrBackItemsCentered');
 //::::

 // - - - - QW - - - -

  // const [legalName, setLegalName] = useState('');
  // const [commercialName, setCommercialName] = useState('');
  // const [legalForm, setLegalForm] = useState('');
  // const [registrationNumber, setRegistrationNumber] = useState('');
  // const [establishmentDate, setEstablishmentDate] = useState('');
  // const [headquartersAddress, setHeadquartersAddress] = useState('');
  // const [vatNumber, setVatNumber] = useState('');


  // const navigate = useNavigate();

  // const handleLegalNameChange = (event) => {
  //   setLegalName(event.target.value);
  // };

  // const handleCommercialNameChange = (event) => {
  //   setCommercialName(event.target.value);
  // };

  // const handleLegalFormChange = (event) => {
  //   setLegalForm(event.target.value);
  // };

  // const handleRegistrationNumberChange = (event) => {
  //   setRegistrationNumber(event.target.value);
  // };

  // const handleEstablishmentDateChange = (event) => {
  //   setEstablishmentDate(event.target.value);
  // };

  // const handleHeadquartersAddressChange = (event) => {
  //   setHeadquartersAddress(event.target.value);
  // };

  // const handleVatNumberChange = (event) => {
  //   setVatNumber(event.target.value);
  // };


//:::: VALIDATION FORM MANAGE
const validate_extra = (values) => {
  const errors = {};

  if(!values.legalName)
    { errors.legalName = "Legal Name is required"; }
  else if ( !utils.qw_validateName(values.legalName) )
    { errors.legalName = "Invalide Legal Name or so short"; }

  if( !values.commercialName )
    { errors.commercialName = "Commercial Name is required"; }
  else if ( !utils.qw_validateName(values.commercialName) )
    { errors.commercialName = "Invalide commercial Name or so short"; }

  if(!values.legalForm)
    { errors.legalForm = "Legal Form is Required"; }
  else if ( !utils.qw_validateName(values.legalForm))
    { errors.legalForm = "Invalid Legal Form"; }

  if(!values.registrationNumber)
    { errors.registrationNumber = "Registration Number is Required"; }
  // else if ( !utils.qw_validatePhoneCode(values.registrationNumber) )
  //   { errors.registrationNumber = "Registration number incorrect"; }

  if(!values.establishmentDate)
    { errors.establishmentDate = "Establishment date is Required"; }
  // else if ( !utils.qw_validatePhoneNumber(values.establishmentDate) )
  //   { errors.establishmentDate = "Establishment date incorrect"; }

  if(!values.headquartersAddress)
    { errors.headquartersAddress = "Headquarter Adresse is Required"; }
  // else if ( !utils.qw_validatePhoneNumber(values.headquartersAddress) )
  //   { errors.headquartersAddress = "Headquarter Adresse incorrect"; }

  if(!values.vatNumber)
    { errors.vatNumber = "VAT Number is Required"; }
  else if ( !utils.qw_validateVATNumber(values.vatNumber) ) {
    errors.vatNumber = "VAT Number incorrect";
  }

  return errors;
};

const validate = (values) => {
  const errors = {};

  if(!values.legalName)
    { errors.legalName = "required"; }
  else if ( !utils.qw_validateName(values.legalName) )
    { errors.legalName = "Invalid"; }

  if( !values.commercialName )
    { errors.commercialName = "required"; }
  else if ( !utils.qw_validateName(values.commercialName) )
    { errors.commercialName = "Invalid"; }

  if(!values.legalForm)
    { errors.legalForm = "required"; }
  else if ( !utils.qw_validateName(values.legalForm))
    { errors.legalForm = "Invalid"; }

  if(!values.registrationNumber)
    { errors.registrationNumber = "required"; }

  if(!values.establishmentDate)
    { errors.establishmentDate = "required"; }

  if(!values.headquartersAddress)
    { errors.headquartersAddress = "required"; }

  if(!values.vatNumber)
    { errors.vatNumber = "required"; }
  else if ( !utils.qw_validateVATNumber(values.vatNumber) ) {
    errors.vatNumber = "incorrect";
  }

  return errors;
};

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


const handleRestore = (valRestored, valHandle) => {
  valHandle(valRestored);
  return valRestored;
};


function stepProcess(data) {
 
  if( !validatedSignupForm(data) )
    { return; }

   //:::: continue with right data
     onClick_Promise();
   //::::
}
//::::: END VALIDATION FORM MANAGE

const formik = useFormik({
  initialValues: {
    legalName: !utils.qw_isEmptyStringOrData(formData.legalName) ? formData.legalName : '',
    commercialName: !utils.qw_isEmptyStringOrData(formData.commercialName) ? formData.commercialName : '',
    legalForm: !utils.qw_isEmptyStringOrData(formData.legalForm) ? formData.legalForm : '',
    registrationNumber: !utils.qw_isEmptyStringOrData(formData.registrationNumber) ? formData.registrationNumber : '',
    establishmentDate: !utils.isValidDate(formData.establishmentDate) ? formData.establishmentDate : '',
    headquartersAddress: !utils.qw_isEmptyStringOrData(formData.headquartersAddress) ? formData.headquartersAddress : '',
    vatNumber: !utils.qw_isEmptyStringOrData(formData.vatNumber) ? formData.vatNumber : '',
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

  return (
    // <Suspense fallback={<div>Loading...</div>}> 
      <div className="qwik-container-pageBack">
        <div className="qwik-container">
          <div className="qwik-form-container">
            
          { displayLogo ? <QwikLogo/> : null}

          { displayStep ? <RegisterInfoTitle stepN={stepN} stepZ={stepZ}/> : null}

            <form /*onSubmit={(e) => handleSubmit(e)}*/ onSubmit={formik.handleSubmit} >
              <div className="qwik-grouped-field">
                <div className="qwik-form-field">
                  <label htmlFor="legalName">Nom legal de l'entreprise:</label>
                </div>
                <div className="qwik-form-field">
                  <div className="qwik-grouped-field">
                    <input type="text" id="legalName" name="legalName"
                      //value={!utils.qw_isEmptyStringOrData(formData.legalName)
                      //        && utils.qw_isEmptyStringOrData(legalName) ? formData.legalName : legalName}
                      //onChange={(e) => handleLegalNameChange(e)}
                      placeholder='Hello Enterprise Ltd.'
                      required
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.legalName}
                      />
                      {formik.touched.legalName && formik.errors.legalName ?
                          (<div className="color-emphasize-red">{formik.errors.legalName}</div>) : null}
                  </div>
                </div>
              </div>

              <div className="qwik-grouped-field">
                <div className="qwik-form-field">
                  <label htmlFor="commercialName">Nom Commercial:</label>
                </div>
                <div className="qwik-form-field">
                  <div className="qwik-grouped-field">
                      <input type="text" id="commercialName" name="commercialName"
                        placeholder='Hello Enterprise'
                        required
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.commercialName}
                        />
                        {formik.touched.commercialName && formik.errors.commercialName ?
                            (<div className="color-emphasize-red">{formik.errors.commercialName}</div>) : null}
                  </div>
                </div>
              </div>

              <div className="qwik-grouped-field">
                <div className="qwik-form-field">
                  <label htmlFor="legalForm">Forme Juridique:</label>
                </div>
                <div className="qwik-form-field">
                  <div className="qwik-grouped-field">
                    <input type="text" id="legalForm" name="legalForm"
                    // value={!utils.qw_isEmptyStringOrData(formData.legalForm)
                    //         && utils.qw_isEmptyStringOrData(legalForm) ? formData.legalForm : legalForm}
                    // onChange={(e) => handleLegalFormChange(e)}
                    placeholder='Private Limited Company (Ltd)'
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.legalForm}
                    />
                    {formik.touched.legalForm && formik.errors.legalForm ?
                        (<div className="color-emphasize-red">{formik.errors.legalForm}</div>) : null}
                  </div>
                </div>
              </div>

              <div className="qwik-grouped-field">
                <div className="qwik-form-field">
                  <label htmlFor="registrationNumber">Numero d'Immatriculation:</label>
                </div>
                <div className="qwik-form-field">
                  <div className="qwik-grouped-field">
                    <input type="text" id="registrationNumber" name="registrationNumber"
                    // value={!utils.qw_isEmptyStringOrData(formData.registrationNumber)
                    //         && utils.qw_isEmptyStringOrData(registrationNumber) ? formData.registrationNumber : registrationNumber}
                    // onChange={(e) => handleRegistrationNumberChange(e)}
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.registrationNumber}
                    />
                    {formik.touched.registrationNumber && formik.errors.registrationNumber ?
                            (<div className="color-emphasize-red">{formik.errors.registrationNumber}</div>) : null}
                  </div>
                </div>
              </div>

              <div className="qwik-grouped-field">
                <div className="qwik-form-field">
                  <label htmlFor="establishmentDate">Date de constitution:</label>
                </div>
                <div className="qwik-form-field">
                  <div className="qwik-grouped-field">
                    <input type="date" id="establishmentDate" name="establishmentDate"
                    // value={!utils.qw_isEmptyStringOrData(formData.establishmentDate)
                    //         && utils.qw_isEmptyStringOrData(establishmentDate) ? formData.establishmentDate : establishmentDate}
                    // onChange={(e) => handleEstablishmentDateChange(e)}
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.establishmentDate}
                    />
                    {formik.touched.establishmentDate && formik.errors.establishmentDate ?
                          (<div className="color-emphasize-red">{formik.errors.establishmentDate}</div>) : null}
                  </div>
                </div>
              </div>

              <div className="qwik-grouped-field">
                <div className="qwik-form-field">
                  <label htmlFor="headquartersAddress">Adresse du siege social:</label>
                </div>
                <div className="qwik-form-field">
                  <div className="qwik-grouped-field">
                    <input type="text" id="headquartersAddress" name="headquartersAddress"
                    // value={!utils.qw_isEmptyStringOrData(formData.headquartersAddress)
                    //          && utils.qw_isEmptyStringOrData(headquartersAddress) ? formData.headquartersAddress : headquartersAddress}
                    // onChange={(e) => handleHeadquartersAddressChange(e)}
                    placeholder='Nice Street 4, Villebreak, HolyCountry'
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.headquartersAddress}
                    />
                    {formik.touched.headquartersAddress && formik.errors.headquartersAddress ?
                          (<div className="color-emphasize-red">{formik.errors.headquartersAddress}</div>) : null}
                  </div>
                </div>
              </div>

              <div className="qwik-grouped-field">
                <div className="qwik-form-field">
                  <label htmlFor="vatNumber">Numero de TVA:</label>
                </div>
                <div className="qwik-form-field">
                  <div className="qwik-grouped-field">
                    <input type="text" id="vatNumber" name="vatNumber" 
                      // value={!utils.qw_isEmptyStringOrData(formData.vatNumber)
                      //         && utils.qw_isEmptyStringOrData(vatNumber) ? formData.vatNumber : vatNumber}
                      // onChange={(e) => handleVatNumberChange(e)}
                      required
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.vatNumber}
                      />
                      {formik.touched.vatNumber && formik.errors.vatNumber ?
                            (<div className="color-emphasize-red">{formik.errors.vatNumber}</div>) : null}
                    </div>
                </div>
              </div>

              <RegisterInfoBtn id={btnID} stepN={stepN} stepZ={stepZ} /*onClick={(e) => stepProcess()}*/  />

            </form>
            
          </div>
        </div>
      </div>
    // </Suspense> */}
  );
}; 

export default RegisterInfoBase;