import React, { useState } from 'react'

const UploadProduct = () => {
  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: [],
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  return (
    <section>
      <div className='p-2 bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Upload Product</h2>
      </div>

      <div className='grid p-4'>
        <form className='grid gap-3'>

          <div className='grid gap-2'>
            <label htmlFor="name">Name</label>
            <input id='name' type="text" placeholder='Enter Product Name' name='name' value={data.name} onChange={handleChange} required className='bg-blue-50 p-2 outline-none border focus-within:border-two-orginal rounded'/>
          </div>

          <div className='grid gap-2'>
            <label htmlFor="description">Description</label>
            <input id='description' type="text" placeholder='Enter Product Description' name='description' value={data.description} onChange={handleChange} required className='bg-blue-50 p-2 outline-none border focus-within:border-two-orginal rounded'/>
          </div>

        </form>
      </div>
    </section>
  )
}

export default UploadProduct