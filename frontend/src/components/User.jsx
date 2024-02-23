import { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
const Users =()=>{

    const [users,setUsers] =useState([{
        firstname:"Vishal",
        lastname:"Sharma",
        id:1
    },
])
    console.log(users)
    return (   
    <div className="m-5 w-4/5">
    <div className="font-bold mt-6 text-2xl">
        Users
    </div>
    <div className="my-2 border-2px solid border-black">
        <input type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
    </div>
         {users.map(user => <User user={user} />)}
    </div>
    )
}

function User({user}) {
    const navigate =useNavigate();
    console.log(user)
    return <div className="flex justify-between mt-8">
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
                navigate("/send?id=" + user.id + "&name=" + user.firstName);
            }} label={"Send Money"} />
        </div>
    </div>
}
 
 

export default Users;