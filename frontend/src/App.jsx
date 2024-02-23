import {BrowserRouter , Route , Routes} from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Transfer from "./pages/Transfer"
function App() {
  

  return (
    <BrowserRouter>
        <Routes>
           <Route path="/dashboard" element={<Dashboard/>}/>
           <Route path="/signin" element={<Signin/>}/>
           <Route path="/signup" element={<Signup/>}/>
           <Route path="/send" element={<Transfer/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
