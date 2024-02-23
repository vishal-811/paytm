import Button from "../components/Button";
import Heading from "../components/Heading";
import Inputbox from "../components/Inputbox";
import Subheading from "../components/Subheading"
import Bottomwarning from "../components/Bottomwarning"

const Signup =()=>{
    return (
        <div className='bg-gray-300 h-screen flex justify-center'>
        <div className='flex flex-col justify-center'>
            <div className='rounded-lg bg-white text-center p-2 h-max px-4 w-80'>
               <Heading label={"Sign Up"}/>
               <Subheading label={" Enter your information to create an account"}/>
                <Inputbox label={"First Name"} placeholder={"Enter your first name"} type="text"/>
                <Inputbox label={"Last Name"} placeholder={"Enter your Last name"} type="text"/>
                <Inputbox label={"Email"} placeholder={"Enter your Email"} type="text"/>
                <Inputbox label={"Password"} placeholder={"Enter your Password"} type="text"/>
                <Button label={"Sign up"}/>
                <Bottomwarning label={"Already have an account?"} to={"/signin"} buttonText={"Sign in"}/>
            </div>
        </div>
   </div>
    )
}

export default Signup;