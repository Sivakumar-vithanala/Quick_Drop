import React from 'react'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router-dom'

const DashBoard = () => {
  return (
    <section className='bg-pink-200'>
            <div className='container mx-auto p-3 grid grid-cols-[250px,1fr]'>
           {/**left for menu */}
                <div className='py-4 sticky top-24 overflow-y-auto hidden lg:block border-r'>
                    <UserMenu />
                </div>


                {/**right for content */}
                <div className='bg-white min-h-[7vh]'>
                    <Outlet/>
                </div>
            </div>
        </section>
  )
}

export default DashBoard