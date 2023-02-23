import React, { useState, useEffect } from "react"
import { signOut } from "firebase/auth"
import { auth, storage, db } from "./firebase.js"
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable, getBytes, deleteObject  } from "firebase/storage"
import { addDoc, collection, doc, setDoc, onSnapshot, query, where, deleteDoc, getDocs } from "firebase/firestore"
import "./Home.css"
import { GoPlus } from "react-icons/go"

import { GrCheckboxSelected, GrCheckbox } from "react-icons/gr"
import { AiOutlineFileExcel, AiOutlineFileWord, AiOutlineFileImage, AiOutlineFilePdf, AiOutlineFileText, AiOutlineFile, AiOutlineFileZip, AiOutlineEye } from "react-icons/ai"
import { BsFileEarmarkExcel, BsFileEarmarkWord, BsFileEarmarkImage, BsFileEarmarkPdf, BsFileEarmarkFont, BsFileEarmark, BsFileEarmarkZip, BsFileEarmarkMusic, BsFileEarmarkPlay, BsEye } from "react-icons/bs"


import { RiArchiveDrawerLine, RiComputerLine } from "react-icons/ri"
import { FiUsers } from "react-icons/fi"
import { BsClock, BsCloudArrowDown } from "react-icons/bs"
import { BiTrash, BiTrashAlt } from "react-icons/bi"
import Logo from "./logo-drive-ok.png"
import Searchs from "../src/icon/searchs.png"
import Tunes from "../src/icon/tunes.png"
import Settings from "../src/icon/settings.png"
import Apps from "../src/icon/apps.png"
import DownloadLink from "react-download-link"




function Home(props) {

    function loggout(e) {
        e.preventDefault()
        signOut(auth)
            .then(result => {
                alert("Deslogado ")
                window.location.href = "/"
            })
            .catch()
    }

    /*     function loggout(e) {
            e.preventDefault()
            //props.credential = null
    
        } */

    const [progress, setProgress] = useState(0)
    const [archive, setArchive] = useState([])
    //const [down, setDown] = useState("")
    //const [iconSelect, setIconSelect] = useState(1)

    /*     function changeButton(){
            (iconSelect==0)?setIconSelect(1):setIconSelect(0)
        }
        useEffect(() =>{
        }, []) */

    useEffect(() => {
        //const myref = doc(collection(db, "drive", props.credential.uid, "files"))
        //const myref = doc(collection(db, "drive"))
        //const myref = query(collection(db, "drive"))
        const myref = query(collection(db, "drive", props.credential.uid, "files"))
        onSnapshot(myref, (snapshot) => {

            const setArch = snapshot.docs.map((list) => {
                //console.log(list.data())
                return list.data()
            })
            //setArchive()
            setArchive(setArch)
        })

    }, [props])



    async function uploadFile(uid) {

        let file = document.querySelector("#new-file").files[0]

        const q = query(collection(db, "drive", uid, "files"), where("name", "==", file.name))
        const querySnapshot = await getDocs(q)
        let data
        querySnapshot.forEach((doc=>{

            return data = doc.data().name

            
        }))
        //console.log(data)
        if(data == file.name){
            alert("Este arquivo já existe no Drive")
        }else{
            alert("Arquivo foi salvo com sucesso")
    
            let refFile = ref(storage, uid + "/" + file.name)
            //let file = document.querySelector("[name=file]").files[0]
            //const today = new Date()
            const options = { day: "numeric", month: "short", year: "numeric" }
            //const today = file.lastModifiedDate.getDate() + "/" + file.lastModifiedDate.getMonth() + "/" + file.lastModifiedDate.getFullYear()
            const today = file.lastModifiedDate
            const date = today.toLocaleDateString("pt-BR", options)
            const size = Math.ceil(file.size / 1024)
            //console.log(date)
            //console.log(file.size)
    
            const uploadTask = uploadBytesResumable(refFile, file)
            uploadTask.on("state_changed", (snapshot) => {
                const change = (snapshot.bytesTransferred / snapshot.totalBytes)
                setProgress(change)
                console.log("progress: " + change * 100 + "%")
                if(change == 1){
                    setTimeout(setProgress(0),1000)
                }
            })
    
            await uploadBytes(refFile, file)
                .then(() => {
    
                    //console.log("Successfully uploaded to storage")
                    //setProgress(0)
                }).catch()
    
            //const stor = getStorage()
            //const storRef = ref(stor, "myfiles/" + file.name)
            //console.log(storRef === refFile)
            //false   
    
            await getDownloadURL(refFile)
                .then((url) => {
                    //const myref = doc(db,"files/subfiles/item/subitem") subcoleção com ID personalizado
                    //const myref = doc(db,"files", "subfiles", "item", "subitem")
                    const myref = doc(collection(db, "drive", uid, "files"))
                    setDoc(myref, { fileUrl: url, type: file.type, name: file.name, size: size, date: date, id: myref.id })
    
                    //console.log("Successfully saved data in firestore")
                    //setProgress(0)
                    //console.log("--progress: " + progress + "%--")
                }).catch(err => { console.log(err) })

        }


    }

    const removeDoc = (data) => {

        const myref = doc(db, "drive", props.credential.uid, "files", data.id)
        deleteDoc(myref)

        const refFile = ref(storage, props.credential.uid + "/" + data.name)
        deleteObject(refFile).then().catch()
    }

    const viewDoc = (data) => {

        const refUrl = data.fileUrl
        let win = window.open(refUrl, "_blank")
        win.focus()

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
                    <div className="header-content" >
                        <h5 className="header-name">Nome</h5>
                        <h5 className="header-owner">Propietário</h5>
                        <h5 className="header-date">Data</h5>
                        <h5 className="header-size">Tamanho do arquivo</h5>
                    </div>

                    <div className="boxFiles">
                        {
                            archive.map(data => {
                                // AiOutlineFileExcel, AiOutlineFileWord, AiOutlineFileImage, AiOutlineFilePdf, AiOutlineFileText, AiOutlineFile, AiOutlineFileZip
                                //console.log(data.type.split("/")[1])
                                const image1 = <BiTrashAlt className="icon-field" onClick={() => removeDoc(data)} />
                                const image2 = <BsCloudArrowDown className="icon-field" />
                                const image3 = <AiOutlineEye className="icon-field" onClick={() => viewDoc(data)}/>
                                
                                return (
                                    <div className="boxFile">
                                        <span className="header-name-field">{image1}<DownloadLink label={image2} filename={data.name}/>{image3}{data.name}</span>
                                        <span className="header-owner-field">{props.credential.name}</span>
                                        <span className="header-date-field">{data.date}</span>
                                        <span className="header-size-field">{data.size + " KB"}</span>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div >
                        {
                            (progress > 0) ?
                                <div className="progress">
                                    <label htmlFor="bar">Downloading progress:</label>
                                    <progress id="bar" value={progress} max={1}>{progress}%</progress>
                                </div> :
                                <div></div>
                        }
                    </div>
                </div>

            </div>




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