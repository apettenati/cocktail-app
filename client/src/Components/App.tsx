import { useState } from 'react';
// import axios from 'axios'
// import Button from '@material-ui/core/Button';
import React from 'react';
import { Login } from './User/Login';
import { Register } from './User/Register';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import NavBar from './NavBar';
import { Ingredients } from './Ingredients';
import { useEffect } from 'react';

function App() {
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    console.log({ authenticated })
  }, [authenticated])

  return (

    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/user/login">
            <Login setAuthenticated={setAuthenticated} />
          </Route>
          <Route path="/user/register">
            <Register />
          </Route>
          <Route path="/ingredients">
            <Ingredients authenticated={authenticated} />
          </Route>
        </Switch>
      </Router>
    </div >
  );
}

export default App;
