import  Users from "../components/User";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";


const Dashboard =()=>{
    return (
        <div>
               <Appbar/>
               <Balance value={"10,000"}/>
               <Users/>
        </div>
    )
}

export default Dashboard;