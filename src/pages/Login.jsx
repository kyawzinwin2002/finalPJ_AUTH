import React, { useState } from 'react'
import { TextInput } from "@mantine/core";
import { PasswordInput } from "@mantine/core";
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../redux/api/authApi';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/services/authSlice';



const Login = () => {
  const [email , setEmail] = useState("kyaw69@gmail.com")
  const [password,setPassword] = useState("12345678")
  const dispatch = useDispatch()
  const [login] = useLoginMutation();
  const nav = useNavigate()
  const submitHandler = async(e) => {
    e.preventDefault();
    const user = {email,password}
    const {data} = await login(user)
    if(data?.success){
      nav("/");
    }
    // console.log(data.token);
    dispatch(addUser({user:data?.user,token:data?.token}))
  }

  return (
    <div>
      <div className=" h-screen w-screen flex flex-col justify-center items-center ">
        <h1 className=" text-gray-700 font-bold text-3xl">LogIn</h1>
        <form onSubmit={submitHandler} className=" flex flex-col gap-5 w-96">
          
          <TextInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            label="Email"
          />
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            label="Password"
            description="at least must be 8 letters"
          />
          
          <h1 className=" flex gap-5 text-gray-500">
            Don't you have an account?
            <Link to={"/register"}>
              <span className=" text-blue-600">Register</span>
            </Link>
          </h1>
          <button className=" bg-blue-600 px-6 py-2 rounded-md text-white">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login