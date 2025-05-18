import React from 'react'
import { IoMdClose } from "react-icons/io";


const AddFieldComponent = ({close,value,onChange,submit}) => {
  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-70 z-50 flex items-center justify-center p-4'>
        <div className='bg-white rounded p-4 w-full max-w-md'>
            <div className='flex items-center justify-between gap-2'>
                <h1 className='font-semibold'>Add Field</h1>
                <button onClick={(close)}>
                    <IoMdClose size={28}/>
                </button>
            </div>
            <input type="text" placeholder='Enter Field Name' value={value} onChange={onChange} className='bg-blue-50 my-4 p-2 border outline-none focus-within:border-one-light rounded w-full'/>
            <button onClick={submit} className='bg-one-orginal hover:bg-one-dark px-4 py-2 rounded mx-auto w-fit block'>Add Field</button>
        </div>
    </section>
  )
}

export default AddFieldComponent