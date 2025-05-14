import React, { useState } from 'react'
import UploadCategoryModel from '../components/UploadCategoryModel'

const CategoryPage = () => {

  const [openUploadCategory, setOpenUploadCategory] = useState(false)


  return (
    <section>
      <div>
        <div className='p-2 bg-white shadow-md flex items-center justify-between'>
          <h2 className='font-semibold'>Category</h2>
          <button onClick={() => setOpenUploadCategory(true)} className='text-sm border border-primary-light hover:bg-secondary px-3 py-2 rounded-md'>Add Category</button>
        </div>
      </div>

      {
        openUploadCategory && (
          <UploadCategoryModel close={() => setOpenUploadCategory(false)}/>
        )
      }
    </section>
  )
}

export default CategoryPage