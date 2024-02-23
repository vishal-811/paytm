import Bottomwarning from "../components/Bottomwarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Inputbox from "../components/Inputbox";
import Subheading from "../components/Subheading";


const Signin =()=>{
    return (
    <div className='bg-gray-300 h-screen flex justify-center'>
        <div className='flex flex-col justify-center'>
            <div className='rounded-lg bg-white w-96 text-center p-2 h-max px-4'>
                   <Heading label={"Sign In"}/>
                   <Subheading label={"Enter your credentials to access your account"}/>
                   <Inputbox label={"Email"} placeholder={"johndoe@exmaple.com"} type="text"/>
                   <Inputbox label={"Password"} placeholder={"Password"} type="text"/>
                   <Button label={"Sign In"}/>
                   <Bottomwarning label={"Don't have an account ?"} buttonText={"Sign up"} to={"/signup"} />
           </div>
       </div>
    </div>
    )
}

export default Signin;