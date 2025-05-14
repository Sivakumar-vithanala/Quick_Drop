import React, { useState } from 'react'
import UploadSubCategoryModel from '../components/UploadSubCategoryModel'

const SubCategory = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false)
  return (
    <section>
      <div className='p-2 bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Sub Category</h2>
        <button onClick={()=>setOpenAddSubCategory(true)} className='text-sm border border-one-orginal hover:bg-one-light px-3 py-2 rounded-md'>Add Sub Category</button>
      </div>

    {
      openAddSubCategory && (
        <UploadSubCategoryModel close={()=>setOpenAddSubCategory(false)}/>
      )
    }

    </section>
  )
}

export default SubCategory