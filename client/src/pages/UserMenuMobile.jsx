import React from 'react'
import UserMenu from '../components/UserMenu'
import { LiaWindowClose } from "react-icons/lia";


const UserMenuMobile = () => {
  return (
    <section className='bg-white h-full w-full py-8'>
      <button onClick={() => window.history.back()} className='text-neutral-800 block w-fit ml-auto'>
        <LiaWindowClose size={24}/>
      </button>
      <div className='container mx-auto px-3 pb-4'>
        <UserMenu />
      </div>
    </section>
  )
}

export default UserMenuMobile