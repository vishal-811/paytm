import Button from "../components/Button";
import Heading from "../components/Heading";
import Inputbox from "../components/Inputbox";
import Subheading from "../components/Subheading"
import Bottomwarning from "../components/Bottomwarning"
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup =()=>{
    const navigate =useNavigate();
    const [firstname ,setFirstname] =useState("");
    const [lastname ,setLastname] =useState("");
    const [username ,setUsername] =useState("");
    const [password,setPassword] =useState("");
    return (
        <div className='bg-gray-300 h-screen flex justify-center'>
        <div className='flex flex-col justify-center'>
            <div className='rounded-lg bg-white text-center p-2 h-max px-4 w-80'>
               <Heading label={"Sign Up"}/>
               <Subheading label={" Enter your information to create an account"}/>
                <Inputbox onChange={(e)=>{setFirstname(e.target.value)}} label={"First Name"} placeholder={"Enter your first name"} type="text"/>
                <Inputbox onChange={(e)=>{setLastname(e.target.value)}} label={"Last Name"} placeholder={"Enter your Last name"} type="text"/>
                <Inputbox onChange={(e)=>{setUsername(e.target.value)}} label={"Email"} placeholder={"Enter your Email"} type="text"/>
                <Inputbox onChange={(e)=>{setPassword(e.target.value)}} label={"Password"} placeholder={"Enter your Password"} type="text"/>
                <Button onClick={async()=>{
                   const response= await  axios.post("https://paytm-1.onrender.com/api/v1/user/signup",{
                        username,
                        firstname,
                        lastname,
                        password
                     })
                     if(response.status===201){
                         localStorage.setItem("token" ,response.data.token);
                         navigate('/dashboard')
                     }
                }
                } 
                label={"Sign up"}/>
                <Bottomwarning label={"Already have an account?"} to={"/signin"} buttonText={"Sign in"}/>
            </div>
        </div>
   </div>
    )
}

export default Signup;