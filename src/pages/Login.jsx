import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch();
   
    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch({type: 'LOGIN_REQUEST',payload : {
            username,
            password
        }});
        await axios.post("http://localhost:8081/api/auth/login", {
           email : username,
            password
        }).then((response) => {
            dispatch({type: 'LOGIN_SUCCESS', payload: response.data.user});
            console.log("Login successful:", response.data);
            cookieStore.set("token", response.data.token);
        }).catch((error) => {
            console.log(error.response.data.details);
            dispatch({type: 'LOGIN_FAILURE', payload: error.message});
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
      />
            {password && (
  <p className={
    password.length < 6
    ? "text-red-500 text-sm"
    : /[A-Z]/.test(password) && /[0-9]/.test(password)
    ? "text-green-500 text-sm"
    : "text-yellow-600 text-sm"
  }>
    {password.length < 6
      ? "Weak"
      : /[A-Z]/.test(password) && /[0-9]/.test(password)
      ? "Strong"
      : "Medium"}
  </p>
)}
    </div>

    <div className="flex justify-end -mt-2">
      <span className="text-sm text-lime-700 cursor-pointer hover:underline">
        Forgot password?
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