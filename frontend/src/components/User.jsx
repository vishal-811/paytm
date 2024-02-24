import { useEffect, useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import axios from "axios"
const Users =()=>{
    const [users,setUsers] =useState([])
    const [filter , setFilter] =useState("");
            //  Fetching all the users from the backend.
           useEffect(()=>{
                    axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter,{
                         headers:{
                            Authorization:"Bearer "+ localStorage.getItem("token")
                         }
                    })
               .then(response =>{
                   setUsers(response.data.user)
               })
           },[filter])
    return (   
    <div className="m-5 w-4/5">
    <div className="font-bold mt-6 text-2xl">
        Users
    </div>
    <div className="my-2 border-2px solid border-black">
        <input onChange={(e)=>{setFilter(e.target.value)}} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
    </div>
         {users.map(user => <User user={user} key={user._id} />)}
    </div>
    )
}

function User({user,val}) {
    const navigate =useNavigate();
    return <div key={val} className="flex justify-between mt-8">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstname[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstname} {user.lastname}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
        <Button onClick={() => {
                navigate("/send?id=" + user._id + "&name=" + user.firstname);
            }} label={"Send Money"} />
        </div>
    </div>
}
 
 

export default Users;