import React from 'react'
import { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom"
import { UserStore } from '../store'
import { Login } from './User/Login'
import { Register } from './User/Register'
import { NavBar } from './NavBar'
import { Ingredients } from './Ingredients'

export default function App() {
  useEffect(() => {
    const user = window.localStorage.getItem('username')
    if (user !== null) {
      UserStore.update((s) => { s.authenticated = true })
      UserStore.update((s) => { s.username = user })
    }
  }, [])

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
            <Ingredients />
          </Route>
        </Switch>
      </Router>
    </div >
  )
}