import { PasswordInput, TextInput } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useCreateContactMutation } from '../redux/api/contact';
import Cookies from 'js-cookie';

const CreateContact = () => {
  const token = Cookies.get("token")
  const [createContact] = useCreateContactMutation()
    const nav = useNavigate()
    const form = useForm({
      initialValues: {
        name: "",
        phone: "",
        email: "",
        address: "",
      },

      validate: {
        name: (value) =>
          value.length < 2 ? "First name must have at least 2 letters" : null,
        phone:  hasLength({ min: 9, max: 11 }),
        email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
        address: (value) =>
          value < 5 ? "Address must have at least 3 letters" : null,
      },
    });
  return (
    <div className=" h-screen flex justify-center items-center">
      <div className="flex flex-col gap-4">
        <h1 className=' text-3xl font-bold text-gray-500'>Create Contact</h1>
        <form
          className=" w-96 flex flex-col gap-5"
          onSubmit={form.onSubmit(async (values) => {
            try {
              const { data } = await createContact({values,token});
              console.log(data);
              console.log(values);
              if (data?.success) {
                nav("/");
              }
            } catch (error) {
              console.log(error);
            }
          })}
        >
          <TextInput
            label="Full Name"
            placeholder="Enter your Name"
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Phone"
            placeholder="Enter Phone Number"
            {...form.getInputProps("phone")}
          />
          <TextInput
            label="Email"
            placeholder="Enter Your Email"
            {...form.getInputProps("email")}
          />
          <TextInput
            label="Address"
            placeholder="Enter your address"
            {...form.getInputProps("address")}
          />
            <button  className=' bg-blue-500 text-white px-6 py-2  rounded-md'>Create</button>
          
        </form>
      </div>
    </div>
  );
}

export default CreateContact