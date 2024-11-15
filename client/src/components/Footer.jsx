import React from 'react'

const Footer = () => {
  return (
    <div className='h-44'
    >
        <div className='text-gray-700'>
          <p className='text-center text-xl pt-10'>Contect Us</p>
          <ul className='flex justify-center items-center flex-col md:flex-row mt-5 gap-4 md:gap-10'>
            <li>Email: support@carstore.com</li>
            <li>LinkedIn</li>
            <li>Github</li>
            <li>Instagram</li>
            <li>Facebook</li>
            </ul> 
        </div>
    </div>
  )
}

export default Footer