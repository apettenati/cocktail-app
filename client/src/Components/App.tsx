// import { useState } from 'react';
// import axios from 'axios'
// import Button from '@material-ui/core/Button';
import React from 'react';
import Login from './User/Login';
import Register from './User/Register';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NavBar from './NavBar';

function App() {

  // const register = () => {
  //   console.log('registering')
  //   axios({
  //     method: 'POST',
  //     data: {
  //       username: registerUsername,
  //       password: registerPassword
  //     },
  //     withCredentials: true,
  //     url: 'http://localhost:4000/register'
  //   }).then((res) => {
  //     console.log(res)
  //   })
  // }

  // const getUser = () => {
  //   axios({
  //     method: 'POST',
  //     data: {
  //       username: loginUsername,
  //       password: loginPassword
  //     },
  //     withCredentials: true,
  //     url: 'http://localhost:3000/user'
  //   }).then((res) => {
  //     setUserData(res)
  //   })
  // }

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

      {/* <div>
        <h1>Register</h1>
        <input
          type="text"
          name="username"
          onChange={e => setRegisterUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          onChange={e => setRegisterPassword(e.target.value)}
        />
        <Button variant="contained" onClick={register}>Submit</Button>
      </div>

        <div>
          <h1>Get User</h1>
          <Button variant="contained" onClick={getUser}>Submit</Button>
          {/* <h1> Welcome back {userData.username ? userData.username : ''}</h1>}
    </div>
      </div >} */}
    </div >
  );
}

export default App;
