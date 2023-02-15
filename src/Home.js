import React, {useState} from "react"
import { signOut } from "firebase/auth"
import { auth } from "./firebase"
import "./Home.css"
import Logo from "./logo-drive-ok.png"
import Searchs from "../src/icon/searchs.png"
import Tunes from "../src/icon/tunes.png"
import Settings from "../src/icon/settings.png"
import Apps from "../src/icon/apps.png"

function Home(props){

    function loggout(e){
        e.preventDefault()
        signOut(auth)
        .then(result=>{alert("Deslogado")})
        .catch()
    }

    return(
        <div className="main">
            <div className="header-container">
                <div className="header-logo">
                    <img src={Logo}/>
                </div>
                <div className="header-search">
                    <img src={Searchs}/>
                    <input type={"text"} placeholder="Perquisar no Drive"/>
                    <img src={Tunes}/>
                </div>
                <div className="header-icons">
                    <img src={Settings}/>
                    <img src={Apps}/>
                    <img src={props.credential.image}/>
                </div>


            </div>

            <h2>Logado</h2>
            <h2>{props.credential.name}</h2>
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