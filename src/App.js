import './App.css';
import React, {useState} from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
//import {Router, Routes, Route} from "react-router-dom"
//import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./Home"

function App() {
  const [login,setLogin] = useState(null)
  
  return (
    <div className="App">
      {(login)?(
       <BrowserRouter>

          <Routes>
            <Route path="/" element={<Home/>}/>
          </Routes>

       </BrowserRouter>
      
        ):
        <div><a href='#'>Fazer Login</a></div>
      }
    </div>
  );
}

export default App;
