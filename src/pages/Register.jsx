import React, { useState } from "react";
import { TextInput } from "@mantine/core";
import { PasswordInput } from "@mantine/core";
import { useRegisterMutation } from "../redux/api/authApi";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");

  const [register] = useRegisterMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    const user = { name, email, password, password_confirmation };
    const data = await register(user);
    console.log(data);
  };

  return (
    <div className=" h-screen w-screen flex flex-col justify-center items-center ">
      <h1 className=" text-gray-700 font-bold text-3xl">Register</h1>
      <form onSubmit={submitHandler} className=" flex flex-col gap-5 w-96">
        <TextInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          label="Full name"
        />
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
        <PasswordInput
          value={password_confirmation}
          onChange={(e) => setPassword_confirmation(e.target.value)}
          placeholder="Confirm Password"
          label="Confirm Password"
          description="at least must be 8 letters"
        />
        <h1 className=" flex gap-5 text-gray-500">
          Already have an account?
          <Link to={"/login"}>
            <span className=" text-blue-600">Login</span>
          </Link>
        </h1>
        <button className=" bg-blue-600 px-6 py-2 rounded-md text-white">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
