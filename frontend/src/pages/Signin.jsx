import { useState } from "react";
import Bottomwarning from "../components/Bottomwarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Inputbox from "../components/Inputbox";
import Subheading from "../components/Subheading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signin =()=>{

    const navigate =useNavigate();
      const [username,setUSername] =useState("");
      const [password, setPassword] =useState("");
    return (
    <div className='bg-gray-300 h-screen flex justify-center'>
        <div className='flex flex-col justify-center'>
            <div className='rounded-lg bg-white w-96 text-center p-2 h-max px-4'>
                   <Heading label={"Sign In"}/>
                   <Subheading label={"Enter your credentials to access your account"}/>
                   <Inputbox onChange={(e)=>{setUSername(e.target.value)}} label={"Email"} placeholder={"johndoe@exmaple.com"} type="text"/>
                   <Inputbox onChange={(e)=>{setPassword(e.target.value)}} label={"Password"} placeholder={"Password"} type="text"/>
                   <Button  onClick={async()=>{
                          try{
                            const response= await  axios.post("http://localhost:3000/api/v1/user/signin",{
                               username,
                                password
                           })
                               if(response.status===200){
                                  localStorage.setItem("token" ,response.data.token);
                                   navigate('/dashboard')
                                   toast.success("signin successful")
                     }
                          }
                          catch(error){
                              toast.warning(error.response.data.msg);
                          }
                   
                }
                }  label={"Sign In"}/>
                   <Bottomwarning label={"Don't have an account ?"} buttonText={"Sign up"} to={"/signup"} />
           </div>
       </div>
    </div>
    )
}

export default Signin;