

const Balance =({value})=>{
    return(
        <div className="flex m-4 mt-12">
        <div className="font-bold text-2xl">
            Your balance is
        </div>
        <div className="font-semibold ml-4 text-xl">
            Rs {value}
        </div>
    </div>
    )
}
export default Balance;