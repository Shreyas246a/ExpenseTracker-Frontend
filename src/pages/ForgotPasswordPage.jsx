import axios from "axios";
import api from "../api/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () =>  {
    const [email, setEmail] = useState("");
    
    const navigate = useNavigate();
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("Email: " + email);
      api.post("/auth/forgot-password", { email }).then((res) => {
        alert("Email sent successfully! Please check your inbox for the reset link.");
        navigate("/login");
      }).catch((err) => {
        console.log("Error: " + err.response.data.message);
        setEmail("");
        alert("Error: " + err.response.data.message);   
      })

}

    return (

        <div>
            <form>
            <h1>Enter Email</h1>
            <input type="email" onChange={(e)=> setEmail(e.target.value)} placeholder="Enter your email" className="border border-gray-300 rounded-md px-3 py-2 w-full" />
            <button onClick={handleSubmit}  className="bg-lime-700 text-white font-semibold py-3 rounded-md hover:bg-lime-800 shadow-md transition-all mt-4">
                Send Reset Link
            </button>
            </form> 
        </div>


    )


}

export default ForgotPasswordPage;