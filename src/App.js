import './App.css';
import React, { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { auth, provider } from "../src/firebase"
import { signInWithPopup, onAuthStateChanged } from "firebase/auth"
import Home from "./Home"
import Capa from "./img/capa.jpg"
import Img from "./img/logo.png"
import Logo from "./img/logo-google.png"

function App() {
  const [login, setLogin] = useState(null)

  useEffect(()=>{
    onAuthStateChanged(auth,
      (val)=>{
        if(val){
          setLogin({
            name: val.displayName,
            email: val.email,
            image: val.photoURL,
            uid: val.uid
          })     
        }
      }
    )
  },[])

  function handleLogin(e) {
    e.preventDefault()
    signInWithPopup(auth, provider)
    .then(result=>{
      if(result){
        setLogin({
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
          uid: result.user.uid
        })
      }
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
          <div className='sup-login'>
            <img className='logo-login' src={Logo}/>
          </div>
          
          <div className='inf-login'>
            <img className='capa-login' src={Capa}/>

            <div className='content-login'>
              <img className='img-login' src={Img}/>
              <span className='header-login'>Armazene, acesse e compartilhe seus arquivos em um lugar seguro</span>
              <span className='body-login'>Acesse-os a qualquer hora e em qualquer lugar no seu computador desktop e em dispositivos móveis e controle como eles são compartilhados.</span>
              <button className='button-login' onClick={(e) => handleLogin(e)}>Iniciar agora</button>
            </div>
          </div>

        </div>
        
      }
    </div>
  );
}

export default App;
