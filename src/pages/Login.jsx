import axios from "axios";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { TokenContext } from "../utils/TokenContext";

const Login = () => {
    const {token, setToken} = useContext(TokenContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        await api.post("/auth/login", {
           email : username,
            password
        }).then((response) => {
            console.log("Login successful:", response.data);
            navigate("/home");
            localStorage.setItem("token", response.data.token);
            setToken(response.data.token);
        }).catch((error) => {
            console.log(error.response.data.message);
            alert("Login failed: " + error.response.data.message);
        });
    }

    return(
<div className="flex justify-center items-center min-h-screen bg-linear-to-br from-lime-700 to-lime-900">

  <div className="bg-white/95 backdrop-blur-xl shadow-2xl px-10 py-12 rounded-2xl w-[330px] flex flex-col gap-6">

    <h1 className="text-3xl font-bold text-center text-lime-800 drop-shadow">
      Welcome Back
    </h1>

    {/* Username */}
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">Username</label>
      <input
        className="border border-lime-400 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-lime-600 transition-all bg-white"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required = {true}
      />
    </div>

    {/* Password */}
    <div className="flex flex-col gap-1 -mt-2">
      <label className="text-sm font-medium text-gray-700">Password</label>
      <input
        type="password"
        className="border border-lime-400 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-lime-600 transition-all bg-white"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required = {true}
      />
      
    </div>

    <div className="flex justify-end -mt-2">
      <span className="text-sm text-lime-700 cursor-pointer hover:underline">
       <Link to="/forgot-password">Forgot password?</Link>
      </span>
    </div>

    <button
      onClick={handleLogin}
      className="bg-lime-700 text-white font-semibold py-3 rounded-md hover:bg-lime-800 shadow-md transition-all"
    >
      Login
    </button>

    <p className="text-center text-sm text-gray-700 mt-2">
      Don’t have an account?
      <span className="text-lime-700 font-medium cursor-pointer hover:underline ml-1">
        <Link to="/signup">Signup</Link>
      </span>
    </p>
  </div>
</div>


    )

}

export default Login;