import React from 'react'
import { CgCloseR } from "react-icons/cg";


const UploadSubCategoryModel = () => {
    return (
        <section className='fixed top-0 right-0 bottom-0 left-0 bg-neutral-800 bg-opacity-70 z-50 flex items-center justify-center p-4'>
            <div className='w-full max-w-5xl bg-white p-4 rounded-md'>
                <div className='flex items-center justify-between gap-4'>
                    <h1 className='font-semibold'>Add Sub Category</h1>
                    <button>
                        <CgCloseR size={25} />
                    </button>
                </div>
                <form className='my-4'>
                        <div className='grid'>
                            <label htmlFor="">
                                Sub Category Name
                            </label>
                            <input type="text" className='p-3 bg-blue-50 border outline-none focus-within:border-two-light rounded' />
                        </div>
                        <div>
                            Add Image Sub Category
                        </div>
                </form>
            </div>
        </section>
    )
}

export default UploadSubCategoryModel