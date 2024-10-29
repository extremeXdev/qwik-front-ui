
//import { useState } from 'react'
//import Link from "react-router-dom"
import '../App.css'

import Login from './Login'

import * as utils from '../imports/lib';

import { BrowserRouter as Router, Route, Link, useNavigate } from 'react-router-dom';

import { redirect, replace } from "react-router-dom";

function NotFound() {
  //const [count, setCount] = useState(0)


 // - - - - QW auto styling css- - - -

 //:::: gradient effect
   utils.qw_injectClass('qw-body', false, 'qwik-theme-gradient');
 //::::

 //:::: Body prepare for center effect
   utils.qw_injectClass('qw-body', false, 'qwik-theme-bodyOrBackItemsCentered');
 //::::

 // - - - - QW - - - -
 
 const navigate = useNavigate();

 
  return (
     <div>
       <h1>QWIK 404</h1>
       <div>
          <p/>The page you're looking for doesn't exist, check URL!<p/>
          
          {/* <Link to="/">return</Link> */}
          {/* <button onClick={() => navigate('/')}>quit</button>
          <button onClick={() => redirect('/')}>quit</button> */}
          {/* <button onClick={() => replace('/login')}>quit</button> */}

          <button onClick={() => navigate(-1)}>return</button>
          
       </div>
     </div>
  );
}

export default NotFound;