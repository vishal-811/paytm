import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import Button from "./Button";
const Appbar =()=>{
    const navigate =useNavigate();
    return(
        <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4 font-medium text-4xl">
            Paytm Karo
        </div>
        <div className="flex me-5">
            <div className="flex flex-col justify-center h-full mr-4 text-xl">
                Hello,
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    U
                </div>
                
            </div>
              <div>
                  <Button onClick={()=>{
                      localStorage.clear("token");
                      navigate('/signin')
                      toast.success("logged out suceessfully")
                  }} label={"logout"}></Button>
              </div>
        </div>
    </div>
    )
}

export default Appbar;