import { useContext } from "react";
import { Link } from "react-router-dom";
import { TokenContext } from "../utils/TokenContext";

const Navbar = () => {
    
    const {token,setToken} = useContext(TokenContext);

    return (
        <nav className="flex gap-20 bg-lime-800 p-8 text-lime-100 shadow-md justify-center">
    
        <div className="flex-2/12 font-bold text-2xl">
            Logo
        </div>
        
        {!token ?(
        <div className="flex gap-10">
            <Link to="/" className="hover:underline hover:underline-offset-4">Home</Link>
           <Link to="/login" className="hover:underline hover:underline-offset-4">Login</Link>
           <Link to="/signup" className="hover:underline hover:underline-offset-4">Signup</Link>
        </div>): (
            <div className="flex gap-10">
                <Link to="/home" className="hover:underline hover:underline-offset-4">Dashboard</Link>
               <Link to="/expenses" className="hover:underline hover:underline-offset-4">Expenses</Link>
               <Link to="/" className="hover:underline hover:underline-offset-4" onClick={()=>{
                localStorage.removeItem("token");
                setToken(null);
               }}>logout</Link>

            </div>
        )
        }


        </nav>
    )




}

export default Navbar;