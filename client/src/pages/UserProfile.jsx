import React, { useContext } from 'react'
import { userContex } from '../contex/UserContex.js'

const UserProfile = () => {
  const {user} = useContext(userContex)
  return (
    <div className='min-h-screen bg-gray-200 text-gray-700 j'>
     <div className='flex flex-col gap-5 ustify-center items-center'>
     <h1 className="mt-16">
          <strong>User Name: </strong> {user?.name}
        </h1>
        <h1>
          <strong>Email: </strong> {user?.email}
        </h1>
        <h1>
          <strong>Phone Number: </strong> {user?.phoneNumber}
        </h1>
     </div>
    </div>
  )
}

export default UserProfile