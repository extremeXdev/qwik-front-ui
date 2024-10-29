//import { useState } from 'react'
import './App.css'

import BaseRouter from './pages/BaseRouter'



function App() {

  return (
    <div id="appID">
        <BaseRouter/>
    </div>

    // <Router>
    //   <nav>
    //     <Link to="/">Login</Link>
    //     <Link to="/register">Register</Link>
    //   </nav>
    //   <Route path="/" exact component={Login} />
    //   <Route path="/register" component={RegisterInfo} />
    // </Router>
 
  /*
 {/* </> 
      <Login/> }
      <TwoFactor/> 
      <Dashboard/>
      <Register/>
      {<Login/>}

       {<RegisterInfo/>}
    </>*/
    );
}

export default App
