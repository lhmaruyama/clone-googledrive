import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
//import {} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js'

export const auth = getAuth()
export const onAuth = onAuthStateChanged

//Cadastrar novo usuário
const create = document.querySelector("#create")

create.onclick = function(){
    let email = document.querySelector(".email").value
    let password = document.querySelector(".password").value
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    alert('Usuário criado com sucesso, faça o login.')
    })
.catch((error) => {
    const errorCode = error.code;
    alert('Error' + errorCode)

    const errorMessage = error.message;
    alert('Error' + errorCode)

    });

}

//Login de usuário cadastrado
const signin = document.querySelector("#signin")

signin.onclick = function(){
    let email = document.querySelector(".email").value
    //const email = "admin@admin.com"
    //const password = "@admin"
    let password = document.querySelector(".password").value
    //alert(email + " " + password)
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const uid = user.uid //ID do usuário
        let login = document.querySelector(".login")
        login.style.display = "none"
        let logged = document.querySelector(".logged")
        logged.style.display = "flex"

        alert("Logado como : " + email)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Usuário ou senha incorreto")
      });
}


//Logout de usuário
const logout = document.querySelector("#logout")

logout.onclick = function(){
    const auth = getAuth();
signOut(auth).then(() => {

  let login = document.querySelector(".login")
  login.style.display = "block"
  let logged = document.querySelector(".logged")
  logged.style.display = "none"
  
/*   let list = document.querySelector(".list")
  while(list.hasChildNodes()){
    list.removeChild(list.firstChild)
  } */

}).catch((error) => {
  alert("Erro ao desconectar: " + error)
  
});
}


