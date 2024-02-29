
import React from 'react'

const Settings = () => {
  return (
    <div className='w-3/5 flex items-center justify-center mt-5'>
      <ul className='list-none w-full'>
        <li>
          <div className='flex flex-row justify-between p-4 rounded-full items-center hover:bg-slate-300 ease-out duration-150  hover:p-6 '>
            <div className='text-lg flex justify-between w-full items-center'>
              <span>Change Password</span>
              <img src="/right-arrow.png" alt="" className='w-3 h-3'/>
            </div>
          </div>
        </li>
        <li>
          <div className='flex flex-row justify-between p-4 rounded-full items-center hover:bg-slate-300 ease-out duration-150  hover:p-6 '>
            <div className='text-lg flex justify-between w-full items-center'>
              <span>Change Email</span>
              <img src="/right-arrow.png" alt="" className='w-3 h-3'/>
            </div>
          </div>
        </li>
        <li>
          <div className='flex flex-row justify-between p-4 rounded-full items-center hover:bg-slate-300 ease-out duration-150  hover:p-6 '>
            <div className='text-lg flex justify-between w-full items-center'>
              <span>Change Phone Number</span>
              <img src="/right-arrow.png" alt="" className='w-3 h-3'/>
            </div>
          </div>
        </li>
        <hr className='my-2' />
        <ul className='list-none w-full'>
          <li>
            <div className='flex flex-row justify-between p-4 rounded-full items-center hover:bg-slate-300 ease-out duration-150  hover:p-6 '>
              <div className='text-lg flex justify-between w-full items-center'>
                <span>Payment Methods</span>
                <img src="/right-arrow.png" alt="" className='w-3 h-3'/>
              </div>
            </div>
          </li>
          <li>
            <div className='flex flex-row justify-between p-4 rounded-full items-center hover:bg-slate-300 ease-out duration-150  hover:p-6 '>
              <div className='text-lg flex justify-between w-full items-center'>
                <span>How You Can Get Paid</span>
                <img src="/right-arrow.png" alt="" className='w-3 h-3'/>
              </div>
            </div>
          </li>
        </ul>
        <hr className='my-2'/>
        <ul className='list-none w-full'>
          <li>
            <div className='flex flex-row justify-between p-4 rounded-full items-center hover:bg-slate-300 ease-out duration-150  hover:p-6 '>
              <div className='text-lg flex justify-between w-full items-center'>
                <span>Proposals</span>
                <img src="/right-arrow.png" alt="" className='w-3 h-3'/>
              </div>
            </div>
          </li>
        </ul>
        <hr className='my-2' />
        <ul className='list-none w-full'>
          <li>
            <div className='flex flex-row justify-between p-4 rounded-full items-center hover:bg-slate-300 ease-out duration-150  hover:p-6 '>
              <div className='text-lg flex justify-between w-full items-center'>
                <span>Security</span>
                <img src="/right-arrow.png" alt="" className='w-3 h-3'/>
              </div>
            </div>
          </li>
        </ul>
        <hr className='my-2'/>
        <ul className='list-none w-full'>
          <li>
            <div className='flex flex-row justify-between p-4 rounded-full items-center hover:bg-slate-300 ease-out duration-150  hover:p-6 '>
              <div className='text-lg flex justify-between w-full items-center'>
                <span className='text-red-500 italic'>Exit</span>
                <img src="/right-arrow.png" alt="" className='w-3 h-3'/>
              </div>
            </div>
          </li>
        </ul>
        <hr className='my-2'/>
        <ul className='list-none w-full'>
          <li>
            <div className='flex flex-row justify-between p-4 rounded-full items-center hover:bg-slate-300 ease-out duration-150  hover:p-6 '>
              <div className='text-lg flex justify-between w-full items-center'>
                <span className='text-red-500 italic'>Delete my account</span>
                <img src="/right-arrow.png" alt="" className='w-3 h-3'/>
              </div>
            </div>
          </li>
        </ul>
      </ul>
      
      
    </div>
  )
}

export default Settings
