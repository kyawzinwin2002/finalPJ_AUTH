import Cookies from 'js-cookie'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGetSingleContactQuery } from '../redux/api/contact'

const Info = () => {
    const {id} = useParams()
    const token = Cookies.get("token")
    const {data} = useGetSingleContactQuery({id,token})
    console.log(data?.contact);
  return (
    <div className=" w-screen h-screen flex justify-center items-center">
      <div className=" flex border-2 p-4 flex-col gap-3 shadow-md">
        <img className=" w-[150px]" src={data?.contact?.photo === null ? "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg" : data?.contact?.photo} alt="" />
        <h1>{data?.contact?.name}</h1>
        <p>{data?.contact?.phone}</p>
        <Link to={"/"}>
          <button className=" px-5 py-1 bg-teal-500 text-white rounded-sm">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Info