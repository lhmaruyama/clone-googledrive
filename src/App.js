import './App.css';
import React, { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { auth, provider } from "../src/firebase"
import { signInWithPopup, onAuthStateChanged } from "firebase/auth"
//import {Router, Routes, Route} from "react-router-dom"
//import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./Home"
import Logo from "./logo-drive.png"

function App() {
  const [login, setLogin] = useState(null)

  useEffect(()=>{
    onAuthStateChanged(auth,
      (val)=>{
        setLogin({
          name: val.displayName,
          email: val.email,
          image: val.photoURL
        })
        //alert("Bem vindo de volta " + val.displayName)
        //console.log(val)
      }
    )
  },[])

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
            <Route path="/" element={<Home credential={login}/>} />
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
