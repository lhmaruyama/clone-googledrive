import './App.css';
import React, { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { auth, provider } from "../src/firebase.js"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
//import {Router, Routes, Route} from "react-router-dom"
//import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./Home"
import Logo from "./logo-drive.png"

function App() {
  const [login, setLogin] = useState(null)
  function handleLogin(e) {
    e.preventDefault()
    //alert("oioioihofihroih")
    signInWithPopup(auth, provider)
    .then(result=>{
      if(result){setLogin(result.user.email)}
    })
    .catch()
  }
  return (
    <div className="App">
      {(login) ? (
        <BrowserRouter>

          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>

        </BrowserRouter>

      ) :
        <div className='container-login'>

            <a onClick={(e) => handleLogin(e)} href='#'>Fazer Login</a>
        </div>
        
      }
    </div>
  );
}

export default App;
