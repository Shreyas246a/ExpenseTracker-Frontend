import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/api";

const ResetPasswordPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        params.get("token");
        if(password !== confirmPassword){
            alert("Passwords do not match!");
            return;
        }else {
            api.post("/auth/reset-password", {token:params.get("token"), newPassword:password}).then((res) => {
                alert("Password reset successful! Please login with your new password.");
                navigate("/login");
            }).catch((err) => {
                console.log("Error: " + err.response.data.message);
                setPassword("");
                setConfirmPassword("");
                alert("Error: " + err.response.data.message);   
            })
        }
    }

    return (
        <div>
            <h1>Reset Password</h1>
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter new password" className="border border-gray-300 rounded-md px-3 py-2 w-full" />
            <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" className="border border-gray-300 rounded-md px-3 py-2 w-full mt-4" />
            <button onClick={handleSubmit} className="bg-lime-700 text-white font-semibold py-3 rounded-md hover:bg-lime-800 shadow-md transition-all mt-4">
                Reset Password
            </button>
        </div>
    )

}
export default ResetPasswordPage;