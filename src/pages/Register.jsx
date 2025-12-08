import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
   const navigate = useNavigate();
    const handleRegister = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        dispatch({type: 'REGISTER_REQUEST',payload : {
            username,
            password
        }});
        await axios.post("http://localhost:8081/api/auth/register", {
            name: username,
            email : email,
            password
        }).then((response) => {
            dispatch({type: 'REGISTER_SUCCESS', payload: response?.data?.user});
            console.log("Registration successful:", response.data);
            navigate("/login");
        }).catch((error) => {
            console.log(error.response?.data?.details);
            dispatch({type: 'REGISTER_FAILURE', payload: error.message});
        });
    }

   const validate = () => {
  let temp = {};
  
  if (!username) temp.username = "Username is required";
  if (!password) temp.password = "Password is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  temp.email = "Invalid email format";
}
  else if (password.length < 6)
    temp.password = "Password must be at least 6 characters";

  setErrors(temp);

  return Object.keys(temp).length === 0;
};


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
        required
        className="border border-lime-400 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-lime-600 transition-all bg-white"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {errors.username && (
  <p className="text-red-600 text-sm">{errors.username}</p>
)}
    </div>
      {/* Email */}
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">Email</label>
      <input
        className="border border-lime-400 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-lime-600 transition-all bg-white"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && (
  <p className="text-red-600 text-sm">{errors.email}</p>
)}
    </div>
    {/* Password */}
    <div className="flex flex-col gap-1 -mt-2">
      <label className="text-sm font-medium text-gray-700">Password</label>
      <input
        type={showPassword ? "text" : "password"}
        className="border border-lime-400 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-lime-600 transition-all bg-white"
        placeholder="Enter password"
        value={password}
        maxLength={20}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
  type="button"
  onClick={() => setShowPassword(!showPassword)}
  className="absolute right-0 bottom-1 -translate-y-45 text-lime-700"
>
  {showPassword ? "Hide" : "Show"}
</button>
      {errors.password && (
  <p className="text-red-600 text-sm">{errors.password}</p>
)}
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

    <button
      onClick={handleRegister}
      className="bg-lime-700 text-white font-semibold py-3 rounded-md hover:bg-lime-800 shadow-md transition-all"
    >
      Register
    </button>

    <p className="text-center text-sm text-gray-700 mt-2">
      Already have an account?
      <span className="text-lime-700 font-medium cursor-pointer hover:underline ml-1">
        <Link to="/login">Login</Link>
      </span>
    </p>
  </div>
</div>


    )

}

export default Register;