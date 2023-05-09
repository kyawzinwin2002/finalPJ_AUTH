import React, { useState } from 'react'
import { Loader, TextInput } from "@mantine/core";
import { PasswordInput } from "@mantine/core";
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../redux/api/authApi';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/services/authSlice';
import { useForm } from '@mantine/form';

// s0so90@gmail.com
// 12345678;

const Login = () => {
  // const [email , setEmail] = useState("kyaw69@gmail.com")
  // const [password,setPassword] = useState("12345678")
  const dispatch = useDispatch()
  const [login,{isLoading}] = useLoginMutation();
  const nav = useNavigate()
  const form = useForm({
    initialValues: {
      email: "s0so90@gmail.com",
      password: "12345678",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 8 ? "Password must have 8 characters" : null,
    },
  });
  // const submitHandler = async(e) => {
  //   e.preventDefault();
  //   const user = {email,password}
  //   const {data} = await login(user)
  //   if(data?.success){
  //     nav("/");
  //   }
  //   // console.log(data.token);
  //   dispatch(addUser({user:data?.user,token:data?.token}))
  // }

  return (
    <div>
      <div className=" h-screen w-screen flex flex-col justify-center items-center ">
        <h1 className=" text-gray-700 font-bold text-3xl">LogIn</h1>
        {/* <form onSubmit={submitHandler} className=" flex flex-col gap-5 w-96">
          
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
        </form> */}
        <form
          className=" w-96 flex flex-col gap-5"
          onSubmit={form.onSubmit(async (values) => {
            const {data} = await login(values);
            console.log(data);
           if(data?.success){
             nav("/");
           }
              dispatch(addUser({user:data?.user,token:data?.token}))
          })}
        >
          <TextInput
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Enter Password"
            {...form.getInputProps("password")}
          />

          <h1 className=" flex gap-5 text-gray-500">
            Don't you have an account?
            <Link to={"/register"}>
              <span className=" text-blue-600">Register</span>
            </Link>
          </h1>
          <button disabled={isLoading && true} className=" bg-blue-600 px-6 py-2 rounded-md text-white">
            {isLoading ? <Loader className=' mx-auto block'/> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login