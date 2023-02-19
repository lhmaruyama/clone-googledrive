import React, { useState } from "react"
import { signOut } from "firebase/auth"
import { auth, storage, db } from "./firebase.js"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { addDoc, collection, doc, setDoc } from "firebase/firestore"
import "./Home.css"
import { GoPlus } from "react-icons/go"
import { ImGoogleDrive } from "react-icons/im"
import { RiArchiveDrawerLine, RiComputerLine } from "react-icons/ri"
import { FiUsers } from "react-icons/fi"
import { BsClock } from "react-icons/bs"
import { BiTrash } from "react-icons/bi"
import Logo from "./logo-drive-ok.png"
import Searchs from "../src/icon/searchs.png"
import Tunes from "../src/icon/tunes.png"
import Settings from "../src/icon/settings.png"
import Apps from "../src/icon/apps.png"

function Home(props) {

    /*     function loggout(e) {
            e.preventDefault()
            signOut(auth)
                .then(result => { 
                    alert("Deslogado ")
                    props.login
                })
                .catch()
        } */

    function loggout(e) {
        e.preventDefault()
        //props.credential = null



    }

    function uploadFile(uid) {
        let file = document.querySelector("#new-file").files[0]
        let refFile = ref(storage, "myfiles/" + file.name)
        //let file = document.querySelector("[name=file]").files[0]
        //console.log(file.name)

        uploadBytes(refFile, file)
            .then((men) => {
                alert("File uploaded successfully")
                getDownloadURL(refFile)
                    .then((url) => {
                        //const myref = doc(db,"files/subfiles/item/subitem") subcoleção com ID personalizado
                        //const myref = doc(db,"files", "subfiles", "item", "subitem")
                        const myref = doc(collection(db, "drive", uid, "files"))
                        setDoc(myref, { fileUrl: url, type: file.type })
                    })
                    .catch(err => { console.log(err) })
            })
            .catch()
        //const stor = getStorage()
        //const storRef = ref(stor, "myfiles/" + file.name)
        //console.log(storRef === refFile)
        //false            
    }

    return (
        <div className="main">
            <div className="header-container">
                <div className="header-logo">
                    <img src={Logo} />
                </div>

                <div className="header-search">
                    <img src={Searchs} />
                    <input type={"text"} placeholder="Perquisar no Drive" />
                    <img src={Tunes} />
                </div>
                <div className="header-icons">
                    <img className="icon" src={Settings} />
                    <img className="icon" src={Apps} />
                    <img className="photo" src={props.credential.image} />
                </div>
            </div>
            <div className="sidebar-container" >
                <div className="sidebar" >
                    <form className="sidebar-form" >
                        <label htmlFor="new-file" className="sidebar-button"><GoPlus />Novo</label>
                        <input onChange={() => uploadFile(props.credential.uid)} id="new-file" className="hidden-input" type="file" name="file" />
                    </form>
                    <div className="folders" >
                        <div className="my-folder" >
                            <RiArchiveDrawerLine /><span>Meu Drive</span>
                        </div>
                        <div className="folder" >
                            <RiComputerLine /><span>Computadores</span>
                        </div>
                        <div className="folder" >
                            <FiUsers /><span>Compartilhado</span>
                        </div>
                        <div className="folder" >
                            <BsClock /><span>Recentes</span>
                        </div>
                        <div className="folder" >
                            <BiTrash /><span>Lixeira</span>
                        </div>
                    </div>
                </div>
                <div className="content" >
                    <div className="top-content" >
                        <span>Meu Drive</span>

                    </div>
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