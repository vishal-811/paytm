import {BrowserRouter , Route , Routes} from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Transfer from "./pages/Transfer"
import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
    const[loggedin,setLoggedin] =useState(false);
    useEffect(()=>{
      const token =localStorage.getItem("token");
      if(token){
              setLoggedin(true);
      }
    },[loggedin])

  return (
    <>
     {Hello}
      <BrowserRouter>
        <Routes>
           
           {loggedin ? <Route path="" element={<Dashboard/>}/> : <Route path="" element={<Signin/>}/> }
           <Route path="/dashboard" element={<Dashboard/>}/>
           <Route path="/signin" element={<Signin/>}/>
           <Route path="/signup" element={<Signup/>}/>
           <Route path="/send" element={<Transfer/>}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition: Bounce
/>
    </>
  )
}

export default App
