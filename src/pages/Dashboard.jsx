import React from 'react'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const data = useSelector((state) => state.authSlice);
  return (
    <div>
      <h1 className=' text-3xl font-bold text-gray-700'>MMS</h1>
      <div className=" flex flex-col gap-3">
        <h1></h1>
      </div>
    </div>
  )
}

export default Dashboard