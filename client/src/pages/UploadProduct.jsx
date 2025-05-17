import React, { useState } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../utils/UploadImage';
import Loading from '../components/Loading';
import { RiDeleteBin2Line } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { VscClose } from "react-icons/vsc";



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
  const [imageLoading, setImageLoading] = useState(false)
  const [viewImageUrl, setViewImageUrl] = useState("")
  const allCategory = useSelector(state => state.product.allCategory)
  const [selectCategory, setSelectCategory] = useState("")
  const [selectSubCategory, setSelectSubCategory] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handleUploadImage = async (e) => {
    const file = e.target.files[0]

    if (!file) {
      return
    }
    setImageLoading(true)
    const ImageRes = await uploadImage(file)
    const { data: Imageres } = res
    const imageUrl = Imageres.data.url

    setData((preve) => {
      return {
        ...preve,
        image: [...preve.image, imageUrl]
      }
    })
    setImageLoading(false)
  }

  const handleDeleteImage = async (index) => {
    data.image.splice(index, 1)
    setData((preve) => {
      return {
        ...preve
      }
    })
  }

  const handleRemoveCategory = async (index) => {
    data.category.splice(index, 1)
    setData((preve) => {
      return {
        ...preve
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
            <input id='name' type="text" placeholder='Enter Product Name' name='name' value={data.name} onChange={handleChange} required className='bg-blue-50 p-2 outline-none border focus-within:border-two-orginal rounded' />
          </div>

          <div className='grid gap-2'>
            <label htmlFor="description">Description</label>
            <textarea id='description' type="text" placeholder='Enter Product Description' name='description' value={data.description} onChange={handleChange} required rows={3} className='bg-blue-50 p-2 outline-none border focus-within:border-two-orginal rounded resize-none' />
          </div>

          <div>
            <p>Image</p>
            <div>
              <label htmlFor='productImage' className='bg-blue-50 h-30 border rounded flex justify-center items-center cursor-pointer'>
                <div className='text-center flex justify-center items-center flex-col'>
                  {
                    imageLoading ? <Loading /> : (
                      <>
                        <FaCloudUploadAlt size={35} />
                        <p>Upload Image</p>
                      </>
                    )
                  }
                </div>
                <input type="file" name="" id="productImage" className='hidden' onChange={handleUploadImage} accept='image/*' />
              </label>
              {/**Display Upload image */}
              <div className='flex flex-wrap gap-4'>
                {
                  data.image.map((img, index) => {
                    return (
                      <div key={img + index} className='h-20 mt-2 w-20 min-w-20 bg-blue-50 border relative group'>
                        <img src={img} alt={img} className='w-full h-full object-scale-down cursor-pointer' onClick={() => setViewImageUrl(img)} />
                        <div onClick={() => handleDeleteImage(index)} className='absolute bottom-0 right-0 p-1 bg-red-500 hover:bg-red-700 rounded text-white hidden group-hover:block cursor-pointer'>
                          <RiDeleteBin2Line size={25} />
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>

          <div className='grid gap-2'>
            <label htmlFor="">Category</label>
            <div>
              <select name="" id="" className='bg-blue-50 w-full p-2 rounded' value={selectCategory}
                onChange={(e) => {
                  const value = e.target.value
                  const category = allCategory.find(el => el.id === value)
                  setData((preve) => {
                    return {
                      ...preve,
                      category: [...preve.category.category]
                    }
                  })
                  setSelectCategory("")
                }}>
                <option value={""}>Select Category</option>
                {
                  allCategory.map((c, index) => {
                    return (
                      <option value={c?._id}>{c.name}</option>
                    )
                  })
                }
              </select>
              <div className='flex flex-wrap gap-3'>
                {
                  data.category.map((c, index) => {
                    return (
                      <div key={c._id + index + "ProductSection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                        <p>{c.name}</p>
                        <div className='hover:text-one-dark cursor-pointer' onClick={() => handleRemoveCategory(index)}>
                          <VscClose size={20} />
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>

          <div className='grid gap-2'>
            <label htmlFor="">Sub Category</label>
            <div>
              <select name="" id="" className='bg-blue-50 w-full p-2 rounded' value={selectSubCategory}
                onChange={(e) => {
                  const value = e.target.value
                  const category = allCategory.find(el => el.id === value)
                  setData((preve) => {
                    return {
                      ...preve,
                      subCategory: [...preve.subCategory.category]
                    }
                  })
                  selectSubCategory("")
                }}>
                <option value={""}>Select Category</option>
                {
                  allCategory.map((c, index) => {
                    return (
                      <option value={c?._id}>{c.name}</option>
                    )
                  })
                }
              </select>
              <div className='flex flex-wrap gap-3'>
                {
                  data.category.map((c, index) => {
                    return (
                      <div key={c._id + index + "ProductSection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                        <p>{c.name}</p>
                        <div className='hover:text-one-dark cursor-pointer' onClick={() => handleRemoveCategory(index)}>
                          <VscClose size={20} />
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>

        </form>
      </div>
      {
        viewImageUrl && (
          <viewImage url={viewImageUrl} close={() => setViewImageUrl("")} />
        )
      }
    </section>
  )
}

export default UploadProduct