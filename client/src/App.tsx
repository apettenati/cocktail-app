import { useState } from 'react';
import axios from 'axios'

function App() {
  const [registerUsername, setRegisterUsername] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [loginUsername, setLoginUsername] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [userData, setUserData] = useState(null) as any

  const register = () => {
    console.log('registering')
    axios({
      method: 'POST',
      data: {
        username: registerUsername,
        password: registerPassword
      },
      withCredentials: true,
      url: 'http://localhost:4000/register'
    }).then((res) => {
      console.log(res)
    })
  }

  const login = () => {
    axios({
      method: 'POST',
      data: {
        username: loginUsername,
        password: loginPassword
      },
      withCredentials: true,
      url: 'http://localhost:3000/login'
    }).then((res) => {
      console.log(res)
    })
  }
  const getUser = () => {
    axios({
      method: 'POST',
      data: {
        username: loginUsername,
        password: loginPassword
      },
      withCredentials: true,
      url: 'http://localhost:3000/user'
    }).then((res) => {
      setUserData(res)
    })
  }

  return (

    <div className="App">

      <div>
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
        <button onClick={register}>Submit</button>
      </div>

      <div>
        <h1>Login</h1>
        <input
          type="text"
          name="username"
          onChange={e => setLoginUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          onChange={e => setLoginPassword(e.target.value)}
        />
        <button onClick={login}>Submit</button>

        <div>
          <h1>Get User</h1>
          <button onClick={getUser}>Submit</button>
          <h1> Welcome back {userData.username ? userData.username : null}</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
