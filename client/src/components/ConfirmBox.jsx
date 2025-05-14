import React from 'react'
import { VscClose } from "react-icons/vsc";


const ConfirmBox = ({cancel,confirm,close}) => {
  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 z-50 bg-neutral-800 bg-opacity-70 p-4 flex items-center justify-center'>
        <div className='bg-white w-full max-w-md p-4 rounded'>
            <div className='flex justify-between items-center gap-3'>
                <h1 className='font-semibold'>Permanently Delate</h1>
                <button onClick={close}>
                    <VscClose size={25}/>
                </button>
            </div>
            <p className='mt-4 mb-4'>Are You Sure Permanently Delete?</p>
            <div className='w-fit ml-auto gap-2 flex items-center'>
                <button onClick={cancel} className='font-semibold px-3 py-1 border rounded-md border-one-orginal text-one-light hover:text-white hover:bg-one-dark'>Cancel</button>
                <button onClick={confirm} className='font-semibold px-3 py-1 border rounded-md border-two-orginal text-two-light hover:text-white hover:bg-two-dark'>Confirm</button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmBox