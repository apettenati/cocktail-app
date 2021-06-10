// import { useState } from 'react';
// import axios from 'axios'
// import Button from '@material-ui/core/Button';
import React from 'react';
import Login from './User/Login';
import Register from './User/Register';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import NavBar from './NavBar';

function App() {

  return (

    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/user/login">
            <Login />
          </Route>
          <Route path="/user/register">
            <Register />
          </Route>
          <Route path="/ingredients">
            {/* <Ingredients /> */}
          </Route>
        </Switch>
      </Router>
    </div >
  );
}

export default App;
