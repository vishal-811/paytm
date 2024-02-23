import  Users from "../components/User";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const Dashboard =()=>{
    const navigate =useNavigate();
        const [bal,setBal] =useState('00');
        const token =localStorage.getItem("token");
          if(!token){
            alert("please login")
            navigate('/signin')
          }
          else{
              useEffect(()=>{
                       axios.get("http://localhost:3000/api/v1/account/balance",{
                 headers:{
                     authorization :'Bearer '+ token
                 }
              })
                .then(response =>{
                    setBal(response.data.balance)
                })
              },[token])
          }
    return (
        <div>
               <Appbar/>
               <Balance value={bal}/>
               <Users/>
        </div>
    )
}

export default Dashboard;