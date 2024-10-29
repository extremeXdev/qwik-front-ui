import React, { useEffect } from 'react';

import QwikLogo from '../assets/qwik-logo-lg.png';


import * as utils from '../imports/lib';

import '../styles/Dashboard.css';

const Dashboard = () => {


  // Change Step view Effect
  useEffect(() => {
    
  // - - - - QW auto styling css- - - -

  //:::: gradient effect
  utils.qw_injectClass('qwik-sidebar-menu', false, 'qwik-theme-gradient');
  //::::

  //:::: Body clean effect
  utils.qw_injectStyle_RootClean();
  //::::

  // - - - - QW - - - -

  }, []);

  function toggleSection(section) {
    //document.getElementsByClassName(section)
    //section.classList.toggle('collapsed');
    section.toggle('collapsed');
   }

  return (
    <div className="qwik-container">
      
      <div id="qwik-sidebar-menu" className="qwik-sidebar">
        <div className="qwik-logo">
          <img src={QwikLogo} height={50} alt="Qwik Logo" />
        </div>

        <a className="active" href="#">
          <i className="fas fa-home">
          </i>
          <span> Home </span>
        </a>
        <a href="#">
          <i className="fas fa-folder"></i>
          <span> Wallets</span>
        </a>
        <a href="#">
          <i className="fas fa-credit-card"></i>
          <span> Payments </span>
        </a>
        <a href="#">
          <i className="fas fa-list"></i>
          <span> Transactions </span>
        </a>
        <a className="qwik-menu-item" href="#">
          <i className="fas fa-clock"></i>
          <span> Approvals </span>
          <span className="qwik-badge"> 1 </span>
        </a>
        <a href="#">
          <i className="fas fa-user"></i>
          <span> Manage profile </span>
        </a>
      </div>
      
      <div className="qwik-content">
          <div className="qwik-header">
            <h1>HOME </h1>
            <div className="qwik-icons">
              <i className="fas fa-globe"></i> EN
              <i className="fas fa-comments"></i>
              <i className="fas fa-user-circle"> </i>
            </div>
          </div>
          <div className="qwik-section" /*onclick={ (e) =>toggleSection(e.target.id)}*/>
            <h2>
            <i className="fas fa-folder"></i>
            View your wallets
            </h2>
            <i className="fas fa-chevron-down qwik-toggle-icon"></i>
            <p>
            To get you started, we created a XOF wallet for you. You are allowed to create multiple wallets based on the currencies you'd like to use.
            </p>
            <button className="qwik-button"> View wallets </button>
          </div>
          <div className="qwik-section" /*onclick={toggleSection(this)}*/>
            <h2>
            <i className="fas fa-credit-card"></i>
            Create a payment
            </h2>
            <i className="fas fa-chevron-down qwik-toggle-icon"></i>
            <p> Create a payment to get a quote proposal with the best rate that allow to pay your business partner. </p>
            <button className="qwik-button">
            Create a payment
            </button>
          </div>
          <div className="qwik-section" /*onclick={toggleSection(this)}*/>
            <h2>
            <i className="fas fa-list">
            </i>
            Latest activity
            </h2>
            <i className="fas fa-chevron-down qwik-toggle-icon"></i>
            <div className="qwik-activity">
            <span className="qwik-dot">
            </span>
            <span className="qwik-time">07 Aout 11:45</span>
            <span>
              Vous avez transféré 12 000 EUR vers SERVICHAIN LUX
            </span>
            </div>
            <div className="qwik-activity">
              <span className="qwik-dot"></span>
              <span className="qwik-time">07 Aout 11:30</span>
              <span>Vous avez créé un nouveau wallet en XOF</span>
            </div>
          </div>
      </div>

    </div>
  );
};

export default Dashboard;