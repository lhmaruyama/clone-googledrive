import React, {useState} from "react"
import { signOut } from "firebase/auth"
import { auth } from "./firebase"

function Home(){
    function loggout(e){
        e.preventDefault()
        signOut(auth)
        .then(result=>{alert("Deslogado")})
        .catch()
    }

    return(
        <div className="main">
            <h2>Logado</h2>
            <a onClick={(e) => loggout(e)} href='#'>Sair</a>


{/*             <img alt="" className="logo" src={Logo}  />
          <input type={'text'} className="input email" placeholder='Nome' />
          <input type={'email'} className="input email" placeholder='Nome de usuário' />
          <input type={'password'} className="input email" placeholder='Senha' />
            <div className=''></div>
            <div className=''></div> */}
        </div>
    )

}

export default Home