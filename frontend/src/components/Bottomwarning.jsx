import { Link } from "react-router-dom"

const Bottomwarning=({label, buttonText, to})=> {
    return <div className="py-2 text-md flex justify-center">
      <div>
        {label}
      </div>
      <Link className="pointer underline pl-1 cursor-pointer" to={to}>
        {buttonText}
      </Link>
    </div>
}

export default Bottomwarning;